"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEip712Transaction = sendEip712Transaction;
exports.getAction = getAction;
exports.assertEip712Request = assertEip712Request;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const actions_1 = require("viem/actions");
const assertEip712Transaction_js_1 = require("../../utils/assertEip712Transaction.js");
const isEip712Transaction_js_1 = require("../../utils/isEip712Transaction.js");
async function sendEip712Transaction(client, parameters) {
    const { account: account_ = client.account, chain = client.chain, ...rest } = parameters;
    if (!account_)
        throw new Error("Account not found.");
    const account = (0, accounts_1.parseAccount)(account_);
    assertEip712Request(parameters);
    const request = await getAction(client, actions_1.prepareTransactionRequest, "prepareTransactionRequest")({
        account,
        chain,
        nonceManager: account.nonceManager,
        ...rest,
    });
    const serializer = chain?.serializers?.transaction;
    const serializedTransaction = (await account.signTransaction(request, {
        serializer,
    }));
    return await getAction(client, actions_1.sendRawTransaction, "sendRawTransaction")({
        serializedTransaction,
    });
}
function getAction(client, actionFn, name) {
    const action_implicit = client[actionFn.name];
    if (typeof action_implicit === "function")
        return action_implicit;
    const action_explicit = client[name];
    if (typeof action_explicit === "function")
        return action_explicit;
    return (params) => actionFn(client, params);
}
function assertEip712Request(args) {
    if (!(0, isEip712Transaction_js_1.isEIP712Transaction)(args))
        throw new assertEip712Transaction_js_1.InvalidEip712TransactionError();
    (0, viem_1.assertRequest)(args);
}
//# sourceMappingURL=sendEip712Transaction.js.map