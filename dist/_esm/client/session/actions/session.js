import { encodeFunctionData } from "viem";
import { readContract, waitForTransactionReceipt } from "viem/actions";
import { getGeneralPaymasterInput, sendTransaction } from "viem/zksync";
import { SessionKeyValidatorAbi } from "../../../abi/SessionKeyValidator.js";
import { getTransactionWithPaymasterData } from "../../../paymaster/index.js";
import { noThrow } from "../../../utils/helpers.js";
import { SessionEventType, SessionStatus } from "../../../utils/session.js";
export const createSession = async (client, args) => {
    const callData = encodeFunctionData({
        abi: SessionKeyValidatorAbi,
        functionName: "createSession",
        args: [args.sessionConfig],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.session,
        paymaster: args.paymaster?.address,
        paymasterInput: args.paymaster?.address ? (args.paymaster?.paymasterInput || getGeneralPaymasterInput({ innerInput: "0x" })) : undefined,
        data: callData,
        gas: 10000000n, // TODO: Remove when gas estimation is fixed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
    const transactionWithPaymasterData = await getTransactionWithPaymasterData(client.chain.id, client.account.address, sendTransactionArgs, args.paymasterHandler);
    const transactionHash = await sendTransaction(client, transactionWithPaymasterData);
    if (args.onTransactionSent) {
        noThrow(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("createSession transaction reverted");
    return {
        transactionReceipt,
    };
};
export const revokeSession = async (client, args) => {
    const callData = encodeFunctionData({
        abi: SessionKeyValidatorAbi,
        functionName: "revokeKey",
        args: [args.sessionId],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.session,
        paymaster: args.paymaster?.address,
        paymasterInput: args.paymaster?.address ? (args.paymaster?.paymasterInput || getGeneralPaymasterInput({ innerInput: "0x" })) : undefined,
        data: callData,
        gas: 10000000n, // TODO: Remove when gas estimation is fixed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
    const transactionWithPaymasterData = await getTransactionWithPaymasterData(client.chain.id, client.account.address, sendTransactionArgs, args.paymasterHandler);
    const transactionHash = await sendTransaction(client, transactionWithPaymasterData);
    if (args.onTransactionSent) {
        noThrow(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("createSession transaction reverted");
    return {
        transactionReceipt,
    };
};
export const getSessionState = async (client, args) => {
    const sessionState = await readContract(client, {
        address: args.contracts.session,
        abi: SessionKeyValidatorAbi,
        functionName: "sessionState",
        args: [args.account, args.sessionConfig],
    });
    return {
        sessionState: sessionState,
    };
};
/**
 * Checks the current session state and sets up expiry notification.
 * This function will trigger the callback with the session state.
 */
export const sessionStateNotify = (args) => {
    // Generate a session ID for tracking timeouts
    const { sessionState } = args;
    const now = BigInt(Math.floor(Date.now() / 1000));
    // Check session status
    if (sessionState.status === SessionStatus.NotInitialized) { // Not initialized
        args.onSessionStateChange({
            type: SessionEventType.Inactive,
            message: "Session is not initialized",
        });
    }
    else if (sessionState.status === SessionStatus.Closed) { // Closed/Revoked
        args.onSessionStateChange({
            type: SessionEventType.Revoked,
            message: "Session has been revoked",
        });
    }
    else if (args.sessionConfig.expiresAt <= now) {
        // Session has expired
        args.onSessionStateChange({
            type: SessionEventType.Expired,
            message: "Session has expired",
        });
    }
    else {
        // Session is active, set up expiry notification
        const timeToExpiry = Number(args.sessionConfig.expiresAt - now) * 1000;
        if (args.sessionNotifyTimeout) {
            clearTimeout(args.sessionNotifyTimeout);
        }
        const newTimeout = setTimeout(() => {
            args.onSessionStateChange({
                type: SessionEventType.Expired,
                message: "Session has expired",
            });
        }, timeToExpiry);
        return {
            newTimeout,
        };
    }
    return {};
};
//# sourceMappingURL=session.js.map