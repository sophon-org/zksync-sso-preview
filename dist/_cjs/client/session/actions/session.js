"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStateNotify = exports.getSessionState = exports.revokeSession = exports.createSession = void 0;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const SessionKeyValidator_js_1 = require("../../../abi/SessionKeyValidator.js");
const index_js_1 = require("../../../paymaster/index.js");
const helpers_js_1 = require("../../../utils/helpers.js");
const session_js_1 = require("../../../utils/session.js");
const createSession = async (client, args) => {
    const callData = (0, viem_1.encodeFunctionData)({
        abi: SessionKeyValidator_js_1.SessionKeyValidatorAbi,
        functionName: "createSession",
        args: [args.sessionConfig],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.session,
        paymaster: args.paymaster?.address,
        paymasterInput: args.paymaster?.address ? (args.paymaster?.paymasterInput || (0, zksync_1.getGeneralPaymasterInput)({ innerInput: "0x" })) : undefined,
        data: callData,
        gas: 10000000n,
    };
    const transactionWithPaymasterData = await (0, index_js_1.getTransactionWithPaymasterData)(client.chain.id, client.account.address, sendTransactionArgs, args.paymasterHandler);
    const transactionHash = await (0, zksync_1.sendTransaction)(client, transactionWithPaymasterData);
    if (args.onTransactionSent) {
        (0, helpers_js_1.noThrow)(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await (0, actions_1.waitForTransactionReceipt)(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("createSession transaction reverted");
    return {
        transactionReceipt,
    };
};
exports.createSession = createSession;
const revokeSession = async (client, args) => {
    const callData = (0, viem_1.encodeFunctionData)({
        abi: SessionKeyValidator_js_1.SessionKeyValidatorAbi,
        functionName: "revokeKey",
        args: [args.sessionId],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.session,
        paymaster: args.paymaster?.address,
        paymasterInput: args.paymaster?.address ? (args.paymaster?.paymasterInput || (0, zksync_1.getGeneralPaymasterInput)({ innerInput: "0x" })) : undefined,
        data: callData,
        gas: 10000000n,
    };
    const transactionWithPaymasterData = await (0, index_js_1.getTransactionWithPaymasterData)(client.chain.id, client.account.address, sendTransactionArgs, args.paymasterHandler);
    const transactionHash = await (0, zksync_1.sendTransaction)(client, transactionWithPaymasterData);
    if (args.onTransactionSent) {
        (0, helpers_js_1.noThrow)(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await (0, actions_1.waitForTransactionReceipt)(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("createSession transaction reverted");
    return {
        transactionReceipt,
    };
};
exports.revokeSession = revokeSession;
const getSessionState = async (client, args) => {
    const sessionState = await (0, actions_1.readContract)(client, {
        address: args.contracts.session,
        abi: SessionKeyValidator_js_1.SessionKeyValidatorAbi,
        functionName: "sessionState",
        args: [args.account, args.sessionConfig],
    });
    return {
        sessionState: sessionState,
    };
};
exports.getSessionState = getSessionState;
const sessionStateNotify = (args) => {
    const { sessionState } = args;
    const now = BigInt(Math.floor(Date.now() / 1000));
    if (sessionState.status === session_js_1.SessionStatus.NotInitialized) {
        args.onSessionStateChange({
            type: session_js_1.SessionEventType.Inactive,
            message: "Session is not initialized",
        });
    }
    else if (sessionState.status === session_js_1.SessionStatus.Closed) {
        args.onSessionStateChange({
            type: session_js_1.SessionEventType.Revoked,
            message: "Session has been revoked",
        });
    }
    else if (args.sessionConfig.expiresAt <= now) {
        args.onSessionStateChange({
            type: session_js_1.SessionEventType.Expired,
            message: "Session has expired",
        });
    }
    else {
        const timeToExpiry = Number(args.sessionConfig.expiresAt - now) * 1000;
        if (args.sessionNotifyTimeout) {
            clearTimeout(args.sessionNotifyTimeout);
        }
        const newTimeout = setTimeout(() => {
            args.onSessionStateChange({
                type: session_js_1.SessionEventType.Expired,
                message: "Session has expired",
            });
        }, timeToExpiry);
        return {
            newTimeout,
        };
    }
    return {};
};
exports.sessionStateNotify = sessionStateNotify;
//# sourceMappingURL=session.js.map