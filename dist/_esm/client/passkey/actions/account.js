import { getAddress, keccak256, parseEventLogs, toHex } from "viem";
import { readContract, waitForTransactionReceipt, writeContract } from "viem/actions";
import { getGeneralPaymasterInput } from "viem/zksync";
import { AAFactoryAbi } from "../../../abi/AAFactory.js";
import { WebAuthValidatorAbi } from "../../../abi/WebAuthValidator.js";
import { encodeModuleData, encodePasskeyModuleParameters, encodeSession } from "../../../utils/encoding.js";
import { noThrow } from "../../../utils/helpers.js";
import { base64UrlToUint8Array, getPasskeySignatureFromPublicKeyBytes, getPublicKeyBytesFromPasskeySignature } from "../../../utils/passkey.js";
export const encodePasskeyModuleData = async (args) => {
    let origin = args.expectedOrigin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const passkeyPublicKey = getPublicKeyBytesFromPasskeySignature(args.credentialPublicKey);
    const encodedPasskeyParameters = encodePasskeyModuleParameters({
        credentialId: args.credentialId,
        passkeyPublicKey,
        expectedOrigin: origin,
    });
    return encodeModuleData({
        address: args.location,
        parameters: encodedPasskeyParameters,
    });
};
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const deployAccount = async (client, // Account deployer (any viem client)
args) => {
    let origin = args.expectedOrigin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const passkeyPublicKey = getPublicKeyBytesFromPasskeySignature(args.credentialPublicKey);
    const encodedPasskeyParameters = encodePasskeyModuleParameters({
        credentialId: args.credentialId,
        passkeyPublicKey,
        expectedOrigin: origin,
    });
    const encodedPasskeyModuleData = encodeModuleData({
        address: args.contracts.passkey,
        parameters: encodedPasskeyParameters,
    });
    const accountId = args.uniqueAccountId || encodedPasskeyParameters;
    const encodedSessionKeyModuleData = encodeModuleData({
        address: args.contracts.session,
        parameters: args.initialSession ? encodeSession(args.initialSession) : "0x",
    });
    const encodedGuardianRecoveryModuleData = encodeModuleData({
        address: args.contracts.recovery,
        parameters: "0x",
    });
    const encodedOidcRecoveryModuleData = encodeModuleData({
        address: args.contracts.recoveryOidc,
        parameters: "0x",
    });
    let deployProxyArgs = {
        account: client.account,
        chain: client.chain,
        address: args.contracts.accountFactory,
        abi: AAFactoryAbi,
        functionName: "deployProxySsoAccount",
        args: [
            keccak256(toHex(accountId)),
            [encodedPasskeyModuleData, encodedSessionKeyModuleData, encodedGuardianRecoveryModuleData, encodedOidcRecoveryModuleData],
            [],
        ],
    };
    if (args.paymasterAddress) {
        deployProxyArgs = {
            ...deployProxyArgs,
            paymaster: args.paymasterAddress,
            paymasterInput: args.paymasterInput ?? getGeneralPaymasterInput({ innerInput: "0x" }),
        };
    }
    const transactionHash = await writeContract(client, deployProxyArgs);
    if (args.onTransactionSent) {
        noThrow(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("Account deployment transaction reverted");
    const getAccountId = () => {
        if (transactionReceipt.contractAddress) {
            return transactionReceipt.contractAddress;
        }
        const accountCreatedEvent = parseEventLogs({ abi: AAFactoryAbi, logs: transactionReceipt.logs })
            .find((log) => log && log.eventName === "AccountCreated");
        if (!accountCreatedEvent) {
            throw new Error("No contract address in transaction receipt");
        }
        const { accountAddress } = accountCreatedEvent.args;
        return accountAddress;
    };
    const accountAddress = getAccountId();
    return {
        address: getAddress(accountAddress),
        transactionReceipt: transactionReceipt,
    };
};
export const fetchAccount = async (client, // Account deployer (any viem client)
args) => {
    let origin = args.expectedOrigin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    if (!args.contracts.passkey)
        throw new Error("Passkey module address is not set");
    let username = args.uniqueAccountId;
    if (!username) {
        try {
            const credential = await navigator.credentials.get({
                publicKey: {
                    challenge: new Uint8Array(32),
                    userVerification: "discouraged",
                },
            });
            if (!credential)
                throw new Error("No registered passkeys");
            username = credential.id;
        }
        catch {
            throw new Error("Unable to retrieve passkey");
        }
    }
    if (!username)
        throw new Error("No account found");
    const credentialId = toHex(base64UrlToUint8Array(username));
    const accountAddress = await readContract(client, {
        abi: WebAuthValidatorAbi,
        address: args.contracts.passkey,
        functionName: "registeredAddress",
        args: [origin, credentialId],
    });
    if (!accountAddress || accountAddress == NULL_ADDRESS)
        throw new Error(`No account found for username: ${username}`);
    const publicKey = await readContract(client, {
        abi: WebAuthValidatorAbi,
        address: args.contracts.passkey,
        functionName: "getAccountKey",
        args: [origin, credentialId, accountAddress],
    });
    if (!publicKey || !publicKey[0] || !publicKey[1])
        throw new Error(`Passkey credentials not found in on-chain module for passkey ${username}`);
    const passkeyPublicKey = getPasskeySignatureFromPublicKeyBytes(publicKey);
    return {
        username,
        address: accountAddress,
        passkeyPublicKey,
    };
};
//# sourceMappingURL=account.js.map