import { type Account, type Chain, type PublicActions, type Transport } from "viem";
import { type ClientWithZksyncSsoSessionData } from "../client.js";
export declare function publicActionsRewrite<transport extends Transport, chain extends Chain, account extends Account>(client: ClientWithZksyncSsoSessionData<transport, chain, account>): Pick<PublicActions<transport, chain, account>, "estimateContractGas" | "estimateGas" | "prepareTransactionRequest">;
//# sourceMappingURL=publicActionsRewrite.d.ts.map