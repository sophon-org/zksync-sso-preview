import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { generateAuthenticationOptions, generateRegistrationOptions, verifyAuthenticationResponse, verifyRegistrationResponse } from "@simplewebauthn/server";
import { encodeFunctionData, toBytes, toHex } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { getGeneralPaymasterInput, sendTransaction } from "viem/zksync";
import { WebAuthValidatorAbi } from "../../../abi/WebAuthValidator.js";
import { noThrow } from "../../../utils/helpers.js";
import { base64UrlToUint8Array } from "../../../utils/passkey.js";
const identifyPasskeyParams = () => {
    let rpName;
    let rpID;
    let origin;
    try {
        rpName = window.location.hostname;
        rpID = window.location.hostname;
        origin = window.location.origin;
    }
    catch {
        // ignore
    }
    return { rpName, rpID, origin };
};
export const generatePasskeyRegistrationOptions = async (args) => {
    let { rpName, rpID } = identifyPasskeyParams();
    rpName = args.rpName || rpName;
    rpID = args.rpID || rpID;
    if (!rpName || !rpID)
        throw new Error("Can't set rpName and rpID automatically, please provide them manually in the arguments");
    const defaultOptions = {
        rpName,
        rpID,
        userName: args.userName,
        userDisplayName: args.userDisplayName,
        // We want a stable id for the passkey
        attestationType: "direct",
        // Not preventing users from re-registering existing authenticators
        excludeCredentials: [],
        // See "Guiding use of authenticators via authenticatorSelection" below
        authenticatorSelection: {
            residentKey: "required",
            userVerification: "discouraged",
        },
        supportedAlgorithmIDs: [-7], // only supports ES256 (no windows hello)
    };
    const params = Object.assign({}, defaultOptions, args);
    const options = await generateRegistrationOptions(params);
    options.pubKeyCredParams = options.pubKeyCredParams.filter((creds) => creds.alg == 1);
    return options;
};
export const generatePasskeyAuthenticationOptions = async (args) => {
    let { rpID } = identifyPasskeyParams();
    rpID = args.rpID || rpID;
    if (!rpID)
        throw new Error("Can't set rpID automatically, please provide them manually in the arguments");
    const defaultOptions = {
        rpID: rpID,
    };
    const params = Object.assign({}, defaultOptions, args);
    const options = await generateAuthenticationOptions(params);
    if ("pubKeyCredParams" in options) {
        options.pubKeyCredParams = options.pubKeyCredParams.filter((creds) => creds.alg == -7);
    }
    return options;
};
export const registerNewPasskey = async (args) => {
    let { origin } = identifyPasskeyParams();
    origin = args.origin || origin;
    if (!origin)
        throw new Error("Can't set origin automatically, please provide it manually in the arguments");
    const passkeyRegistrationOptions = "passkeyRegistrationOptions" in args ? args.passkeyRegistrationOptions : await generatePasskeyRegistrationOptions(args);
    const registrationResponse = await startRegistration({
        optionsJSON: passkeyRegistrationOptions,
    });
    const verification = await verifyRegistrationResponse({
        response: registrationResponse,
        expectedChallenge: passkeyRegistrationOptions.challenge,
        expectedOrigin: origin,
    });
    if (!verification.verified || !verification.registrationInfo)
        throw new Error("Passkey validation failed");
    return {
        passkeyRegistrationOptions,
        passkeyRegistrationResponse: registrationResponse,
        verificationResponse: verification,
        credentialPublicKey: verification.registrationInfo.credential.publicKey,
        credentialId: verification.registrationInfo.credential.id,
    };
};
export const requestPasskeyAuthentication = async (args) => {
    const passkeyAuthenticationOptions = await generatePasskeyAuthenticationOptions({
        challenge: toBytes(args.challenge),
    });
    const optionsJSON = { ...passkeyAuthenticationOptions };
    const authenticationResponse = await startAuthentication({ optionsJSON: optionsJSON });
    let { rpID, origin } = identifyPasskeyParams();
    rpID = args.rpID || passkeyAuthenticationOptions.rpId || rpID;
    origin = args.origin || origin;
    if (!rpID || !origin)
        throw new Error("Can't set rpID and origin automatically, please provide them manually in the arguments");
    const verification = await verifyAuthenticationResponse({
        response: authenticationResponse,
        expectedChallenge: passkeyAuthenticationOptions.challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        credential: {
            id: authenticationResponse.id,
            publicKey: args.credentialPublicKey,
            counter: 0, // TODO: figure out if this has to be dynamic
        },
    });
    if (!verification.verified || !verification.authenticationInfo)
        throw new Error("Passkey validation failed");
    return {
        passkeyAuthenticationResponse: authenticationResponse,
        passkeyAuthenticationOptions,
    };
};
export const addAccountOwnerPasskey = async (client, args) => {
    const callData = encodeFunctionData({
        abi: WebAuthValidatorAbi,
        functionName: "addValidationKey",
        args: [toHex(base64UrlToUint8Array(args.credentialId)), args.rawPublicKey, args.origin],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.passkey,
        paymaster: args.paymaster?.address,
        paymasterInput: args.paymaster?.address ? (args.paymaster?.paymasterInput || getGeneralPaymasterInput({ innerInput: "0x" })) : undefined,
        data: callData,
        gas: 10000000n, // TODO: Remove when gas estimation is fixed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
    const transactionHash = await sendTransaction(client, sendTransactionArgs);
    if (args.onTransactionSent) {
        noThrow(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("addValidationKey transaction reverted");
    return {
        transactionReceipt,
    };
};
//# sourceMappingURL=passkey.js.map