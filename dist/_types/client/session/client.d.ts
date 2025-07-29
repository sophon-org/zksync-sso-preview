import { type Account, type Address, type Chain, type Client, type Hash, type Prettify, type PublicRpcSchema, type RpcSchema, type Transport, type WalletClientConfig, type WalletRpcSchema } from "viem";
import type { CustomPaymasterHandler } from "../../paymaster/index.js";
import type { SessionConfig, SessionStateEventCallback } from "../../utils/session.js";
import { type ZksyncSsoWalletActions } from "./decorators/wallet.js";
export declare const signSessionTransaction: (args: {
    sessionKeySignedHash: Hash;
    sessionContract: Address;
    sessionConfig: SessionConfig;
    to: Address;
    callData?: Hash;
    timestamp?: bigint;
}) => `0x${string}`;
export declare function createZksyncSessionClient<transport extends Transport, chain extends Chain, rpcSchema extends RpcSchema | undefined = undefined>(_parameters: ZksyncSsoSessionClientConfig<transport, chain, rpcSchema>): ZksyncSsoSessionClient<transport, chain, rpcSchema>;
export type SessionRequiredContracts = {
    session: Address;
};
type ZksyncSsoSessionData = {
    sessionKey: Hash;
    sessionConfig: SessionConfig;
    contracts: SessionRequiredContracts;
    paymasterHandler?: CustomPaymasterHandler;
    onSessionStateChange?: SessionStateEventCallback;
    skipPreTransactionStateValidation?: boolean;
    _sessionNotifyTimeout?: NodeJS.Timeout;
};
export type ClientWithZksyncSsoSessionData<transport extends Transport = Transport, chain extends Chain = Chain, account extends Account = Account> = Client<transport, chain, account> & ZksyncSsoSessionData;
export type ZksyncSsoSessionClient<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined, account extends Account = Account> = Prettify<Client<transport, chain, account, rpcSchema extends RpcSchema ? [...PublicRpcSchema, ...WalletRpcSchema, ...rpcSchema] : [...PublicRpcSchema, ...WalletRpcSchema], ZksyncSsoWalletActions<chain, account>> & ZksyncSsoSessionData>;
export interface ZksyncSsoSessionClientConfig<transport extends Transport = Transport, chain extends Chain = Chain, rpcSchema extends RpcSchema | undefined = undefined> extends Omit<WalletClientConfig<transport, chain, Account, rpcSchema>, "account"> {
    chain: NonNullable<chain>;
    address: Address;
    sessionKey: Hash;
    sessionConfig: SessionConfig;
    contracts: SessionRequiredContracts;
    key?: string;
    name?: string;
    paymasterHandler?: CustomPaymasterHandler;
    onSessionStateChange?: SessionStateEventCallback;
    skipPreTransactionStateValidation?: boolean;
}
export {};
//# sourceMappingURL=client.d.ts.map