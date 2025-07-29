"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEcdsaAccount = toEcdsaAccount;
const accounts_1 = require("viem/accounts");
const zksync_1 = require("viem/zksync");
const getEip712Domain_js_1 = require("../utils/getEip712Domain.js");
const types_js_1 = require("./types.js");
async function toEcdsaAccount(parameters) {
    const { address, owner } = parameters;
    const localOwner = await (0, types_js_1.toOwner)({ owner, address });
    const account = (0, accounts_1.toAccount)({
        address,
        async signMessage({ message }) {
            return localOwner.signMessage({ message });
        },
        async signTransaction(transaction) {
            const signableTransaction = {
                ...transaction,
                from: this.address,
                type: "eip712",
            };
            const eip712DomainAndMessage = (0, getEip712Domain_js_1.getEip712Domain)(signableTransaction);
            const signature = await localOwner.signTypedData(eip712DomainAndMessage);
            return (0, zksync_1.serializeTransaction)({
                ...signableTransaction,
                customSignature: signature,
            });
        },
        async signTypedData(typedData) {
            return localOwner.signTypedData(typedData);
        },
    });
    return {
        ...account,
        source: "ssoEcdsaAccount",
    };
}
//# sourceMappingURL=account.js.map