"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSessionAccount = toSessionAccount;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const zksync_1 = require("viem/zksync");
const getEip712Domain_js_1 = require("../utils/getEip712Domain.js");
function toSessionAccount(parameters) {
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
                    to: signableTransaction.to,
                    callData: signableTransaction.data,
                }),
            });
        },
        sign: async () => {
            throw new Error(`account.sign not supported for SSO Session Client`);
        },
        signMessage: async () => {
            throw new Error(`account.signMessage not supported for SSO Session Client`);
        },
        signTypedData: async () => {
            throw new Error(`account.signTypedData not supported for SSO Session Client`);
        },
    });
    return {
        ...account,
        source: "ssoSessionAccount",
    };
}
//# sourceMappingURL=account.js.map