"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDatePreferences = exports.formatLimitPreferences = exports.callPolicy = void 0;
exports.formatSessionPreferences = formatSessionPreferences;
const viem_1 = require("viem");
const session_js_1 = require("../../utils/session.js");
const utils_js_1 = require("./utils.js");
;
const callPolicy = (policy) => policy;
exports.callPolicy = callPolicy;
;
const formatLimitPreferences = (limit) => {
    if (typeof limit === "bigint") {
        return {
            limitType: session_js_1.LimitType.Lifetime,
            limit,
            period: 0n,
        };
    }
    if ("limitType" in limit) {
        if (limit.limitType === "lifetime" || limit.limitType === session_js_1.LimitType.Lifetime) {
            return {
                limitType: session_js_1.LimitType.Lifetime,
                limit: limit.limit,
                period: 0n,
            };
        }
        else if (limit.limitType === "unlimited" || limit.limitType === session_js_1.LimitType.Unlimited) {
            return {
                limitType: session_js_1.LimitType.Unlimited,
                limit: 0n,
                period: 0n,
            };
        }
        else if (limit.limitType === "allowance" || limit.limitType === session_js_1.LimitType.Allowance) {
            return {
                limitType: session_js_1.LimitType.Allowance,
                limit: limit.limit,
                period: typeof limit.period === "string" ? (0, utils_js_1.msStringToSeconds)(limit.period) : limit.period,
            };
        }
        throw new Error(`Invalid limit type: ${limit.limitType}`);
    }
    if (limit.period) {
        return {
            limitType: session_js_1.LimitType.Allowance,
            limit: limit.limit,
            period: typeof limit.period === "string" ? (0, utils_js_1.msStringToSeconds)(limit.period) : limit.period,
        };
    }
    return {
        limitType: session_js_1.LimitType.Lifetime,
        limit: limit.limit,
        period: 0n,
    };
};
exports.formatLimitPreferences = formatLimitPreferences;
const formatDatePreferences = (date) => {
    if (typeof date === "string") {
        const now = Math.floor(new Date().getTime() / 1000);
        const seconds = (0, utils_js_1.msStringToSeconds)(date);
        return BigInt(now) + seconds;
    }
    if (date instanceof Date) {
        const seconds = Math.floor(date.getTime() / 1000);
        return BigInt(seconds);
    }
    return date;
};
exports.formatDatePreferences = formatDatePreferences;
function formatSessionPreferences(preferences, defaults) {
    return {
        expiresAt: preferences.expiry ? (0, exports.formatDatePreferences)(preferences.expiry) : defaults.expiresAt,
        feeLimit: preferences.feeLimit ? (0, exports.formatLimitPreferences)(preferences.feeLimit) : defaults.feeLimit,
        callPolicies: preferences.contractCalls?.map((policy) => {
            const allowedStateMutability = ["nonpayable", "payable"];
            const abiFunction = policy.abi.find((fn) => fn.type === "function" && fn.name === policy.functionName && allowedStateMutability.includes(fn.stateMutability));
            if (!abiFunction)
                throw new Error(`Function not found in the provided ABI: ${policy.functionName}`);
            const selector = (0, viem_1.toFunctionSelector)(abiFunction);
            const valueLimit = policy.valueLimit ? (0, exports.formatLimitPreferences)(policy.valueLimit) : session_js_1.LimitZero;
            return {
                target: (0, viem_1.getAddress)(policy.address.toLowerCase()),
                maxValuePerUse: policy.maxValuePerUse ?? valueLimit.limit,
                valueLimit,
                selector: selector,
                constraints: policy.constraints?.map((constraint) => {
                    const limit = constraint.limit ? (0, exports.formatLimitPreferences)(constraint.limit) : session_js_1.LimitUnlimited;
                    let condition = session_js_1.ConstraintCondition.Unconstrained;
                    if (constraint.condition) {
                        condition = session_js_1.ConstraintCondition[constraint.condition];
                    }
                    else if (constraint.value !== undefined && constraint.value !== null) {
                        condition = session_js_1.ConstraintCondition.Equal;
                    }
                    const input = abiFunction.inputs[constraint.index];
                    if (!input) {
                        throw new Error(`Target function parameter not found in the provided ABI function. Provided at function ${policy.functionName}, index ${constraint.index}`);
                    }
                    const isDynamicType = (0, utils_js_1.isDynamicInputType)(input.type);
                    if (isDynamicType) {
                        throw new Error(`Function parameters with dynamic types are not supported for constraint validation. Provided at function ${policy.functionName}, index ${constraint.index}`);
                    }
                    const isFollowedByDynamicType = (0, utils_js_1.isFollowedByDynamicInputType)(abiFunction, constraint.index);
                    if (isFollowedByDynamicType) {
                        throw new Error(`Target function parameter is followed by a dynamic type parameter. Provided at function ${policy.functionName}, index ${constraint.index}`);
                    }
                    const startingAbiChunkIndex = (0, utils_js_1.getParameterChunkIndex)(abiFunction, constraint.index);
                    if (constraint.value === undefined || constraint.value === null) {
                        return {
                            index: BigInt(startingAbiChunkIndex),
                            condition: session_js_1.ConstraintCondition.Unconstrained,
                            refValue: (0, viem_1.toHex)("", { size: 32 }),
                            limit,
                        };
                    }
                    const encodedInput = (0, viem_1.encodeAbiParameters)([input], [constraint.value]);
                    const abiBytesChunks = (0, utils_js_1.encodedInputToAbiChunks)(encodedInput);
                    const ALLOWED_OVERFLOW_CONDITIONS = [
                        session_js_1.ConstraintCondition.Unconstrained,
                        session_js_1.ConstraintCondition.Equal,
                        session_js_1.ConstraintCondition.NotEqual,
                    ];
                    const ALLOWED_OVERFLOW_LIMIT_TYPES = [
                        session_js_1.LimitType.Unlimited,
                    ];
                    if (abiBytesChunks.length > 1
                        && (!ALLOWED_OVERFLOW_CONDITIONS.includes(condition)
                            || !ALLOWED_OVERFLOW_LIMIT_TYPES.includes(limit.limitType))) {
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
            const valueLimit = policy.valueLimit ? (0, exports.formatLimitPreferences)(policy.valueLimit) : session_js_1.LimitZero;
            return {
                target: (0, viem_1.getAddress)(policy.to.toLowerCase()),
                maxValuePerUse: policy.maxValuePerUse ?? valueLimit.limit,
                valueLimit,
            };
        }) ?? [],
    };
}
//# sourceMappingURL=index.js.map