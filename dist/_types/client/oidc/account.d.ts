import type { Address } from "abitype";
import { type CustomSource, type Hash, type Hex, type LocalAccount } from "viem";
export type ToOidcAccountParameters = {
    address: Address;
    signTransaction: (parameters: {
        hash: Hash;
    }) => Promise<Hex>;
};
export type OidcAccount = LocalAccount<"ssoOidcAccount"> & {
    sign: NonNullable<CustomSource["sign"]>;
};
export declare function toOidcAccount(parameters: ToOidcAccountParameters): OidcAccount;
//# sourceMappingURL=account.d.ts.map