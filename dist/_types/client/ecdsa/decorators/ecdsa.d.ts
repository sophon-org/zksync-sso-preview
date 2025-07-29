import { type Chain, type Transport } from "viem";
import { type CreateSessionArgs, type CreateSessionReturnType, type RevokeSessionArgs, type RevokeSessionReturnType } from "../../session/actions/session.js";
import type { ClientWithZksyncSsoEcdsaData } from "../client.js";
export type ZksyncSsoEcdsaActions = {
    createSession: (args: Omit<CreateSessionArgs, "contracts">) => Promise<CreateSessionReturnType>;
    revokeSession: (args: Omit<RevokeSessionArgs, "contracts">) => Promise<RevokeSessionReturnType>;
};
export declare const zksyncSsoEcdsaActions: <transport extends Transport = Transport, chain extends Chain = Chain>(client: ClientWithZksyncSsoEcdsaData<transport, chain>) => {
    createSession: (args: Omit<CreateSessionArgs, "contracts">) => Promise<{
        transactionReceipt: import("viem").TransactionReceipt;
    }>;
    revokeSession: (args: Omit<RevokeSessionArgs, "contracts">) => Promise<{
        transactionReceipt: import("viem").TransactionReceipt;
    }>;
};
//# sourceMappingURL=ecdsa.d.ts.map