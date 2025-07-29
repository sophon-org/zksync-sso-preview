"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOwner = toOwner;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const zksync_1 = require("viem/zksync");
const getEip712Domain_js_1 = require("../utils/getEip712Domain.js");
async function toOwner({ owner, address, }) {
    if ("type" in owner && owner.type === "local") {
        return owner;
    }
    let walletClient = undefined;
    if ("request" in owner) {
        if (!address) {
            try {
                [address] = await owner.request({
                    method: "eth_requestAccounts",
                });
            }
            catch {
                [address] = await owner.request({
                    method: "eth_accounts",
                });
            }
        }
        if (!address) {
            throw new Error("address is required");
        }
        walletClient = (0, viem_1.createWalletClient)({
            account: address,
            transport: (0, viem_1.custom)(owner),
        });
    }
    if (!walletClient) {
        walletClient = owner;
    }
    return (0, accounts_1.toAccount)({
        address: walletClient.account.address,
        async signMessage({ message }) {
            return walletClient.signMessage({ message });
        },
        async signTransaction(transaction) {
            const signableTransaction = {
                ...transaction,
                from: this.address,
                type: "eip712",
            };
            const eip712DomainAndMessage = (0, getEip712Domain_js_1.getEip712Domain)(signableTransaction);
            const digest = (0, viem_1.hashTypedData)(eip712DomainAndMessage);
            const signedMessage = await walletClient.signMessage({ message: digest });
            return (0, zksync_1.serializeTransaction)({
                ...signableTransaction,
                customSignature: signedMessage,
            });
        },
        async signTypedData(typedData) {
            return (0, utils_1.getAction)(walletClient, actions_1.signTypedData, "signTypedData")(typedData);
        },
    });
}
//# sourceMappingURL=types.js.map