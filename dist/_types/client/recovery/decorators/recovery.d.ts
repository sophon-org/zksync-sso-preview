import { type Chain, type Transport } from "viem";
import { type AddAccountOwnerPasskeyArgs, type AddAccountOwnerPasskeyReturnType } from "../../passkey/index.js";
import type { ClientWithZksyncSsoRecoveryData } from "../client.js";
export type ZksyncSsoRecoveryActions = {
    addAccountOwnerPasskey: (args: Omit<AddAccountOwnerPasskeyArgs, "contracts">) => Promise<AddAccountOwnerPasskeyReturnType>;
};
export declare function zksyncSsoRecoveryActions<transport extends Transport, chain extends Chain>(client: ClientWithZksyncSsoRecoveryData<transport, chain>): ZksyncSsoRecoveryActions;
//# sourceMappingURL=recovery.d.ts.map