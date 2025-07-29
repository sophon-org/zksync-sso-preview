import { type Account, type Address, type Chain, type Client, type Prettify, type PublicActions, type PublicRpcSchema, type RpcSchema, type Transport, type WalletActions, type WalletClientConfig, type WalletRpcSchema } from "viem";
import type { CustomPaymasterHandler } from "../../paymaster/index.js";
import { type ZksyncSsoPasskeyActions } from "./decorators/passkey.js";
export declare function createZksyncPasskeyClient<transport extends Transport, chain extends Chain, rpcSchema extends RpcSchema | undefined = undefined>(_parameters: ZksyncSsoPasskeyClientConfig<transport, chain, rpcSchema>): ZksyncSsoPasskeyClient<transport, chain, rpcSchema>;
export type PasskeyRequiredContracts = {
    oidcKeyRegistry: Address;
    session: Address;
    passkey: Address;
    recovery: Address;
    recoveryOidc: Address;
    accountFactory?: Address;
};
type ZksyncSsoPasskeyData = {
    credentialPublicKey: Uint8Array;
    userName: string;
    userDisplayName: string;
    contracts: PasskeyRequiredContracts;
    paymasterHandler?: CustomPaymasterHandler;
};
export type ClientWithZksyncSsoPasskeyData<transport extends Transport = Transport, chain extends Chain = Chain> = Client<transport, chain, Account> & ZksyncSsoPasskeyData;
export type ZksyncSsoPasskeyClient<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined, account extends Account = Account> = Prettify<Client<transport, chain, account, rpcSchema extends RpcSchema ? [...PublicRpcSchema, ...WalletRpcSchema, ...rpcSchema] : [...PublicRpcSchema, ...WalletRpcSchema], PublicActions<transport, chain, account> & WalletActions<chain, account> & ZksyncSsoPasskeyActions> & ZksyncSsoPasskeyData>;
export interface ZksyncSsoPasskeyClientConfig<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined> extends Omit<WalletClientConfig<transport, chain, Account, rpcSchema>, "account"> {
    chain: NonNullable<chain>;
    address: Address;
    credentialPublicKey: Uint8Array;
    userName: string;
    userDisplayName: string;
    contracts: PasskeyRequiredContracts;
    key?: string;
    name?: string;
}
export {};
//# sourceMappingURL=client.d.ts.map