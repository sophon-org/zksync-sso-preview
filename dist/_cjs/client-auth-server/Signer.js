"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signer = void 0;
const viem_1 = require("viem");
const index_js_1 = require("../client/index.js");
const index_js_2 = require("../paymaster/index.js");
const storage_js_1 = require("../utils/storage.js");
const utils_js_1 = require("./session/utils.js");
class Signer {
    constructor({ metadata, communicator, updateListener, session, chains, transports, paymasterHandler, onSessionStateChange, skipPreTransactionStateValidation, storage }) {
        Object.defineProperty(this, "getMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "communicator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "updateListener", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chains", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "transports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "sessionParameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "paymasterHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onSessionStateChange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "skipPreTransactionStateValidation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_account", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_chainsInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clearState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this._account.remove();
                this._chainsInfo.remove();
            }
        });
        if (!chains.length)
            throw new Error("At least one chain must be included in the config");
        this.getMetadata = metadata;
        this.communicator = communicator;
        this.updateListener = updateListener;
        this.sessionParameters = session;
        this.chains = chains;
        this.transports = transports || {};
        this.paymasterHandler = paymasterHandler;
        this.onSessionStateChange = onSessionStateChange;
        this.skipPreTransactionStateValidation = skipPreTransactionStateValidation;
        this._chainsInfo = new storage_js_1.StorageItem(storage_js_1.StorageItem.scopedStorageKey("chainsInfo"), [], { storage });
        this._account = new storage_js_1.StorageItem(storage_js_1.StorageItem.scopedStorageKey("account"), null, {
            onChange: (newValue) => {
                if (newValue) {
                    this.updateListener.onAccountsUpdate([newValue.address]);
                    this.updateListener.onChainUpdate(newValue.activeChainId);
                    this.createWalletClient();
                }
                else {
                    this.updateListener.onAccountsUpdate([]);
                }
            },
            storage,
        });
        try {
            if (this.account)
                this.createWalletClient();
        }
        catch (error) {
            console.error("Failed to create wallet client", error);
            console.error("Logging out to prevent crash loop");
            this.clearState();
        }
    }
    get walletClient() {
        return this.client?.instance;
    }
    getClient(parameters) {
        const chainId = parameters?.chainId || this.chain.id;
        const chain = this.chains.find((e) => e.id === chainId);
        if (!chain)
            throw new Error(`Chain with id ${chainId} is not supported`);
        if (!this.walletClient)
            throw new Error("Wallet client is not created");
        return this.walletClient;
    }
    get account() {
        const account = this._account.get();
        if (!account)
            return null;
        const chain = this.chains.find((e) => e.id === account.activeChainId);
        return {
            ...account,
            activeChainId: chain?.id || this.chains[0].id,
        };
    }
    get session() { return this.account?.session; }
    get chainsInfo() { return this._chainsInfo.get(); }
    get accounts() { return this.account ? [this.account.address] : []; }
    get chain() {
        const chainId = this.account?.activeChainId || this.chains[0].id;
        return this.chains.find((e) => e.id === chainId);
    }
    createWalletClient() {
        const session = this.session;
        const chain = this.chain;
        const chainInfo = this.chainsInfo.find((e) => e.id === chain.id);
        if (!this.account)
            throw new Error("Account is not set");
        if (!chainInfo)
            throw new Error(`Chain info for ${chain} wasn't set during handshake`);
        if (session) {
            this.client = {
                type: "session",
                instance: (0, index_js_1.createZksyncSessionClient)({
                    address: this.account.address,
                    sessionKey: session.sessionKey,
                    sessionConfig: (0, utils_js_1.parseSessionConfigJSON)(session.sessionConfig),
                    contracts: chainInfo.contracts,
                    chain,
                    transport: this.transports[chain.id] || (0, viem_1.http)(),
                    paymasterHandler: this.paymasterHandler,
                    onSessionStateChange: (event) => {
                        if (!this.onSessionStateChange)
                            return;
                        this.onSessionStateChange({
                            state: event,
                            address: this.account.address,
                            chainId: chain.id,
                        });
                    },
                    skipPreTransactionStateValidation: this.skipPreTransactionStateValidation,
                }),
            };
        }
        else {
            this.client = {
                type: "auth-server",
                instance: (0, viem_1.createWalletClient)({
                    key: "zksync-sso-auth-server-wallet",
                    account: this.account.address,
                    chain,
                    transport: (0, viem_1.custom)({
                        request: this.request.bind(this),
                    }),
                }),
            };
        }
    }
    async handshake() {
        let sessionPreferences;
        let metadata = {
            name: "Unknown DApp",
            icon: null,
            configData: {},
        };
        try {
            metadata = this.getMetadata();
        }
        catch (error) {
            console.error("Failed to get website metadata. Proceeding with default one.", error);
        }
        if (this.sessionParameters) {
            try {
                sessionPreferences = await this.sessionParameters();
            }
            catch (error) {
                console.error("Failed to get session data. Proceeding connection with no session.", error);
            }
        }
        const responseMessage = await this.sendRpcRequest({
            method: "eth_requestAccounts",
            params: {
                metadata,
                sessionPreferences,
            },
        });
        const handshakeData = responseMessage.content.result;
        this._chainsInfo.set(handshakeData.chainsInfo);
        this._account.set({
            address: handshakeData.account.address,
            activeChainId: handshakeData.account.activeChainId || this.chain.id,
            session: handshakeData.account.session,
        });
        return this.accounts;
    }
    switchChain(chainId) {
        const chain = this.chains.find((chain) => chain.id === chainId);
        const chainInfo = this.chainsInfo.find((e) => e.id === chainId);
        if (!chainInfo) {
            console.error(`Chain ${chainId} is not supported or chain info was not set during handshake`);
            return false;
        }
        ;
        if (!chain) {
            console.error(`Chain ${chainId} is missing in the configuration`);
            return false;
        }
        ;
        if (chain.id === this.chain.id)
            return true;
        this._account.set({
            ...this.account,
            activeChainId: chain.id,
        });
        return true;
    }
    async request(request) {
        const localResult = await this.tryLocalHandling(request);
        if (localResult !== undefined)
            return localResult;
        const response = await this.sendRpcRequest(request);
        return response.content.result;
    }
    async disconnect() {
        this.clearState();
    }
    async tryLocalHandling(request) {
        const client = this.walletClient;
        const originalClient = this.client;
        switch (request.method) {
            case "eth_estimateGas": {
                if (!client)
                    return undefined;
                const params = request.params;
                const res = await client.request({ method: request.method, params: params });
                return res;
            }
            case "eth_sendTransaction": {
                if (originalClient?.type !== "session")
                    return undefined;
                const params = request.params;
                const transactionRequest = params[0];
                const res = await originalClient.instance.sendTransaction(transactionRequest);
                return res;
            }
            case "wallet_switchEthereumChain": {
                throw new Error("Chain switching is not supported yet");
            }
            case "wallet_getCapabilities": {
                const chainInfo = this.chainsInfo.find((e) => e.id === this.chain.id);
                if (!chainInfo)
                    throw new Error("Chain info is not set");
                return { [this.chain.id]: chainInfo.capabilities };
            }
            case "eth_accounts": {
                return this.accounts;
            }
            default:
                return undefined;
        }
    }
    async sendRpcRequest(request) {
        await this.communicator.ready();
        if (request.method === "eth_sendTransaction") {
            const params = request.params[0];
            if (params) {
                const { chainId: _, ...transaction } = await (0, index_js_2.getTransactionWithPaymasterData)(this.chain.id, params.from, params, this.paymasterHandler);
                request = {
                    method: request.method,
                    params: [transaction],
                };
            }
        }
        const message = this.createRequestMessage({
            action: request,
            chainId: this.chain.id,
        });
        const response = await this.communicator.postRequestAndWaitForResponse(message);
        const content = response.content;
        if ("error" in content)
            throw content.error;
        return response;
    }
    createRequestMessage(content) {
        return {
            id: crypto.randomUUID(),
            content,
        };
    }
}
exports.Signer = Signer;
//# sourceMappingURL=Signer.js.map