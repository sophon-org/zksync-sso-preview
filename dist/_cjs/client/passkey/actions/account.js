"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAccount = exports.deployAccount = exports.encodePasskeyModuleData = void 0;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const AAFactory_js_1 = require("../../../abi/AAFactory.js");
const WebAuthValidator_js_1 = require("../../../abi/WebAuthValidator.js");
const encoding_js_1 = require("../../../utils/encoding.js");
const helpers_js_1 = require("../../../utils/helpers.js");
const passkey_js_1 = require("../../../utils/passkey.js");
const encodePasskeyModuleData = async (args) => {
    let origin = args.expectedOrigin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const passkeyPublicKey = (0, passkey_js_1.getPublicKeyBytesFromPasskeySignature)(args.credentialPublicKey);
    const encodedPasskeyParameters = (0, encoding_js_1.encodePasskeyModuleParameters)({
        credentialId: args.credentialId,
        passkeyPublicKey,
        expectedOrigin: origin,
    });
    return (0, encoding_js_1.encodeModuleData)({
        address: args.location,
        parameters: encodedPasskeyParameters,
    });
};
exports.encodePasskeyModuleData = encodePasskeyModuleData;
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
const deployAccount = async (client, args) => {
    let origin = args.expectedOrigin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const passkeyPublicKey = (0, passkey_js_1.getPublicKeyBytesFromPasskeySignature)(args.credentialPublicKey);
    const encodedPasskeyParameters = (0, encoding_js_1.encodePasskeyModuleParameters)({
        credentialId: args.credentialId,
        passkeyPublicKey,
        expectedOrigin: origin,
    });
    const encodedPasskeyModuleData = (0, encoding_js_1.encodeModuleData)({
        address: args.contracts.passkey,
        parameters: encodedPasskeyParameters,
    });
    const accountId = args.uniqueAccountId || encodedPasskeyParameters;
    const encodedSessionKeyModuleData = (0, encoding_js_1.encodeModuleData)({
        address: args.contracts.session,
        parameters: args.initialSession ? (0, encoding_js_1.encodeSession)(args.initialSession) : "0x",
    });
    const encodedGuardianRecoveryModuleData = (0, encoding_js_1.encodeModuleData)({
        address: args.contracts.recovery,
        parameters: "0x",
    });
    const encodedOidcRecoveryModuleData = (0, encoding_js_1.encodeModuleData)({
        address: args.contracts.recoveryOidc,
        parameters: "0x",
    });
    let deployProxyArgs = {
        account: client.account,
        chain: client.chain,
        address: args.contracts.accountFactory,
        abi: AAFactory_js_1.AAFactoryAbi,
        functionName: "deployProxySsoAccount",
        args: [
            (0, viem_1.keccak256)((0, viem_1.toHex)(accountId)),
            [encodedPasskeyModuleData, encodedSessionKeyModuleData, encodedGuardianRecoveryModuleData, encodedOidcRecoveryModuleData],
            [],
        ],
    };
    if (args.paymasterAddress) {
        deployProxyArgs = {
            ...deployProxyArgs,
            paymaster: args.paymasterAddress,
            paymasterInput: args.paymasterInput ?? (0, zksync_1.getGeneralPaymasterInput)({ innerInput: "0x" }),
        };
    }
    const transactionHash = await (0, actions_1.writeContract)(client, deployProxyArgs);
    if (args.onTransactionSent) {
        (0, helpers_js_1.noThrow)(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await (0, actions_1.waitForTransactionReceipt)(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("Account deployment transaction reverted");
    const getAccountId = () => {
        if (transactionReceipt.contractAddress) {
            return transactionReceipt.contractAddress;
        }
        const accountCreatedEvent = (0, viem_1.parseEventLogs)({ abi: AAFactory_js_1.AAFactoryAbi, logs: transactionReceipt.logs })
            .find((log) => log && log.eventName === "AccountCreated");
        if (!accountCreatedEvent) {
            throw new Error("No contract address in transaction receipt");
        }
        const { accountAddress } = accountCreatedEvent.args;
        return accountAddress;
    };
    const accountAddress = getAccountId();
    return {
        address: (0, viem_1.getAddress)(accountAddress),
        transactionReceipt: transactionReceipt,
    };
};
exports.deployAccount = deployAccount;
const fetchAccount = async (client, args) => {
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
    const credentialId = (0, viem_1.toHex)((0, passkey_js_1.base64UrlToUint8Array)(username));
    const accountAddress = await (0, actions_1.readContract)(client, {
        abi: WebAuthValidator_js_1.WebAuthValidatorAbi,
        address: args.contracts.passkey,
        functionName: "registeredAddress",
        args: [origin, credentialId],
    });
    if (!accountAddress || accountAddress == NULL_ADDRESS)
        throw new Error(`No account found for username: ${username}`);
    const publicKey = await (0, actions_1.readContract)(client, {
        abi: WebAuthValidator_js_1.WebAuthValidatorAbi,
        address: args.contracts.passkey,
        functionName: "getAccountKey",
        args: [origin, credentialId, accountAddress],
    });
    if (!publicKey || !publicKey[0] || !publicKey[1])
        throw new Error(`Passkey credentials not found in on-chain module for passkey ${username}`);
    const passkeyPublicKey = (0, passkey_js_1.getPasskeySignatureFromPublicKeyBytes)(publicKey);
    return {
        username,
        address: accountAddress,
        passkeyPublicKey,
    };
};
exports.fetchAccount = fetchAccount;
//# sourceMappingURL=account.js.map