"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEip712Domain = void 0;
const viem_1 = require("viem");
const zksync_1 = require("viem/zksync");
const assertEip712Transaction_js_1 = require("./assertEip712Transaction.js");
const gasPerPubdataDefault = 50000n;
const getEip712Domain = (transaction) => {
    (0, assertEip712Transaction_js_1.assertEip712Transaction)(transaction);
    const message = transactionToMessage(transaction);
    return {
        domain: {
            name: `zkSync`,
            version: "2",
            chainId: transaction.chainId,
        },
        types: {
            Transaction: [
                { name: "txType", type: "uint256" },
                { name: "from", type: "uint256" },
                { name: "to", type: "uint256" },
                { name: "gasLimit", type: "uint256" },
                { name: "gasPerPubdataByteLimit", type: "uint256" },
                { name: "maxFeePerGas", type: "uint256" },
                { name: "maxPriorityFeePerGas", type: "uint256" },
                { name: "paymaster", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "value", type: "uint256" },
                { name: "data", type: "bytes" },
                { name: "factoryDeps", type: "bytes32[]" },
                { name: "paymasterInput", type: "bytes" },
            ],
        },
        primaryType: "Transaction",
        message: message,
    };
};
exports.getEip712Domain = getEip712Domain;
function transactionToMessage(transaction) {
    const { gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data, } = transaction;
    return {
        txType: 113n,
        from: BigInt(from),
        to: to ? BigInt(to) : 0n,
        gasLimit: gas ?? 0n,
        gasPerPubdataByteLimit: gasPerPubdata ?? gasPerPubdataDefault,
        maxFeePerGas: maxFeePerGas ?? 0n,
        maxPriorityFeePerGas: maxPriorityFeePerGas ?? 0n,
        paymaster: paymaster ? BigInt(paymaster) : 0n,
        nonce: nonce ? BigInt(nonce) : 0n,
        value: value ?? 0n,
        data: data ? data : "0x",
        factoryDeps: factoryDeps?.map((dep) => (0, viem_1.toHex)((0, zksync_1.hashBytecode)(dep))) ?? [],
        paymasterInput: paymasterInput ? paymasterInput : "0x",
    };
}
//# sourceMappingURL=getEip712Domain.js.map