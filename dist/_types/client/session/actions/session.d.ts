import { type Account, type Address, type Chain, type Client, type Hash, type Hex, type Prettify, type TransactionReceipt, type Transport } from "viem";
import { type CustomPaymasterHandler } from "../../../paymaster/index.js";
import type { SessionConfig, SessionState, SessionStateEventCallback } from "../../../utils/session.js";
export type CreateSessionArgs = {
    sessionConfig: SessionConfig;
    contracts: {
        session: Address;
    };
    paymaster?: {
        address: Address;
        paymasterInput?: Hex;
    };
    onTransactionSent?: (hash: Hash) => void;
    paymasterHandler?: CustomPaymasterHandler;
};
export type CreateSessionReturnType = {
    transactionReceipt: TransactionReceipt;
};
export declare const createSession: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<CreateSessionArgs>) => Promise<Prettify<CreateSessionReturnType>>;
export type RevokeSessionArgs = {
    sessionId: Hash;
    contracts: {
        session: Address;
    };
    paymaster?: {
        address: Address;
        paymasterInput?: Hex;
    };
    onTransactionSent?: (hash: Hash) => void;
    paymasterHandler?: CustomPaymasterHandler;
};
export type RevokeSessionReturnType = {
    transactionReceipt: TransactionReceipt;
};
export declare const revokeSession: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<RevokeSessionArgs>) => Promise<Prettify<RevokeSessionReturnType>>;
export type GetSessionStateArgs = {
    account: Address;
    sessionConfig: SessionConfig;
    contracts: {
        session: Address;
    };
};
export type GetSessionStateReturnType = {
    sessionState: SessionState;
};
export declare const getSessionState: <transport extends Transport, chain extends Chain>(client: Client<transport, chain>, args: Prettify<GetSessionStateArgs>) => Promise<Prettify<GetSessionStateReturnType>>;
export type CheckSessionStateArgs = {
    sessionConfig: SessionConfig;
    sessionState: SessionState;
    onSessionStateChange: SessionStateEventCallback;
    sessionNotifyTimeout?: NodeJS.Timeout;
};
export type CheckSessionStateReturnType = {
    newTimeout?: NodeJS.Timeout;
};
/**
 * Checks the current session state and sets up expiry notification.
 * This function will trigger the callback with the session state.
 */
export declare const sessionStateNotify: (args: Prettify<CheckSessionStateArgs>) => CheckSessionStateReturnType;
//# sourceMappingURL=session.d.ts.map