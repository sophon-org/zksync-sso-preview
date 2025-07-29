import type { Address } from "abitype";
import type { CustomSource, LocalAccount } from "viem";
import { type Signer } from "./types.js";
export type ToEcdsaAccountParameters = {
    /** Address of the deployed SSO Wallet */
    address: Address;
    /** Owner of the EOA */
    owner: Signer;
};
export type EcdsaAccount = LocalAccount<"ssoEcdsaAccount"> & {
    sign: NonNullable<CustomSource["sign"]>;
};
export declare function toEcdsaAccount(parameters: ToEcdsaAccountParameters): Promise<EcdsaAccount>;
//# sourceMappingURL=account.d.ts.map