import type { Account, Address, Chain, Client, Hash, Hex, Prettify, TransactionReceipt, Transport } from "viem";
import { type CustomPaymasterHandler } from "../../../paymaster/index.js";
import type { SessionConfig } from "../../../utils/session.js";
export type DeployAccountArgs = {
    owner: Address;
    contracts: {
        accountFactory: Address;
        session: Address;
    };
    initialSession?: SessionConfig;
    salt?: Uint8Array;
    prefix?: string;
    onTransactionSent?: (hash: Hash) => void;
    paymasterHandler?: CustomPaymasterHandler;
    paymaster?: {
        address: Address;
        paymasterInput?: Hex;
    };
};
export type DeployAccountReturnType = {
    address: Address;
    transactionReceipt: TransactionReceipt;
};
export type FetchAccountArgs = {
    prefix?: string;
    owner: Address;
    contracts: {
        accountFactory: Address;
        session: Address;
    };
};
export type FetchAccountReturnType = {
    address: Address;
    owner: Address;
};
export declare const deployAccount: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<DeployAccountArgs>) => Promise<DeployAccountReturnType>;
export declare const fetchAccount: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<FetchAccountArgs>) => Promise<FetchAccountReturnType>;
//# sourceMappingURL=account.d.ts.map