import type { Address } from "abitype";
import { type CustomSource, type Hash, type Hex, type LocalAccount } from "viem";
export type ToRecoveryAccountParameters = {
    /** Address of the deployed Account's Contract implementation. */
    address: Address;
    signTransaction: (parameters: {
        hash: Hash;
    }) => Promise<Hex>;
};
export type RecoveryAccount = LocalAccount<"ssoRecoveryAccount"> & {
    sign: NonNullable<CustomSource["sign"]>;
};
export declare function toRecoveryAccount(parameters: ToRecoveryAccountParameters): RecoveryAccount;
//# sourceMappingURL=account.d.ts.map