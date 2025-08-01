import { encodeAbiParameters, getAddress, toFunctionSelector, toHex } from "viem";
import { ConstraintCondition, LimitType, LimitUnlimited, LimitZero } from "../../utils/session.js";
import { encodedInputToAbiChunks, getParameterChunkIndex, isDynamicInputType, isFollowedByDynamicInputType, msStringToSeconds } from "./utils.js";
;
// Typesafety helper function
export const callPolicy = (policy) => policy;
;
export const formatLimitPreferences = (limit) => {
    /* Just bigint was passed */
    if (typeof limit === "bigint") {
        return {
            limitType: LimitType.Lifetime,
            limit,
            period: 0n,
        };
    }
    /* LimitType was specified */
    if ("limitType" in limit) {
        if (limit.limitType === "lifetime" || limit.limitType === LimitType.Lifetime) {
            return {
                limitType: LimitType.Lifetime,
                limit: limit.limit,
                period: 0n,
            };
        }
        else if (limit.limitType === "unlimited" || limit.limitType === LimitType.Unlimited) {
            return {
                limitType: LimitType.Unlimited,
                limit: 0n,
                period: 0n,
            };
        }
        else if (limit.limitType === "allowance" || limit.limitType === LimitType.Allowance) {
            return {
                limitType: LimitType.Allowance,
                limit: limit.limit,
                period: typeof limit.period === "string" ? msStringToSeconds(limit.period) : limit.period,
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error(`Invalid limit type: ${limit.limitType}`);
    }
    /* LimitType not selected */
    if (limit.period) {
        return {
            limitType: LimitType.Allowance,
            limit: limit.limit,
            period: typeof limit.period === "string" ? msStringToSeconds(limit.period) : limit.period,
        };
    }
    return {
        limitType: LimitType.Lifetime,
        limit: limit.limit,
        period: 0n,
    };
};
export const formatDatePreferences = (date) => {
    if (typeof date === "string") {
        const now = Math.floor(new Date().getTime() / 1000);
        const seconds = msStringToSeconds(date);
        return BigInt(now) + seconds;
    }
    if (date instanceof Date) {
        const seconds = Math.floor(date.getTime() / 1000);
        return BigInt(seconds);
    }
    return date;
};
export function formatSessionPreferences(preferences, defaults) {
    return {
        expiresAt: preferences.expiry ? formatDatePreferences(preferences.expiry) : defaults.expiresAt,
        feeLimit: preferences.feeLimit ? formatLimitPreferences(preferences.feeLimit) : defaults.feeLimit,
        callPolicies: preferences.contractCalls?.map((policy) => {
            const allowedStateMutability = ["nonpayable", "payable"];
            const abiFunction = policy.abi.find((fn) => fn.type === "function" && fn.name === policy.functionName && allowedStateMutability.includes(fn.stateMutability));
            if (!abiFunction)
                throw new Error(`Function not found in the provided ABI: ${policy.functionName}`);
            const selector = toFunctionSelector(abiFunction);
            const valueLimit = policy.valueLimit ? formatLimitPreferences(policy.valueLimit) : LimitZero;
            return {
                target: getAddress(policy.address.toLowerCase()),
                maxValuePerUse: policy.maxValuePerUse ?? valueLimit.limit,
                valueLimit,
                selector: selector,
                constraints: policy.constraints?.map((constraint) => {
                    const limit = constraint.limit ? formatLimitPreferences(constraint.limit) : LimitUnlimited;
                    let condition = ConstraintCondition.Unconstrained;
                    if (constraint.condition) {
                        condition = ConstraintCondition[constraint.condition];
                    }
                    else if (constraint.value !== undefined && constraint.value !== null) {
                        condition = ConstraintCondition.Equal;
                    }
                    const input = abiFunction.inputs[constraint.index];
                    if (!input) {
                        throw new Error(`Target function parameter not found in the provided ABI function. Provided at function ${policy.functionName}, index ${constraint.index}`);
                    }
                    const isDynamicType = isDynamicInputType(input.type);
                    if (isDynamicType) {
                        throw new Error(`Function parameters with dynamic types are not supported for constraint validation. Provided at function ${policy.functionName}, index ${constraint.index}`);
                    }
                    const isFollowedByDynamicType = isFollowedByDynamicInputType(abiFunction, constraint.index);
                    if (isFollowedByDynamicType) {
                        throw new Error(`Target function parameter is followed by a dynamic type parameter. Provided at function ${policy.functionName}, index ${constraint.index}`);
                    }
                    const startingAbiChunkIndex = getParameterChunkIndex(abiFunction, constraint.index);
                    if (constraint.value === undefined || constraint.value === null) {
                        return {
                            index: BigInt(startingAbiChunkIndex),
                            condition: ConstraintCondition.Unconstrained,
                            refValue: toHex("", { size: 32 }),
                            limit,
                        };
                    }
                    const encodedInput = encodeAbiParameters([input], [constraint.value]);
                    const abiBytesChunks = encodedInputToAbiChunks(encodedInput);
                    const ALLOWED_OVERFLOW_CONDITIONS = [
                        ConstraintCondition.Unconstrained,
                        ConstraintCondition.Equal,
                        ConstraintCondition.NotEqual,
                    ];
                    const ALLOWED_OVERFLOW_LIMIT_TYPES = [
                        LimitType.Unlimited,
                    ];
                    if (abiBytesChunks.length > 1
                        && (!ALLOWED_OVERFLOW_CONDITIONS.includes(condition) // Can't validate condition (e.g. < >) if value is split across multiple chunks
                            || !ALLOWED_OVERFLOW_LIMIT_TYPES.includes(limit.limitType) // Can't validate limit if value is split across multiple chunks
                        )) {
                        throw new Error(`Encoded input size of parameter at index ${constraint.index} of ${policy.functionName} exceeds the maximum size of 32 bytes: ${abiBytesChunks.length * 32} bytes`);
                    }
                    ;
                    return abiBytesChunks.map((abiChunk, index) => ({
                        index: BigInt(startingAbiChunkIndex + index),
                        condition,
                        refValue: abiChunk,
                        limit,
                    }));
                }).flat() ?? [],
            };
        }) ?? [],
        transferPolicies: preferences.transfers?.map((policy) => {
            const valueLimit = policy.valueLimit ? formatLimitPreferences(policy.valueLimit) : LimitZero;
            return {
                target: getAddress(policy.to.toLowerCase()),
                maxValuePerUse: policy.maxValuePerUse ?? valueLimit.limit,
                valueLimit,
            };
        }) ?? [],
    };
}
//# sourceMappingURL=index.js.map