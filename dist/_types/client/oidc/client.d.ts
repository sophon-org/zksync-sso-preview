import { type Account, type Address, type Chain, type Client, type Prettify, type PublicRpcSchema, type RpcSchema, type Transport, type WalletClientConfig, type WalletRpcSchema } from "viem";
import { type ZksyncSsoWalletActions } from "../recovery/decorators/wallet.js";
import { type OidcAccount } from "./account.js";
import type { ZksyncSsoOidcActions } from "./decorators/actions.js";
export declare const signOidcTransaction: (recoveryValidatorAddress: Address) => `0x${string}`;
export interface SsoClientConfig<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined> extends Omit<WalletClientConfig<transport, chain, Account, rpcSchema>, "account"> {
    chain: NonNullable<chain>;
    address: Address;
    contracts: OidcRequiredContracts;
    key?: string;
    name?: string;
}
export type OidcRequiredContracts = {
    passkey: Address;
    recovery: Address;
    recoveryOidc: Address;
};
export type ZKsyncSsoOidcData = {
    contracts: OidcRequiredContracts;
};
export type ZkSyncSsoClient<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined> = Prettify<Client<transport, chain, OidcAccount, rpcSchema extends RpcSchema ? [...PublicRpcSchema, ...WalletRpcSchema, ...rpcSchema] : [...PublicRpcSchema, ...WalletRpcSchema], ZksyncSsoWalletActions<chain, OidcAccount> & ZksyncSsoOidcActions> & ZKsyncSsoOidcData>;
export type ClientWithOidcData<transport extends Transport = Transport, chain extends Chain = Chain, account extends Account = Account> = Client<transport, chain, account> & ZKsyncSsoOidcData;
export declare function createZkSyncOidcClient<transport extends Transport, chain extends Chain, rpcSchema extends RpcSchema | undefined = undefined>(givenParams: SsoClientConfig<transport, chain, rpcSchema>): ZkSyncSsoClient<transport, chain, rpcSchema>;
//# sourceMappingURL=client.d.ts.map