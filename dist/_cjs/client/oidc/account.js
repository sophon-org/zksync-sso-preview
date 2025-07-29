"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOidcAccount = toOidcAccount;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const zksync_1 = require("viem/zksync");
const getEip712Domain_js_1 = require("../utils/getEip712Domain.js");
function toOidcAccount(parameters) {
    const { address, signTransaction } = parameters;
    const account = (0, accounts_1.toAccount)({
        address,
        async signTransaction(transaction) {
            const signableTransaction = {
                ...transaction,
                from: this.address,
                type: "eip712",
            };
            const eip712DomainAndMessage = (0, getEip712Domain_js_1.getEip712Domain)(signableTransaction);
            const digest = (0, viem_1.hashTypedData)(eip712DomainAndMessage);
            return (0, zksync_1.serializeTransaction)({
                ...signableTransaction,
                customSignature: await signTransaction({
                    hash: digest,
                }),
            });
        },
        async signMessage() {
            throw new Error("Oidc account cannot sign messages");
        },
        async signTypedData(typedData) {
            const digest = (0, viem_1.hashTypedData)(typedData);
            return signTransaction({
                hash: digest,
            });
        },
    });
    return {
        ...account,
        source: "ssoOidcAccount",
        type: "local",
    };
}
//# sourceMappingURL=account.js.map