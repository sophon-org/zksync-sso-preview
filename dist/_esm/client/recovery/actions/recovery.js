import { encodeFunctionData, keccak256, toHex } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { getGeneralPaymasterInput, sendTransaction } from "viem/zksync";
import { GuardianRecoveryValidatorAbi } from "../../../abi/GuardianRecoveryValidator.js";
import { noThrow } from "../../../utils/helpers.js";
export const proposeGuardian = async (client, args) => {
    let origin = args.origin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const callData = encodeFunctionData({
        abi: GuardianRecoveryValidatorAbi,
        functionName: "proposeGuardian",
        args: [keccak256(toHex(origin)), args.newGuardian],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recovery,
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
        throw new Error("proposeGuardian transaction reverted");
    return {
        transactionReceipt,
    };
};
export const confirmGuardian = async (client, args) => {
    let origin = args.origin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const callData = encodeFunctionData({
        abi: GuardianRecoveryValidatorAbi,
        functionName: "addGuardian",
        args: [keccak256(toHex(origin)), args.accountToGuard],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recovery,
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
        throw new Error("confirmGuardian transaction reverted");
    return {
        transactionReceipt,
    };
};
export const removeGuardian = async (client, args) => {
    let origin = args.origin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const callData = encodeFunctionData({
        abi: GuardianRecoveryValidatorAbi,
        functionName: "removeGuardian",
        args: [keccak256(toHex(origin)), args.guardian],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recovery,
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
        throw new Error("removeGuardian transaction reverted");
    return {
        transactionReceipt,
    };
};
//# sourceMappingURL=recovery.js.map