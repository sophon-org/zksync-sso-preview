import { type Config, type GetConnectorClientParameters } from "@wagmi/core";
import type { Compute } from "@wagmi/core/internal";
import { type Account, type Client } from "viem";
import type { ZksyncSsoSessionClient } from "../client/index.js";
import type { Communicator } from "../communicator/interface.js";
import { type AppMetadata, type ProviderInterface, type SessionPreferences } from "../index.js";
import type { CustomPaymasterHandler } from "../paymaster/index.js";
export { callPolicy } from "../client-auth-server/index.js";
export type ZksyncSsoConnectorOptions = {
    metadata?: Partial<AppMetadata>;
    session?: SessionPreferences | (() => SessionPreferences | Promise<SessionPreferences>);
    authServerUrl?: string;
    paymasterHandler?: CustomPaymasterHandler;
    communicator?: Communicator;
};
export declare const zksyncSsoConnector: (parameters: ZksyncSsoConnectorOptions) => import("@wagmi/core").CreateConnectorFn<ProviderInterface, Record<string, unknown>, Record<string, unknown>>;
export type GetConnectedSsoClientReturnType<config extends Config = Config, chainId extends config["chains"][number]["id"] = config["chains"][number]["id"]> = Compute<ZksyncSsoSessionClient<config["_internal"]["transports"][chainId], Extract<config["chains"][number], {
    id: chainId;
}>, undefined, Account>>;
export declare const isSsoSessionClient: (client: Client) => boolean;
export declare const isSsoSessionClientConnected: <config extends Config, chainId extends config["chains"][number]["id"]>(config: config, parameters?: GetConnectorClientParameters<config, chainId>) => Promise<boolean>;
export declare const getConnectedSsoSessionClient: <config extends Config, chainId extends config["chains"][number]["id"]>(config: config, parameters?: GetConnectorClientParameters<config, chainId>) => Promise<GetConnectedSsoClientReturnType<config, chainId>>;
//# sourceMappingURL=index.d.ts.map