import { type Account, type Address, type Chain, type Client, type Hash, type Hex, type Prettify, type TransactionReceipt, type Transport } from "viem";
export type ProposeGuardianArgs = {
    newGuardian: Address;
    contracts: {
        recovery: Address;
    };
    origin?: string;
    paymaster?: {
        address: Address;
        paymasterInput?: Hex;
    };
    onTransactionSent?: (hash: Hash) => void;
};
export type ProposeGuardianReturnType = {
    transactionReceipt: TransactionReceipt;
};
export declare const proposeGuardian: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<ProposeGuardianArgs>) => Promise<Prettify<ProposeGuardianReturnType>>;
export type ConfirmGuardianArgs = {
    accountToGuard: Address;
    contracts: {
        recovery: Address;
    };
    origin?: string;
    paymaster?: {
        address: Address;
        paymasterInput?: Hex;
    };
    onTransactionSent?: (hash: Hash) => void;
};
export type ConfirmGuardianReturnType = {
    transactionReceipt: TransactionReceipt;
};
export declare const confirmGuardian: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<ConfirmGuardianArgs>) => Promise<Prettify<ConfirmGuardianReturnType>>;
export type RemoveGuardianArgs = {
    guardian: Address;
    contracts: {
        recovery: Address;
    };
    origin?: string;
    paymaster?: {
        address: Address;
        paymasterInput?: Hex;
    };
    onTransactionSent?: (hash: Hash) => void;
};
export type RemoveGuardianReturnType = {
    transactionReceipt: TransactionReceipt;
};
export declare const removeGuardian: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<RemoveGuardianArgs>) => Promise<Prettify<RemoveGuardianReturnType>>;
//# sourceMappingURL=recovery.d.ts.map