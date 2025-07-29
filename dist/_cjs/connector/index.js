"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedSsoSessionClient = exports.isSsoSessionClientConnected = exports.isSsoSessionClient = exports.zksyncSsoConnector = exports.callPolicy = void 0;
const core_1 = require("@wagmi/core");
const viem_1 = require("viem");
const errors_js_1 = require("../errors/errors.js");
const index_js_1 = require("../index.js");
var index_js_2 = require("../client-auth-server/index.js");
Object.defineProperty(exports, "callPolicy", { enumerable: true, get: function () { return index_js_2.callPolicy; } });
const zksyncSsoConnector = (parameters) => {
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
    return (0, core_1.createConnector)((config) => ({
        icon: "https://zksync.io/favicon.ico",
        id: "zksync-sso",
        name: "ZKsync",
        type: "zksync-sso",
        async connect({ chainId } = {}) {
            try {
                const provider = await this.getProvider();
                const accounts = (await provider.request({
                    method: "eth_requestAccounts",
                })).map((x) => (0, viem_1.getAddress)(x));
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
                let walletChainId = await this.getChainId();
                if (chainId && walletChainId !== chainId) {
                    const chain = await this.switchChain({ chainId }).catch((error) => {
                        if (error.code === viem_1.UserRejectedRequestError.code)
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
                    throw new viem_1.UserRejectedRequestError(error);
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
            })).map((x) => (0, viem_1.getAddress)(x));
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
                walletProvider = new index_js_1.WalletProvider({
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
                throw new viem_1.SwitchChainError(new core_1.ChainNotConfiguredError());
            try {
                const provider = await this.getProvider();
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: (0, viem_1.toHex)(chainId) }],
                });
                return chain;
            }
            catch (error) {
                throw new viem_1.SwitchChainError(error);
            }
        },
        onAccountsChanged(accounts) {
            if (!accounts.length)
                return;
            config.emitter.emit("change", {
                accounts: accounts.map((x) => (0, viem_1.getAddress)(x)),
            });
        },
        onChainChanged(chain) {
            config.emitter.emit("change", { chainId: Number(chain) });
        },
        async onDisconnect(error) {
            config.emitter.emit("disconnect");
            if (error instanceof errors_js_1.EthereumProviderError && error.code === 4900)
                return;
            console.error("Account disconnected", error);
        },
    }));
};
exports.zksyncSsoConnector = zksyncSsoConnector;
const isSsoSessionClient = (client) => {
    return client.key === "zksync-sso-session-wallet";
};
exports.isSsoSessionClient = isSsoSessionClient;
const isSsoSessionClientConnected = async (config, parameters = {}) => {
    const connectorClient = await (0, core_1.getConnectorClient)(config, parameters);
    return (0, exports.isSsoSessionClient)(connectorClient);
};
exports.isSsoSessionClientConnected = isSsoSessionClientConnected;
const getConnectedSsoSessionClient = async (config, parameters = {}) => {
    const connectorClient = await (0, core_1.getConnectorClient)(config, parameters);
    if (!(0, exports.isSsoSessionClient)(connectorClient)) {
        throw new Error("ZKsync SSO Session Client not connected");
    }
    const sessionClient = connectorClient;
    return sessionClient;
};
exports.getConnectedSsoSessionClient = getConnectedSsoSessionClient;
//# sourceMappingURL=index.js.map