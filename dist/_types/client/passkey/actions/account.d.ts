import { type Account, type Address, type Chain, type Client, type Hash, type Hex, type Prettify, type TransactionReceipt, type Transport } from "viem";
import type { SessionConfig } from "../../../utils/session.js";
export type DeployAccountPasskeyArgs = {
    location: Address;
    credentialId: string;
    credentialPublicKey: Uint8Array;
    expectedOrigin?: string;
};
export declare const encodePasskeyModuleData: (args: DeployAccountPasskeyArgs) => Promise<Hash>;
export type DeployAccountArgs = {
    credentialId: string;
    credentialPublicKey: Uint8Array;
    paymasterAddress?: Address;
    paymasterInput?: Hex;
    expectedOrigin?: string;
    uniqueAccountId?: string;
    contracts: {
        accountFactory: Address;
        passkey: Address;
        session: Address;
        recovery: Address;
        recoveryOidc: Address;
    };
    initialSession?: SessionConfig;
    onTransactionSent?: (hash: Hash) => void;
};
export type DeployAccountReturnType = {
    address: Address;
    transactionReceipt: TransactionReceipt;
};
export type FetchAccountArgs = {
    uniqueAccountId?: string;
    expectedOrigin?: string;
    contracts: {
        accountFactory: Address;
        passkey: Address;
        session: Address;
        recovery: Address;
    };
};
export type FetchAccountReturnType = {
    username: string;
    address: Address;
    passkeyPublicKey: Uint8Array;
};
export declare const deployAccount: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<DeployAccountArgs>) => Promise<DeployAccountReturnType>;
export declare const fetchAccount: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<FetchAccountArgs>) => Promise<FetchAccountReturnType>;
//# sourceMappingURL=account.d.ts.map