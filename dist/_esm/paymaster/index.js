export async function getTransactionWithPaymasterData(chainId, fromAccount, transaction, customPaymasterHandler = undefined) {
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
export * from "./handlers/index.js";
//# sourceMappingURL=index.js.map