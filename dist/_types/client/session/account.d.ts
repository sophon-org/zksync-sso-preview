import type { Address } from "abitype";
import { type CustomSource, type Hash, type Hex, type LocalAccount } from "viem";
export type ToSessionAccountParameters = {
    /** Address of the deployed Account's Contract implementation. */
    address: Address;
    signTransaction: (parameters: {
        hash: Hash;
        to: Address;
        callData?: Hash;
    }) => Promise<Hex>;
};
export type SessionAccount = LocalAccount<"ssoSessionAccount"> & {
    sign: NonNullable<CustomSource["sign"]>;
};
export declare function toSessionAccount(parameters: ToSessionAccountParameters): SessionAccount;
//# sourceMappingURL=account.d.ts.map