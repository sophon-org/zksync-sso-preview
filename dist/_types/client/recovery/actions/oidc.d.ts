import { type Account, type Address, type Chain, type Client, type Hash, type Hex, type Prettify, type TransactionReceipt, type Transport } from "viem";
export type AddOidcAccountArgs = {
    contracts: {
        recoveryOidc: Address;
    };
    paymaster?: {
        address: Address;
        paymasterInput?: Hex;
    };
    oidcDigest: Hex;
    iss: string;
    onTransactionSent?: (hash: Hash) => void;
};
export type AddOidcAccountReturnType = {
    transactionReceipt: TransactionReceipt;
};
export declare const addOidcAccount: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<AddOidcAccountArgs>) => Promise<Prettify<AddOidcAccountReturnType>>;
export type RemoveOidcAccountArgs = {
    contracts: {
        recoveryOidc: Address;
    };
};
export declare const removeOidcAccount: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<RemoveOidcAccountArgs>) => Promise<TransactionReceipt>;
//# sourceMappingURL=oidc.d.ts.map