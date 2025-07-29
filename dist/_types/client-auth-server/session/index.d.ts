import { type Abi, type Address, type ContractFunctionArgs, type ContractFunctionName } from "viem";
import { ConstraintCondition, type Limit, LimitType, type SessionConfig } from "../../utils/session.js";
import type { ContractWriteMutability, IndexedValues } from "./type-utils.js";
export type PartialLimit = bigint | {
    limit: bigint;
    period?: string | bigint;
} | {
    limitType: "lifetime" | LimitType.Lifetime;
    limit: bigint;
} | {
    limitType: "unlimited" | LimitType.Unlimited;
} | {
    limitType: "allowance" | LimitType.Allowance;
    limit: bigint;
    period: string | bigint;
};
export type PartialCallPolicy = {
    address: Address;
    abi: Abi;
    functionName: string;
    maxValuePerUse?: bigint;
    valueLimit?: PartialLimit;
    constraints?: {
        index: number;
        value?: unknown;
        condition?: keyof typeof ConstraintCondition;
        limit?: PartialLimit;
    }[];
};
export interface TypesafePartialCallPolicy<abi extends Abi, functionName extends ContractFunctionName<abi, ContractWriteMutability>> extends PartialCallPolicy {
    abi: abi;
    functionName: functionName;
    constraints?: (IndexedValues<ContractFunctionArgs<abi, ContractWriteMutability, functionName>>[number] & {
        condition?: keyof typeof ConstraintCondition;
        limit?: PartialLimit;
    })[];
}
export declare const callPolicy: <abi extends Abi, functionName extends ContractFunctionName<abi, ContractWriteMutability>>(policy: TypesafePartialCallPolicy<abi, functionName>) => PartialCallPolicy;
export type PartialTransferPolicy = {
    to: Address;
    maxValuePerUse?: bigint;
    valueLimit?: PartialLimit;
};
export interface SessionPreferences {
    expiry?: string | bigint | Date;
    feeLimit?: PartialLimit;
    contractCalls?: PartialCallPolicy[];
    transfers?: PartialTransferPolicy[];
}
export declare const formatLimitPreferences: (limit: PartialLimit) => Limit;
export declare const formatDatePreferences: (date: string | bigint | Date) => bigint;
export declare function formatSessionPreferences(preferences: SessionPreferences, defaults: {
    expiresAt: bigint;
    feeLimit: Limit;
}): Omit<SessionConfig, "signer">;
//# sourceMappingURL=index.d.ts.map