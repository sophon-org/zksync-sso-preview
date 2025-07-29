"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRecoveryAccount = toRecoveryAccount;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const zksync_1 = require("viem/zksync");
const getEip712Domain_js_1 = require("../utils/getEip712Domain.js");
function toRecoveryAccount(parameters) {
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
        async sign({ hash }) {
            return signTransaction({ hash });
        },
        async signMessage({ message }) {
            return signTransaction({
                hash: (0, viem_1.hashMessage)(message),
            });
        },
        async signTypedData(typedData) {
            return signTransaction({
                hash: (0, viem_1.hashTypedData)(typedData),
            });
        },
    });
    return {
        ...account,
        source: "ssoRecoveryAccount",
    };
}
//# sourceMappingURL=account.js.map