"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProvider = void 0;
const eventemitter3_1 = require("eventemitter3");
const viem_1 = require("viem");
const PopupCommunicator_js_1 = require("../communicator/PopupCommunicator.js");
const index_js_1 = require("../errors/index.js");
const helpers_js_1 = require("../utils/helpers.js");
const Signer_js_1 = require("./Signer.js");
const DEFAULT_AUTH_SERVER_URL = "https://auth-test.zksync.dev/confirm";
class WalletProvider extends eventemitter3_1.EventEmitter {
    constructor({ metadata, chains, transports, session, authServerUrl, paymasterHandler, onSessionStateChange, skipPreTransactionStateValidation, customCommunicator, storage }) {
        super();
        Object.defineProperty(this, "isZksyncSso", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "signer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "updateListener", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                onAccountsUpdate: (accounts) => {
                    this.emit("accountsChanged", accounts);
                },
                onChainUpdate: (chainId) => {
                    this.emit("chainChanged", chainId);
                },
            }
        });
        const communicator = customCommunicator ?? new PopupCommunicator_js_1.PopupCommunicator(authServerUrl || DEFAULT_AUTH_SERVER_URL);
        this.signer = new Signer_js_1.Signer({
            metadata: () => ({
                name: metadata?.name || (0, helpers_js_1.getWebsiteName)() || "Unknown DApp",
                icon: metadata?.icon || (0, helpers_js_1.getFavicon)(),
                configData: metadata?.configData || {},
            }),
            updateListener: this.updateListener,
            communicator: communicator,
            chains,
            transports,
            session: typeof session === "object" ? () => session : session,
            paymasterHandler,
            onSessionStateChange,
            skipPreTransactionStateValidation,
            storage,
        });
    }
    get chain() {
        return this.signer.chain;
    }
    get connected() {
        return this.signer.accounts.length > 0;
    }
    getClient(parameters) {
        return this.signer.getClient(parameters);
    }
    async request(request) {
        try {
            switch (request.method) {
                case "eth_requestAccounts": {
                    return await this.handshake();
                }
                case "personal_sign":
                case "eth_accounts":
                case "eth_estimateGas":
                case "eth_signTransaction":
                case "eth_sendTransaction":
                case "eth_signTypedData_v4":
                case "wallet_addEthereumChain":
                case "wallet_switchEthereumChain":
                case "wallet_watchAsset":
                case "wallet_getCapabilities":
                case "wallet_sendCalls":
                case "wallet_showCallsStatus": {
                    if (!this.connected) {
                        throw index_js_1.standardErrors.provider.unauthorized("Must call 'eth_requestAccounts' before other methods");
                    }
                    return await this.signer.request(request);
                }
                case "eth_chainId":
                case "net_version": {
                    return (0, viem_1.toHex)(this.chain.id);
                }
            }
            throw index_js_1.standardErrors.rpc.methodNotSupported(`Method ${request.method} is not supported.`);
        }
        catch (error) {
            return Promise.reject((0, index_js_1.serializeError)(error, request.method));
        }
    }
    async handshake() {
        if (this.connected) {
            this.emit("connect", { chainId: this.chain.id });
            return this.signer.accounts;
        }
        const accounts = await this.signer.handshake();
        this.emit("connect", { chainId: this.chain.id });
        return accounts;
    }
    async disconnect() {
        this.signer.disconnect();
        this.emit("disconnect", index_js_1.standardErrors.provider.disconnected("User initiated disconnection"));
    }
}
exports.WalletProvider = WalletProvider;
//# sourceMappingURL=WalletProvider.js.map