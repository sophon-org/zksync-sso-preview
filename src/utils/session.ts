import { type Address, bytesToHex, getAddress, type Hash, type Hex, hexToBigInt, hexToBytes } from "viem";

import { calculateMaxFee, findSmallestBigInt } from "./helpers.js";

export enum LimitType {
  Unlimited = 0,
  Lifetime = 1,
  Allowance = 2,
}

/**
 * Limit is the value tracked either for a lifetime or a period on-chain
 * @member limitType - Used to validate limit & period values (unlimited has no limit, lifetime has no period, allowance has both!)
 * @member limit - The limit is exceeded if the tracked value is greater than this over the provided period
 * @member period - The block.timestamp divisor for the limit to be enforced (eg: 60 for a minute, 86400 for a day, 604800 for a week, unset for lifetime)
 */
export type Limit = {
  limitType: LimitType;
  limit: bigint;
  period: bigint;
};

export const LimitUnlimited = {
  limitType: LimitType.Unlimited,
  limit: 0n,
  period: 0n,
};

export const LimitZero = {
  limitType: LimitType.Lifetime,
  limit: 0n,
  period: 0n,
};

/**
 * Common logic operators to used combine multiple constraints
 */
export enum ConstraintCondition {
  Unconstrained = 0,
  Equal = 1,
  Greater = 2,
  Less = 3,
  GreaterEqual = 4,
  LessEqual = 5,
  NotEqual = 6,
}

/**
 * Constraint allows performing logic checks on any binary word (bytes32) in the transaction.
 * This can let you set spend limits against functions on specific contracts
 * @member index - The location of the start of the data in the transaction. This is not the index of the constraint within the containing array!
 * @member condition - The kind of check to perform (None, =, >, <, >=, <=, !=)
 * @member refValue - The value to compare against (as bytes32)
 * @member limit - The limit to enforce on the parsed value (from index)
 */
export type Constraint = {
  index: bigint;
  condition: ConstraintCondition;
  refValue: Hash;
  limit: Limit;
};

/**
 * CallPolicy is a policy for a specific contract (address/function) call.
 * @member target - Only one policy per target per session (unique mapping)
 * @member selector - Solidity function selector (the selector directly), also unique mapping with target
 * @member maxValuePerUse - Will reject transaction if value is set above this amount (for transfer or call)
 * @member valueLimit - If not set, unlimited. If a number or a limit without a period, converts to a lifetime value. Also rejects transactions that have cumulative value greater than what's set here
 * @member constraints - Array of conditions with specific limits for performing range and logic checks (e.g. 5 > x >= 30) on the transaction data (not value!)
 */
export type CallPolicy = {
  target: Address;
  valueLimit: Limit;
  maxValuePerUse: bigint;
  selector: Hash;
  constraints: Constraint[];
};

/**
 * Simplified CallPolicy for transactions with less than 4 bytes of data
 * @member target - Only one policy per target per session (unique mapping from CallPolicies)
 * @member maxValuePerUse - Will reject transaction if value is set above this amount
 * @member valueLimit - Validated from value
 */
export type TransferPolicy = {
  target: Address;
  maxValuePerUse: bigint;
  valueLimit: Limit;
};

/**
 * SessionConfig is a set of policies and metadata to validate a transaction
 * @member signer - The address that signs the transaction (session public key)
 * @member expiresAt - The block.timestamp at which the session is no longer valid
 * @member feeLimit - The maximum fee that can be paid for the transaction (maxFeePerGas * gasLimit)
 * @member callPolicies - Used to validate the transaction data, has complex calldata parsing logic
 * @member transferPolicies - Used to validate the transaction value when there's no additional data
 */
export type SessionConfig = {
  signer: Address;
  expiresAt: bigint;
  feeLimit: Limit;
  callPolicies: CallPolicy[];
  transferPolicies: TransferPolicy[];
};

export enum SessionStatus {
  NotInitialized = 0,
  Active = 1,
  Closed = 2,
}

export type SessionState = {
  status: SessionStatus;
  feesRemaining: bigint;
  transferValue: {
    remaining: bigint;
    target: Address;
    selector: Hash;
    index: bigint;
  }[];
  callValue: {
    remaining: bigint;
    target: Address;
    selector: Hash;
    index: bigint;
  }[];
  callParams: {
    remaining: bigint;
    target: Address;
    selector: Hash;
    index: bigint;
  }[];
};

export const getPeriodIdsForTransaction = (args: {
  sessionConfig: SessionConfig;
  target: Address;
  selector?: Hex;
  timestamp?: bigint;
}) => {
  const timestamp = args.timestamp || BigInt(Math.floor(Date.now() / 1000));
  const target = getAddress(args.target.toLowerCase());

  const getId = (limit: Limit): bigint => {
    if (limit.limitType === LimitType.Allowance) {
      return timestamp / limit.period;
    }
    return 0n;
  };

  const findTransferPolicy = () => {
    return args.sessionConfig.transferPolicies.find((policy) => policy.target === target);
  };
  const findCallPolicy = () => {
    return args.sessionConfig.callPolicies.find(
      (policy) => policy.target === target && policy.selector == args.selector,
    );
  };

  const isContractCall = !!args.selector;
  const policy: TransferPolicy | CallPolicy | undefined = isContractCall ? findCallPolicy() : findTransferPolicy();
  if (!policy) throw new Error("Transaction does not fit any policy");

  const periodIds = [
    getId(args.sessionConfig.feeLimit),
    getId(policy.valueLimit),
    ...(isContractCall ? (policy as CallPolicy).constraints.map((constraint) => getId(constraint.limit)) : []),
  ];
  return periodIds;
};

export enum SessionErrorType {
  SessionInactive = "session_inactive",
  SessionExpired = "session_expired",
  FeeLimitExceeded = "fee_limit_exceeded",
  NoCallPolicy = "no_call_policy",
  NoTransferPolicy = "no_transfer_policy",
  MaxValuePerUseExceeded = "max_value_per_use_exceeded",
  ValueLimitExceeded = "value_limit_exceeded",
  ConstraintIndexOutOfBounds = "constraint_index_out_of_bounds",
  NoLimitStateFound = "no_limit_state_found",
  ParameterLimitExceeded = "parameter_limit_exceeded",
  ConstraintEqualViolated = "constraint_equal_violated",
  ConstraintGreaterViolated = "constraint_greater_violated",
  ConstraintLessViolated = "constraint_less_violated",
  ConstraintGreaterEqualViolated = "constraint_greater_equal_violated",
  ConstraintLessEqualViolated = "constraint_less_equal_violated",
  ConstraintNotEqualViolated = "constraint_not_equal_violated",
}

export enum SessionEventType {
  Expired = "session_expired",
  Revoked = "session_revoked",
  Inactive = "session_inactive",
}

export type SessionStateEvent = {
  type: SessionEventType;
  message: string;
};

export type SessionStateEventCallback = (event: SessionStateEvent) => void;

export type ValidationResult = {
  valid: boolean;
  error: null | {
    type: SessionErrorType;
    message: string;
  };
};

export type TransactionValidationArgs = {
  sessionState: SessionState;
  sessionConfig: SessionConfig;
  transaction: {
    to: Address;
    value?: bigint;
    data?: Hex;
    gas?: bigint;
    gasPrice?: bigint;
    maxFeePerGas?: bigint;
    maxPriorityFeePerGas?: bigint;
    paymaster?: Address;
  };
  currentTimestamp?: bigint;
};

export function validateSessionTransaction(args: TransactionValidationArgs): ValidationResult {
  const { sessionState, sessionConfig, transaction, currentTimestamp } = args;
  const timestamp = currentTimestamp || BigInt(Math.floor(Date.now() / 1000));

  // 1. Check if session is active
  if (sessionState.status !== SessionStatus.Active) {
    return {
      valid: false,
      error: {
        type: SessionErrorType.SessionInactive,
        message: "Session is not active",
      },
    };
  }

  // 2. Check if session hasn't expired
  if (sessionConfig.expiresAt <= timestamp) {
    return {
      valid: false,
      error: {
        type: SessionErrorType.SessionExpired,
        message: "Session has expired",
      },
    };
  }

  // 3. Extract transaction data
  const to = getAddress(transaction.to.toLowerCase());
  const value = transaction.value || 0n;
  const data = transaction.data || "0x";
  const gas = transaction.gas || 0n;
  const selector = data.length >= 10 ? data.slice(0, 10) as Hash : undefined;

  if (!transaction.paymaster) {
    const maxFee = calculateMaxFee({
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
    const policies = sessionConfig.callPolicies.filter(
      (policy) => policy.target === to && policy.selector === selector,
    );

    if (!policies.length) {
      return {
        valid: false,
        error: {
          type: SessionErrorType.NoCallPolicy,
          message: `No call policy found for target ${to} with selector ${selector}`,
        },
      };
    }

    // Verify max value per use
    const lowestMaxValuePerUse = findSmallestBigInt(policies.map((policy) => policy.maxValuePerUse));
    if (value > lowestMaxValuePerUse) {
      return {
        valid: false,
        error: {
          type: SessionErrorType.MaxValuePerUseExceeded,
          message: `Transaction value ${value} exceeds max value per use ${lowestMaxValuePerUse}`,
        },
      };
    }

    // Verify remaining value limit
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
      if (!constraintResult.valid) return constraintResult;
    }
  } else {
    // This is a simple transfer
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

    // Verify max value per use
    const lowestMaxValuePerUse = findSmallestBigInt(policies.map((policy) => policy.maxValuePerUse));
    if (value > lowestMaxValuePerUse) {
      return {
        valid: false,
        error: {
          type: SessionErrorType.MaxValuePerUseExceeded,
          message: `Transaction value ${value} exceeds max value per use ${lowestMaxValuePerUse}`,
        },
      };
    }

    // Verify remaining value limit
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

function findLowestRemainingValue(
  valueArray: SessionState["transferValue"] | SessionState["callValue"],
  target: Address,
  selector?: Hash,
): bigint {
  if (selector) {
    const filtered = valueArray
      .filter((item) => item.target === target && item.selector === selector)
      .map((item) => item.remaining);
    if (!filtered.length) return 0n;
    return findSmallestBigInt(filtered);
  } else {
    const filtered = valueArray
      .filter((item) => item.target === target)
      .map((item) => item.remaining);
    if (!filtered.length) return 0n;
    return findSmallestBigInt(filtered);
  }
}

function validateConstraints(
  data: Hex,
  constraints: Constraint[],
  callParams: SessionState["callParams"],
): ValidationResult {
  const dataBytes = hexToBytes(data);

  for (const constraint of constraints) {
    // Find proper index and extract data
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
    const parameterValue = bytesToHex(parameterBytes);
    const refValue = constraint.refValue;

    // Find remaining limit value if applicable
    let remaining: bigint | undefined;
    if (constraint.limit.limitType !== LimitType.Unlimited) {
      const paramItem = callParams.find((item) => Number(item.index) === index);
      remaining = paramItem?.remaining;

      // If this is a limited constraint, but we don't have state for it, something is wrong
      if (remaining === undefined) {
        return {
          valid: false,
          error: {
            type: SessionErrorType.NoLimitStateFound,
            message: `No remaining limit state found for constraint at index ${index}`,
          },
        };
      }

      // Check if parameter value exceeds remaining limit
      const parameterValueBigInt = hexToBigInt(parameterValue);
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

    // Check condition
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
        // Unconstrained means no checks, so we skip
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
