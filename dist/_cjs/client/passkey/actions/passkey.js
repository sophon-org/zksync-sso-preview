"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccountOwnerPasskey = exports.requestPasskeyAuthentication = exports.registerNewPasskey = exports.generatePasskeyAuthenticationOptions = exports.generatePasskeyRegistrationOptions = void 0;
const browser_1 = require("@simplewebauthn/browser");
const server_1 = require("@simplewebauthn/server");
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const WebAuthValidator_js_1 = require("../../../abi/WebAuthValidator.js");
const helpers_js_1 = require("../../../utils/helpers.js");
const passkey_js_1 = require("../../../utils/passkey.js");
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
    }
    return { rpName, rpID, origin };
};
const generatePasskeyRegistrationOptions = async (args) => {
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
        attestationType: "direct",
        excludeCredentials: [],
        authenticatorSelection: {
            residentKey: "required",
            userVerification: "discouraged",
        },
        supportedAlgorithmIDs: [-7],
    };
    const params = Object.assign({}, defaultOptions, args);
    const options = await (0, server_1.generateRegistrationOptions)(params);
    options.pubKeyCredParams = options.pubKeyCredParams.filter((creds) => creds.alg == 1);
    return options;
};
exports.generatePasskeyRegistrationOptions = generatePasskeyRegistrationOptions;
const generatePasskeyAuthenticationOptions = async (args) => {
    let { rpID } = identifyPasskeyParams();
    rpID = args.rpID || rpID;
    if (!rpID)
        throw new Error("Can't set rpID automatically, please provide them manually in the arguments");
    const defaultOptions = {
        rpID: rpID,
    };
    const params = Object.assign({}, defaultOptions, args);
    const options = await (0, server_1.generateAuthenticationOptions)(params);
    if ("pubKeyCredParams" in options) {
        options.pubKeyCredParams = options.pubKeyCredParams.filter((creds) => creds.alg == -7);
    }
    return options;
};
exports.generatePasskeyAuthenticationOptions = generatePasskeyAuthenticationOptions;
const registerNewPasskey = async (args) => {
    let { origin } = identifyPasskeyParams();
    origin = args.origin || origin;
    if (!origin)
        throw new Error("Can't set origin automatically, please provide it manually in the arguments");
    const passkeyRegistrationOptions = "passkeyRegistrationOptions" in args ? args.passkeyRegistrationOptions : await (0, exports.generatePasskeyRegistrationOptions)(args);
    const registrationResponse = await (0, browser_1.startRegistration)({
        optionsJSON: passkeyRegistrationOptions,
    });
    const verification = await (0, server_1.verifyRegistrationResponse)({
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
exports.registerNewPasskey = registerNewPasskey;
const requestPasskeyAuthentication = async (args) => {
    const passkeyAuthenticationOptions = await (0, exports.generatePasskeyAuthenticationOptions)({
        challenge: (0, viem_1.toBytes)(args.challenge),
    });
    const optionsJSON = { ...passkeyAuthenticationOptions };
    const authenticationResponse = await (0, browser_1.startAuthentication)({ optionsJSON: optionsJSON });
    let { rpID, origin } = identifyPasskeyParams();
    rpID = args.rpID || passkeyAuthenticationOptions.rpId || rpID;
    origin = args.origin || origin;
    if (!rpID || !origin)
        throw new Error("Can't set rpID and origin automatically, please provide them manually in the arguments");
    const verification = await (0, server_1.verifyAuthenticationResponse)({
        response: authenticationResponse,
        expectedChallenge: passkeyAuthenticationOptions.challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        credential: {
            id: authenticationResponse.id,
            publicKey: args.credentialPublicKey,
            counter: 0,
        },
    });
    if (!verification.verified || !verification.authenticationInfo)
        throw new Error("Passkey validation failed");
    return {
        passkeyAuthenticationResponse: authenticationResponse,
        passkeyAuthenticationOptions,
    };
};
exports.requestPasskeyAuthentication = requestPasskeyAuthentication;
const addAccountOwnerPasskey = async (client, args) => {
    const callData = (0, viem_1.encodeFunctionData)({
        abi: WebAuthValidator_js_1.WebAuthValidatorAbi,
        functionName: "addValidationKey",
        args: [(0, viem_1.toHex)((0, passkey_js_1.base64UrlToUint8Array)(args.credentialId)), args.rawPublicKey, args.origin],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.passkey,
        paymaster: args.paymaster?.address,
        paymasterInput: args.paymaster?.address ? (args.paymaster?.paymasterInput || (0, zksync_1.getGeneralPaymasterInput)({ innerInput: "0x" })) : undefined,
        data: callData,
        gas: 10000000n,
    };
    const transactionHash = await (0, zksync_1.sendTransaction)(client, sendTransactionArgs);
    if (args.onTransactionSent) {
        (0, helpers_js_1.noThrow)(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await (0, actions_1.waitForTransactionReceipt)(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("addValidationKey transaction reverted");
    return {
        transactionReceipt,
    };
};
exports.addAccountOwnerPasskey = addAccountOwnerPasskey;
//# sourceMappingURL=passkey.js.map