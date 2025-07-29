import type { Address } from "abitype";
import { type Chain, type CustomSource, type Hash, type Hex, type LocalAccount, type Transport } from "viem";
import type { PasskeyRequiredContracts } from "./client.js";
export type ToPasskeyAccountParameters<transport extends Transport = Transport, chain extends Chain = Chain> = {
    /** Address of the deployed Account's Contract implementation. */
    address: Address;
    sign: (parameters: {
        hash: Hash;
    }) => Promise<Hex>;
    chain: NonNullable<chain>;
    transport: transport;
    contracts: PasskeyRequiredContracts;
};
export type PasskeyAccount = LocalAccount<"ssoPasskeyAccount"> & {
    sign: NonNullable<CustomSource["sign"]>;
};
export declare function toPasskeyAccount<transport extends Transport = Transport, chain extends Chain = Chain>(parameters: ToPasskeyAccountParameters<transport, chain>): PasskeyAccount;
//# sourceMappingURL=account.d.ts.map