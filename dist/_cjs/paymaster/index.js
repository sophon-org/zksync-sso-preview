"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionWithPaymasterData = getTransactionWithPaymasterData;
async function getTransactionWithPaymasterData(chainId, fromAccount, transaction, customPaymasterHandler = undefined) {
    if (customPaymasterHandler
        && !transaction.paymaster
        && !transaction.paymasterInput) {
        const paymasterResult = await customPaymasterHandler({
            chainId,
            from: fromAccount,
            data: transaction.data,
            gas: transaction.gas ?? 0n,
            gasPrice: transaction.gasPrice ?? 0n,
            gasPerPubdata: transaction.gasPerPubdata ?? 0n,
            maxFeePerGas: transaction.maxFeePerGas ?? 0n,
            maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ?? 0n,
            nonce: transaction.nonce ?? 0,
            to: transaction.to ?? "0x0",
            value: transaction.value ?? 0n,
        });
        return {
            ...transaction,
            paymaster: paymasterResult.paymaster,
            paymasterInput: paymasterResult.paymasterInput,
            gas: paymasterResult.gas ?? transaction.gas,
            maxFeePerGas: paymasterResult.maxFeePerGas ?? transaction.maxFeePerGas,
            maxPriorityFeePerGas: paymasterResult.maxPriorityFeePerGas ?? transaction.maxPriorityFeePerGas,
            gasPerPubdata: paymasterResult.gasPerPubdata ?? transaction.gasPerPubdata,
            from: fromAccount,
            chainId,
        };
    }
    return {
        ...transaction,
        from: fromAccount,
        chainId,
    };
}
__exportStar(require("./handlers/index.js"), exports);
//# sourceMappingURL=index.js.map