import { type Address, type Hash, type Hex } from "viem";
export declare enum LimitType {
    Unlimited = 0,
    Lifetime = 1,
    Allowance = 2
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
export declare const LimitUnlimited: {
    limitType: LimitType;
    limit: bigint;
    period: bigint;
};
export declare const LimitZero: {
    limitType: LimitType;
    limit: bigint;
    period: bigint;
};
/**
 * Common logic operators to used combine multiple constraints
 */
export declare enum ConstraintCondition {
    Unconstrained = 0,
    Equal = 1,
    Greater = 2,
    Less = 3,
    GreaterEqual = 4,
    LessEqual = 5,
    NotEqual = 6
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
export declare enum SessionStatus {
    NotInitialized = 0,
    Active = 1,
    Closed = 2
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
export declare const getPeriodIdsForTransaction: (args: {
    sessionConfig: SessionConfig;
    target: Address;
    selector?: Hex;
    timestamp?: bigint;
}) => bigint[];
export declare enum SessionErrorType {
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
    ConstraintNotEqualViolated = "constraint_not_equal_violated"
}
export declare enum SessionEventType {
    Expired = "session_expired",
    Revoked = "session_revoked",
    Inactive = "session_inactive"
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
export declare function validateSessionTransaction(args: TransactionValidationArgs): ValidationResult;
//# sourceMappingURL=session.d.ts.map