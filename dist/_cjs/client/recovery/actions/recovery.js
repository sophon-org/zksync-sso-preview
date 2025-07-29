"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGuardian = exports.confirmGuardian = exports.proposeGuardian = void 0;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const GuardianRecoveryValidator_js_1 = require("../../../abi/GuardianRecoveryValidator.js");
const helpers_js_1 = require("../../../utils/helpers.js");
const proposeGuardian = async (client, args) => {
    let origin = args.origin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const callData = (0, viem_1.encodeFunctionData)({
        abi: GuardianRecoveryValidator_js_1.GuardianRecoveryValidatorAbi,
        functionName: "proposeGuardian",
        args: [(0, viem_1.keccak256)((0, viem_1.toHex)(origin)), args.newGuardian],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recovery,
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
        throw new Error("proposeGuardian transaction reverted");
    return {
        transactionReceipt,
    };
};
exports.proposeGuardian = proposeGuardian;
const confirmGuardian = async (client, args) => {
    let origin = args.origin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const callData = (0, viem_1.encodeFunctionData)({
        abi: GuardianRecoveryValidator_js_1.GuardianRecoveryValidatorAbi,
        functionName: "addGuardian",
        args: [(0, viem_1.keccak256)((0, viem_1.toHex)(origin)), args.accountToGuard],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recovery,
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
        throw new Error("confirmGuardian transaction reverted");
    return {
        transactionReceipt,
    };
};
exports.confirmGuardian = confirmGuardian;
const removeGuardian = async (client, args) => {
    let origin = args.origin;
    if (!origin) {
        try {
            origin = window.location.origin;
        }
        catch {
            throw new Error("Can't identify expectedOrigin, please provide it manually");
        }
    }
    const callData = (0, viem_1.encodeFunctionData)({
        abi: GuardianRecoveryValidator_js_1.GuardianRecoveryValidatorAbi,
        functionName: "removeGuardian",
        args: [(0, viem_1.keccak256)((0, viem_1.toHex)(origin)), args.guardian],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recovery,
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
        throw new Error("removeGuardian transaction reverted");
    return {
        transactionReceipt,
    };
};
exports.removeGuardian = removeGuardian;
//# sourceMappingURL=recovery.js.map