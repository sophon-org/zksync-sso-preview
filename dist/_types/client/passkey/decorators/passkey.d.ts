import { type Chain, type TransactionReceipt, type Transport } from "viem";
import { type AddOidcAccountArgs, type AddOidcAccountReturnType } from "../../recovery/actions/oidc.js";
import { type ConfirmGuardianArgs, type ConfirmGuardianReturnType, type ProposeGuardianArgs, type ProposeGuardianReturnType, type RemoveGuardianArgs, type RemoveGuardianReturnType } from "../../recovery/actions/recovery.js";
import { type CreateSessionArgs, type CreateSessionReturnType, type RevokeSessionArgs, type RevokeSessionReturnType } from "../../session/actions/session.js";
import type { ClientWithZksyncSsoPasskeyData } from "../client.js";
export type ZksyncSsoPasskeyActions = {
    createSession: (args: Omit<CreateSessionArgs, "contracts">) => Promise<CreateSessionReturnType>;
    revokeSession: (args: Omit<RevokeSessionArgs, "contracts">) => Promise<RevokeSessionReturnType>;
    proposeGuardian: (args: Omit<ProposeGuardianArgs, "contracts">) => Promise<ProposeGuardianReturnType>;
    confirmGuardian: (args: Omit<ConfirmGuardianArgs, "contracts">) => Promise<ConfirmGuardianReturnType>;
    removeGuardian: (args: Omit<RemoveGuardianArgs, "contracts">) => Promise<RemoveGuardianReturnType>;
    addOidcAccount: (args: Omit<AddOidcAccountArgs, "contracts">) => Promise<AddOidcAccountReturnType>;
    removeOidcAccount: () => Promise<TransactionReceipt>;
};
export declare function zksyncSsoPasskeyActions<transport extends Transport, chain extends Chain>(client: ClientWithZksyncSsoPasskeyData<transport, chain>): ZksyncSsoPasskeyActions;
//# sourceMappingURL=passkey.d.ts.map