"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionEventType = exports.SessionErrorType = exports.getPeriodIdsForTransaction = exports.SessionStatus = exports.ConstraintCondition = exports.LimitZero = exports.LimitUnlimited = exports.LimitType = void 0;
exports.validateSessionTransaction = validateSessionTransaction;
const viem_1 = require("viem");
const helpers_js_1 = require("./helpers.js");
var LimitType;
(function (LimitType) {
    LimitType[LimitType["Unlimited"] = 0] = "Unlimited";
    LimitType[LimitType["Lifetime"] = 1] = "Lifetime";
    LimitType[LimitType["Allowance"] = 2] = "Allowance";
})(LimitType || (exports.LimitType = LimitType = {}));
exports.LimitUnlimited = {
    limitType: LimitType.Unlimited,
    limit: 0n,
    period: 0n,
};
exports.LimitZero = {
    limitType: LimitType.Lifetime,
    limit: 0n,
    period: 0n,
};
var ConstraintCondition;
(function (ConstraintCondition) {
    ConstraintCondition[ConstraintCondition["Unconstrained"] = 0] = "Unconstrained";
    ConstraintCondition[ConstraintCondition["Equal"] = 1] = "Equal";
    ConstraintCondition[ConstraintCondition["Greater"] = 2] = "Greater";
    ConstraintCondition[ConstraintCondition["Less"] = 3] = "Less";
    ConstraintCondition[ConstraintCondition["GreaterEqual"] = 4] = "GreaterEqual";
    ConstraintCondition[ConstraintCondition["LessEqual"] = 5] = "LessEqual";
    ConstraintCondition[ConstraintCondition["NotEqual"] = 6] = "NotEqual";
})(ConstraintCondition || (exports.ConstraintCondition = ConstraintCondition = {}));
var SessionStatus;
(function (SessionStatus) {
    SessionStatus[SessionStatus["NotInitialized"] = 0] = "NotInitialized";
    SessionStatus[SessionStatus["Active"] = 1] = "Active";
    SessionStatus[SessionStatus["Closed"] = 2] = "Closed";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
const getPeriodIdsForTransaction = (args) => {
    const timestamp = args.timestamp || BigInt(Math.floor(Date.now() / 1000));
    const target = (0, viem_1.getAddress)(args.target.toLowerCase());
    const getId = (limit) => {
        if (limit.limitType === LimitType.Allowance) {
            return timestamp / limit.period;
        }
        return 0n;
    };
    const findTransferPolicy = () => {
        return args.sessionConfig.transferPolicies.find((policy) => policy.target === target);
    };
    const findCallPolicy = () => {
        return args.sessionConfig.callPolicies.find((policy) => policy.target === target && policy.selector == args.selector);
    };
    const isContractCall = !!args.selector;
    const policy = isContractCall ? findCallPolicy() : findTransferPolicy();
    if (!policy)
        throw new Error("Transaction does not fit any policy");
    const periodIds = [
        getId(args.sessionConfig.feeLimit),
        getId(policy.valueLimit),
        ...(isContractCall ? policy.constraints.map((constraint) => getId(constraint.limit)) : []),
    ];
    return periodIds;
};
exports.getPeriodIdsForTransaction = getPeriodIdsForTransaction;
var SessionErrorType;
(function (SessionErrorType) {
    SessionErrorType["SessionInactive"] = "session_inactive";
    SessionErrorType["SessionExpired"] = "session_expired";
    SessionErrorType["FeeLimitExceeded"] = "fee_limit_exceeded";
    SessionErrorType["NoCallPolicy"] = "no_call_policy";
    SessionErrorType["NoTransferPolicy"] = "no_transfer_policy";
    SessionErrorType["MaxValuePerUseExceeded"] = "max_value_per_use_exceeded";
    SessionErrorType["ValueLimitExceeded"] = "value_limit_exceeded";
    SessionErrorType["ConstraintIndexOutOfBounds"] = "constraint_index_out_of_bounds";
    SessionErrorType["NoLimitStateFound"] = "no_limit_state_found";
    SessionErrorType["ParameterLimitExceeded"] = "parameter_limit_exceeded";
    SessionErrorType["ConstraintEqualViolated"] = "constraint_equal_violated";
    SessionErrorType["ConstraintGreaterViolated"] = "constraint_greater_violated";
    SessionErrorType["ConstraintLessViolated"] = "constraint_less_violated";
    SessionErrorType["ConstraintGreaterEqualViolated"] = "constraint_greater_equal_violated";
    SessionErrorType["ConstraintLessEqualViolated"] = "constraint_less_equal_violated";
    SessionErrorType["ConstraintNotEqualViolated"] = "constraint_not_equal_violated";
})(SessionErrorType || (exports.SessionErrorType = SessionErrorType = {}));
var SessionEventType;
(function (SessionEventType) {
    SessionEventType["Expired"] = "session_expired";
    SessionEventType["Revoked"] = "session_revoked";
    SessionEventType["Inactive"] = "session_inactive";
})(SessionEventType || (exports.SessionEventType = SessionEventType = {}));
function validateSessionTransaction(args) {
    const { sessionState, sessionConfig, transaction, currentTimestamp } = args;
    const timestamp = currentTimestamp || BigInt(Math.floor(Date.now() / 1000));
    if (sessionState.status !== SessionStatus.Active) {
        return {
            valid: false,
            error: {
                type: SessionErrorType.SessionInactive,
                message: "Session is not active",
            },
        };
    }
    if (sessionConfig.expiresAt <= timestamp) {
        return {
            valid: false,
            error: {
                type: SessionErrorType.SessionExpired,
                message: "Session has expired",
            },
        };
    }
    const to = (0, viem_1.getAddress)(transaction.to.toLowerCase());
    const value = transaction.value || 0n;
    const data = transaction.data || "0x";
    const gas = transaction.gas || 0n;
    const selector = data.length >= 10 ? data.slice(0, 10) : undefined;
    if (!transaction.paymaster) {
        const maxFee = (0, helpers_js_1.calculateMaxFee)({
            gas,
            gasPrice: transaction.gasPrice,
            maxFeePerGas: transaction.maxFeePerGas,
            maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
        });
        if (maxFee > sessionState.feesRemaining) {
            return {
                valid: false,
                error: {
                    type: SessionErrorType.FeeLimitExceeded,
                    message: `Transaction max fee ${maxFee} exceeds remaining fee limit ${sessionState.feesRemaining}`,
                },
            };
        }
    }
    const isContractCall = !!selector;
    if (isContractCall) {
        const policies = sessionConfig.callPolicies.filter((policy) => policy.target === to && policy.selector === selector);
        if (!policies.length) {
            return {
                valid: false,
                error: {
                    type: SessionErrorType.NoCallPolicy,
                    message: `No call policy found for target ${to} with selector ${selector}`,
                },
            };
        }
        const lowestMaxValuePerUse = (0, helpers_js_1.findSmallestBigInt)(policies.map((policy) => policy.maxValuePerUse));
        if (value > lowestMaxValuePerUse) {
            return {
                valid: false,
                error: {
                    type: SessionErrorType.MaxValuePerUseExceeded,
                    message: `Transaction value ${value} exceeds max value per use ${lowestMaxValuePerUse}`,
                },
            };
        }
        const remainingValue = findLowestRemainingValue(sessionState.callValue, to, selector);
        if (value > remainingValue) {
            return {
                valid: false,
                error: {
                    type: SessionErrorType.ValueLimitExceeded,
                    message: `Transaction value ${value} exceeds remaining value limit ${remainingValue || 0n}`,
                },
            };
        }
        for (const policy of policies) {
            const constraintResult = validateConstraints(data, policy.constraints, sessionState.callParams);
            if (!constraintResult.valid)
                return constraintResult;
        }
    }
    else {
        const policies = sessionConfig.transferPolicies.filter((policy) => policy.target === to);
        if (!policies.length) {
            return {
                valid: false,
                error: {
                    type: SessionErrorType.NoTransferPolicy,
                    message: `No transfer policy found for target ${to}`,
                },
            };
        }
        const lowestMaxValuePerUse = (0, helpers_js_1.findSmallestBigInt)(policies.map((policy) => policy.maxValuePerUse));
        if (value > lowestMaxValuePerUse) {
            return {
                valid: false,
                error: {
                    type: SessionErrorType.MaxValuePerUseExceeded,
                    message: `Transaction value ${value} exceeds max value per use ${lowestMaxValuePerUse}`,
                },
            };
        }
        const remainingValue = findLowestRemainingValue(sessionState.transferValue, to);
        if (value > remainingValue) {
            return {
                valid: false,
                error: {
                    type: SessionErrorType.ValueLimitExceeded,
                    message: `Transaction value ${value} exceeds remaining value limit ${remainingValue || 0n}`,
                },
            };
        }
    }
    return {
        valid: true,
        error: null,
    };
}
function findLowestRemainingValue(valueArray, target, selector) {
    if (selector) {
        const filtered = valueArray
            .filter((item) => item.target === target && item.selector === selector)
            .map((item) => item.remaining);
        if (!filtered.length)
            return 0n;
        return (0, helpers_js_1.findSmallestBigInt)(filtered);
    }
    else {
        const filtered = valueArray
            .filter((item) => item.target === target)
            .map((item) => item.remaining);
        if (!filtered.length)
            return 0n;
        return (0, helpers_js_1.findSmallestBigInt)(filtered);
    }
}
function validateConstraints(data, constraints, callParams) {
    const dataBytes = (0, viem_1.hexToBytes)(data);
    for (const constraint of constraints) {
        const index = Number(constraint.index);
        if (index + 32 > dataBytes.length) {
            return {
                valid: false,
                error: {
                    type: SessionErrorType.ConstraintIndexOutOfBounds,
                    message: `Constraint index ${index} out of bounds for data length ${dataBytes.length}`,
                },
            };
        }
        const parameterBytes = dataBytes.slice(index, index + 32);
        const parameterValue = (0, viem_1.bytesToHex)(parameterBytes);
        const refValue = constraint.refValue;
        let remaining;
        if (constraint.limit.limitType !== LimitType.Unlimited) {
            const paramItem = callParams.find((item) => Number(item.index) === index);
            remaining = paramItem?.remaining;
            if (remaining === undefined) {
                return {
                    valid: false,
                    error: {
                        type: SessionErrorType.NoLimitStateFound,
                        message: `No remaining limit state found for constraint at index ${index}`,
                    },
                };
            }
            const parameterValueBigInt = (0, viem_1.hexToBigInt)(parameterValue);
            if (parameterValueBigInt > remaining) {
                return {
                    valid: false,
                    error: {
                        type: SessionErrorType.ParameterLimitExceeded,
                        message: `Parameter value ${parameterValueBigInt} at index ${index} exceeds remaining limit ${remaining}`,
                    },
                };
            }
        }
        switch (constraint.condition) {
            case ConstraintCondition.Equal:
                if (parameterValue !== refValue) {
                    return {
                        valid: false,
                        error: {
                            type: SessionErrorType.ConstraintEqualViolated,
                            message: `Parameter value ${parameterValue} must equal ${refValue}`,
                        },
                    };
                }
                break;
            case ConstraintCondition.Greater:
                if (parameterValue <= refValue) {
                    return {
                        valid: false,
                        error: {
                            type: SessionErrorType.ConstraintGreaterViolated,
                            message: `Parameter value ${parameterValue} must be greater than ${refValue}`,
                        },
                    };
                }
                break;
            case ConstraintCondition.Less:
                if (parameterValue >= refValue) {
                    return {
                        valid: false,
                        error: {
                            type: SessionErrorType.ConstraintLessViolated,
                            message: `Parameter value ${parameterValue} must be less than ${refValue}`,
                        },
                    };
                }
                break;
            case ConstraintCondition.GreaterEqual:
                if (parameterValue < refValue) {
                    return {
                        valid: false,
                        error: {
                            type: SessionErrorType.ConstraintGreaterEqualViolated,
                            message: `Parameter value ${parameterValue} must be greater than or equal to ${refValue}`,
                        },
                    };
                }
                break;
            case ConstraintCondition.LessEqual:
                if (parameterValue > refValue) {
                    return {
                        valid: false,
                        error: {
                            type: SessionErrorType.ConstraintLessEqualViolated,
                            message: `Parameter value ${parameterValue} must be less than or equal to ${refValue}`,
                        },
                    };
                }
                break;
            case ConstraintCondition.NotEqual:
                if (parameterValue === refValue) {
                    return {
                        valid: false,
                        error: {
                            type: SessionErrorType.ConstraintNotEqualViolated,
                            message: `Parameter value ${parameterValue} must not equal ${refValue}`,
                        },
                    };
                }
                break;
            case ConstraintCondition.Unconstrained:
                break;
            default:
                console.warn(`Unhandled constraint condition: ${constraint.condition}`);
                break;
        }
    }
    return {
        valid: true,
        error: null,
    };
}
//# sourceMappingURL=session.js.map