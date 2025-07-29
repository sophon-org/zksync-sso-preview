"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOidcAccount = exports.addOidcAccount = void 0;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const index_js_1 = require("../../../abi/index.js");
const helpers_js_1 = require("../../../utils/helpers.js");
const addOidcAccount = async (client, args) => {
    const callData = (0, viem_1.encodeFunctionData)({
        abi: index_js_1.OidcRecoveryValidatorAbi,
        functionName: "addOidcAccount",
        args: [args.oidcDigest, args.iss],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recoveryOidc,
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
        throw new Error("addOidcAccount transaction reverted");
    return {
        transactionReceipt,
    };
};
exports.addOidcAccount = addOidcAccount;
const removeOidcAccount = async (client, args) => {
    const callData = (0, viem_1.encodeFunctionData)({
        abi: index_js_1.OidcRecoveryValidatorAbi,
        functionName: "deleteOidcAccount",
        args: [],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recoveryOidc,
        data: callData,
        gas: 10000000n,
        type: "eip712",
    };
    const transactionHash = await (0, zksync_1.sendTransaction)(client, sendTransactionArgs);
    const transactionReceipt = await (0, actions_1.waitForTransactionReceipt)(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("removeOidcAccount transaction reverted");
    return transactionReceipt;
};
exports.removeOidcAccount = removeOidcAccount;
//# sourceMappingURL=oidc.js.map