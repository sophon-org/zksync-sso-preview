import { type Account, type Address, type Chain, type Client, type Prettify, type PublicRpcSchema, type RpcSchema, type Transport, type WalletClientConfig, type WalletRpcSchema } from "viem";
import { type ZksyncSsoRecoveryActions } from "./decorators/recovery.js";
import { type ZksyncSsoWalletActions } from "./decorators/wallet.js";
export declare const signRecoveryTransaction: (recoveryValidatorAddress: `0x${string}`) => `0x${string}`;
export declare function createZksyncRecoveryGuardianClient<transport extends Transport, chain extends Chain, rpcSchema extends RpcSchema | undefined = undefined>(_parameters: ZksyncSsoRecoveryClientConfig<transport, chain, rpcSchema>): ZksyncSsoRecoveryClient<transport, chain, rpcSchema>;
export type RecoveryRequiredContracts = {
    recovery: Address;
    passkey: Address;
};
type ZksyncSsoRecoveryData = {
    contracts: RecoveryRequiredContracts;
};
export type ClientWithZksyncSsoRecoveryData<transport extends Transport = Transport, chain extends Chain = Chain, account extends Account = Account> = Client<transport, chain, account> & ZksyncSsoRecoveryData;
export type ZksyncSsoRecoveryClient<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined, account extends Account = Account> = Prettify<Client<transport, chain, account, rpcSchema extends RpcSchema ? [...PublicRpcSchema, ...WalletRpcSchema, ...rpcSchema] : [...PublicRpcSchema, ...WalletRpcSchema], ZksyncSsoWalletActions<chain, account> & ZksyncSsoRecoveryActions> & ZksyncSsoRecoveryData>;
export interface ZksyncSsoRecoveryClientConfig<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined> extends Omit<WalletClientConfig<transport, chain, Account, rpcSchema>, "account"> {
    chain: NonNullable<chain>;
    address: Address;
    contracts: RecoveryRequiredContracts;
    key?: string;
    name?: string;
}
export {};
//# sourceMappingURL=client.d.ts.map