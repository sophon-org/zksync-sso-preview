import type { Address, Hex, UnionRequiredBy } from "viem";
import type { TransactionRequestEIP712 } from "viem/chains";
export interface CustomPaymasterParameters {
    nonce: number;
    from: Address;
    to: Address;
    gas: bigint;
    gasPrice: bigint;
    gasPerPubdata: bigint;
    value: bigint;
    data: Hex | undefined;
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
    chainId: number;
}
export type CustomPaymasterHandlerResponse = Promise<{
    paymaster: Address;
    paymasterInput: Hex;
    maxFeePerGas?: bigint;
    maxPriorityFeePerGas?: bigint;
    gasPerPubdata?: bigint;
    gas?: bigint;
}>;
export type CustomPaymasterHandler = (args: CustomPaymasterParameters) => CustomPaymasterHandlerResponse;
export declare function getTransactionWithPaymasterData(chainId: number, fromAccount: Address, transaction: TransactionRequestEIP712, customPaymasterHandler?: CustomPaymasterHandler | undefined): Promise<UnionRequiredBy<TransactionRequestEIP712, "from"> & {
    chainId: number;
}>;
export * from "./handlers/index.js";
//# sourceMappingURL=index.d.ts.map