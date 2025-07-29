"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicActionsRewrite = publicActionsRewrite;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const client_js_1 = require("../client.js");
const emptySignature = "0x" + "1b".padStart(65 * 2, "0");
function publicActionsRewrite(client) {
    return {
        prepareTransactionRequest: async (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = (0, client_js_1.signSessionTransaction)({
                    sessionKeySignedHash: emptySignature,
                    sessionContract: client.contracts.session,
                    sessionConfig: client.sessionConfig,
                    to: args.to,
                    callData: args.data,
                });
            }
            const request = await (0, actions_1.prepareTransactionRequest)(client, {
                ...args,
                type: "eip712",
            });
            return request;
        },
        estimateContractGas: (args) => {
            if (!("customSignature" in args)) {
                const callData = (0, viem_1.encodeFunctionData)({
                    abi: args.abi,
                    functionName: args.functionName,
                    args: args.args || [],
                });
                args.customSignature = (0, client_js_1.signSessionTransaction)({
                    sessionKeySignedHash: emptySignature,
                    sessionContract: client.contracts.session,
                    sessionConfig: client.sessionConfig,
                    to: args.address,
                    callData,
                });
            }
            return (0, actions_1.estimateContractGas)(client, args);
        },
        estimateGas: async (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = (0, client_js_1.signSessionTransaction)({
                    sessionKeySignedHash: emptySignature,
                    sessionContract: client.contracts.session,
                    sessionConfig: client.sessionConfig,
                    to: args.to,
                    callData: args.data,
                });
            }
            const estimated = await (0, actions_1.estimateGas)(client, args);
            return estimated;
        },
    };
}
//# sourceMappingURL=publicActionsRewrite.js.map