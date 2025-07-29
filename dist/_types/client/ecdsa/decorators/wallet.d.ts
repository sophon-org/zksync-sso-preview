import { type Account, type Chain, type Transport, type WalletActions } from "viem";
import type { ClientWithZksyncSsoEcdsaData } from "../client.js";
export type ZksyncSsoEcdsaWalletActions<chain extends Chain, account extends Account> = Omit<WalletActions<chain, account>, "addChain" | "getPermissions" | "requestAddresses" | "requestPermissions" | "switchChain" | "watchAsset" | "prepareTransactionRequest">;
export declare function zksyncSsoEcdsaWalletActions<transport extends Transport, chain extends Chain, account extends Account>(client: ClientWithZksyncSsoEcdsaData<transport, chain>): ZksyncSsoEcdsaWalletActions<chain, account>;
//# sourceMappingURL=wallet.d.ts.map