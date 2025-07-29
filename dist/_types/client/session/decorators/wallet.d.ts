import { type Account, type Chain, type Transport, type WalletActions } from "viem";
import type { ClientWithZksyncSsoSessionData } from "../client.js";
export type ZksyncSsoWalletActions<chain extends Chain, account extends Account> = Omit<WalletActions<chain, account>, "addChain" | "getPermissions" | "requestAddresses" | "requestPermissions" | "switchChain" | "watchAsset" | "prepareTransactionRequest">;
export declare function zksyncSsoWalletActions<transport extends Transport, chain extends Chain, account extends Account>(client: ClientWithZksyncSsoSessionData<transport, chain, account>): ZksyncSsoWalletActions<chain, account>;
//# sourceMappingURL=wallet.d.ts.map