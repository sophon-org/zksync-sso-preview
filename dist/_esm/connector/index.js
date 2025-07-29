import { ChainNotConfiguredError, createConnector, getConnectorClient as wagmiGetConnectorClient, } from "@wagmi/core";
import { getAddress, SwitchChainError, toHex, UserRejectedRequestError, } from "viem";
import { EthereumProviderError } from "../errors/errors.js";
import { WalletProvider } from "../index.js";
export { callPolicy } from "../client-auth-server/index.js";
export const zksyncSsoConnector = (parameters) => {
    let walletProvider;
    let accountsChanged;
    let chainChanged;
    let disconnect;
    const destroyWallet = () => {
        if (walletProvider) {
            if (accountsChanged) {
                walletProvider.removeListener("accountsChanged", accountsChanged);
                accountsChanged = undefined;
            }
            if (chainChanged) {
                walletProvider.removeListener("chainChanged", chainChanged);
                chainChanged = undefined;
            }
            if (disconnect) {
                walletProvider.removeListener("disconnect", disconnect);
                disconnect = undefined;
            }
        }
        walletProvider = undefined;
    };
    return createConnector((config) => ({
        icon: "https://zksync.io/favicon.ico",
        id: "zksync-sso",
        name: "ZKsync",
        // supportsSimulation: true,
        type: "zksync-sso",
        async connect({ chainId } = {}) {
            try {
                const provider = await this.getProvider();
                const accounts = (await provider.request({
                    method: "eth_requestAccounts",
                })).map((x) => getAddress(x));
                if (!accountsChanged) {
                    accountsChanged = this.onAccountsChanged.bind(this);
                    provider.on("accountsChanged", accountsChanged);
                }
                if (!chainChanged) {
                    chainChanged = this.onChainChanged.bind(this);
                    provider.on("chainChanged", chainChanged);
                }
                if (!disconnect) {
                    disconnect = this.onDisconnect.bind(this);
                    provider.on("disconnect", disconnect);
                }
                // Switch to chain if provided
                let walletChainId = await this.getChainId();
                if (chainId && walletChainId !== chainId) {
                    const chain = await this.switchChain({ chainId }).catch((error) => {
                        if (error.code === UserRejectedRequestError.code)
                            throw error;
                        return { id: walletChainId };
                    });
                    walletChainId = chain?.id ?? walletChainId;
                }
                return { accounts, chainId: walletChainId };
            }
            catch (error) {
                console.error(`Error connecting to ${this.name}`, error);
                if (/(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(error.message))
                    throw new UserRejectedRequestError(error);
                throw error;
            }
        },
        async disconnect() {
            const provider = await this.getProvider();
            provider.disconnect();
            destroyWallet();
        },
        async getAccounts() {
            const provider = await this.getProvider();
            return (await provider.request({
                method: "eth_accounts",
            })).map((x) => getAddress(x));
        },
        async getChainId() {
            const provider = await this.getProvider();
            const chainId = await provider.request({
                method: "eth_chainId",
            });
            if (!chainId)
                return config.chains[0].id;
            return Number(chainId);
        },
        async getClient(parameters) {
            if (!walletProvider)
                throw new Error("Wallet provider not initialized");
            return walletProvider.getClient(parameters);
        },
        async getProvider() {
            if (!walletProvider) {
                walletProvider = new WalletProvider({
                    metadata: {
                        name: parameters.metadata?.name,
                        icon: parameters.metadata?.icon,
                        configData: parameters.metadata?.configData,
                    },
                    authServerUrl: parameters.authServerUrl,
                    session: parameters.session,
                    transports: config.transports,
                    chains: config.chains,
                    paymasterHandler: parameters.paymasterHandler,
                    customCommunicator: parameters.communicator,
                });
            }
            return walletProvider;
        },
        async isAuthorized() {
            try {
                const accounts = await this.getAccounts();
                return !!accounts.length;
            }
            catch {
                return false;
            }
        },
        async switchChain({ chainId }) {
            const chain = config.chains.find((chain) => chain.id === chainId);
            if (!chain)
                throw new SwitchChainError(new ChainNotConfiguredError());
            try {
                const provider = await this.getProvider();
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: toHex(chainId) }],
                });
                return chain;
            }
            catch (error) {
                throw new SwitchChainError(error);
            }
        },
        onAccountsChanged(accounts) {
            if (!accounts.length)
                return;
            config.emitter.emit("change", {
                accounts: accounts.map((x) => getAddress(x)),
            });
        },
        onChainChanged(chain) {
            config.emitter.emit("change", { chainId: Number(chain) });
        },
        async onDisconnect(error) {
            config.emitter.emit("disconnect");
            if (error instanceof EthereumProviderError && error.code === 4900)
                return; // User initiated
            console.error("Account disconnected", error);
        },
    }));
};
export const isSsoSessionClient = (client) => {
    return client.key === "zksync-sso-session-wallet";
};
export const isSsoSessionClientConnected = async (config, parameters = {}) => {
    const connectorClient = await wagmiGetConnectorClient(config, parameters);
    return isSsoSessionClient(connectorClient);
};
export const getConnectedSsoSessionClient = async (config, parameters = {}) => {
    const connectorClient = await wagmiGetConnectorClient(config, parameters);
    if (!isSsoSessionClient(connectorClient)) {
        throw new Error("ZKsync SSO Session Client not connected");
    }
    const sessionClient = connectorClient;
    return sessionClient;
};
//# sourceMappingURL=index.js.map