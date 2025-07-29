import { BaseError, type ExactPartial } from "viem";
import type { ZksyncTransactionSerializable } from "viem/zksync";
export declare function assertEip712Transaction(transaction: ExactPartial<ZksyncTransactionSerializable>): void;
export type InvalidEip712TransactionErrorType = InvalidEip712TransactionError & {
    name: "InvalidEip712TransactionError";
};
export declare class InvalidEip712TransactionError extends BaseError {
    name: string;
    constructor();
}
//# sourceMappingURL=assertEip712Transaction.d.ts.map