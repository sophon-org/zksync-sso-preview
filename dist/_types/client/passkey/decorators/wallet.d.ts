import { type Account, type Chain, type Transport, type WalletActions } from "viem";
import type { ClientWithZksyncSsoPasskeyData } from "../client.js";
export type ZksyncSsoPasskeyWalletActions<chain extends Chain, account extends Account> = Omit<WalletActions<chain, account>, "addChain" | "getPermissions" | "requestAddresses" | "requestPermissions" | "switchChain" | "watchAsset" | "prepareTransactionRequest">;
export declare function zksyncSsoPasskeyWalletActions<transport extends Transport, chain extends Chain, account extends Account>(client: ClientWithZksyncSsoPasskeyData<transport, chain>): ZksyncSsoPasskeyWalletActions<chain, account>;
//# sourceMappingURL=wallet.d.ts.map