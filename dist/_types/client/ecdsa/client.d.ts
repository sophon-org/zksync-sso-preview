import { type Account, type Address, type Chain, type Client, type Prettify, type PublicActions, type PublicRpcSchema, type RpcSchema, type Transport, type WalletActions, type WalletClientConfig, type WalletRpcSchema } from "viem";
import type { CustomPaymasterHandler } from "../../paymaster/index.js";
import { type ZksyncSsoEcdsaActions } from "./decorators/ecdsa.js";
import type { Signer } from "./types.js";
export declare function createZksyncEcdsaClient<transport extends Transport, chain extends Chain, rpcSchema extends RpcSchema | undefined = undefined>(_parameters: ZksyncSsoEcdsaClientConfig<transport, chain, rpcSchema>): Promise<ZksyncSsoEcdsaClient<transport, chain, rpcSchema>>;
export type EcdsaRequiredContracts = {
    session: Address;
    accountFactory?: Address;
};
type ZksyncSsoEcdsaData = {
    contracts: EcdsaRequiredContracts;
    paymasterHandler?: CustomPaymasterHandler;
};
export type ClientWithZksyncSsoEcdsaData<transport extends Transport = Transport, chain extends Chain = Chain> = Client<transport, chain, Account> & ZksyncSsoEcdsaData;
export type ZksyncSsoEcdsaClient<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined, account extends Account = Account> = Prettify<Client<transport, chain, account, rpcSchema extends RpcSchema ? [...PublicRpcSchema, ...WalletRpcSchema, ...rpcSchema] : [...PublicRpcSchema, ...WalletRpcSchema], PublicActions<transport, chain, account> & WalletActions<chain, account> & ZksyncSsoEcdsaActions> & ZksyncSsoEcdsaData>;
export interface ZksyncSsoEcdsaClientConfig<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined> extends Omit<WalletClientConfig<transport, chain, Account, rpcSchema>, "account"> {
    chain: NonNullable<chain>;
    address: Address;
    owner: Signer;
    contracts: EcdsaRequiredContracts;
    key?: string;
    name?: string;
}
export {};
//# sourceMappingURL=client.d.ts.map