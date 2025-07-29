import { EventEmitter } from "eventemitter3";
import { toHex } from "viem";
import { PopupCommunicator } from "../communicator/PopupCommunicator.js";
import { serializeError, standardErrors } from "../errors/index.js";
import { getFavicon, getWebsiteName } from "../utils/helpers.js";
import {} from "./rpc.js";
import { Signer } from "./Signer.js";
const DEFAULT_AUTH_SERVER_URL = "https://auth-test.zksync.dev/confirm";
export class WalletProvider extends EventEmitter {
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
        const communicator = customCommunicator ?? new PopupCommunicator(authServerUrl || DEFAULT_AUTH_SERVER_URL);
        this.signer = new Signer({
            metadata: () => ({
                name: metadata?.name || getWebsiteName() || "Unknown DApp",
                icon: metadata?.icon || getFavicon(),
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
                        throw standardErrors.provider.unauthorized("Must call 'eth_requestAccounts' before other methods");
                    }
                    return await this.signer.request(request);
                }
                case "eth_chainId":
                case "net_version": {
                    return toHex(this.chain.id);
                }
            }
            throw standardErrors.rpc.methodNotSupported(`Method ${request.method} is not supported.`);
        }
        catch (error) {
            return Promise.reject(serializeError(error, request.method));
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
        this.emit("disconnect", standardErrors.provider.disconnected("User initiated disconnection"));
    }
}
//# sourceMappingURL=WalletProvider.js.map