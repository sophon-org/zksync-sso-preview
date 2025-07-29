import { type Account, type Address, type Chain, type Client, type Hex, type Prettify, type TransactionReceipt, type Transport } from "viem";
export type AddNewPasskeyViaOidcArgs = {
    credentialId: Hex;
    passkeyPubKey: [Hex, Hex];
    passkeyDomain: string;
    contracts: {
        recoveryOidc: Address;
        passkey: Address;
    };
};
export declare function addNewPasskeyViaOidc<transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<AddNewPasskeyViaOidcArgs>): Promise<TransactionReceipt>;
//# sourceMappingURL=addNewPasskeyViaOidc.d.ts.map