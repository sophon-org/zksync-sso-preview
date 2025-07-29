"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewPasskeyViaOidc = addNewPasskeyViaOidc;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const index_js_1 = require("../../../abi/index.js");
async function addNewPasskeyViaOidc(client, args) {
    const callData = (0, viem_1.encodeFunctionData)({
        abi: index_js_1.WebAuthValidatorAbi,
        functionName: "addValidationKey",
        args: [args.credentialId, args.passkeyPubKey, args.passkeyDomain],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.passkey,
        data: callData,
        gas: 10000000n,
        type: "eip712",
    };
    const transactionHash = await (0, zksync_1.sendTransaction)(client, sendTransactionArgs);
    const transactionReceipt = await (0, actions_1.waitForTransactionReceipt)(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success") {
        throw new Error("Add passkey via oidc reverted");
    }
    return transactionReceipt;
}
//# sourceMappingURL=addNewPasskeyViaOidc.js.map