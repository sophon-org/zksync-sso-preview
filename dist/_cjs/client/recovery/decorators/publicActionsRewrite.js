"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicActionsRewrite = publicActionsRewrite;
const actions_1 = require("viem/actions");
const client_js_1 = require("../client.js");
function publicActionsRewrite(client) {
    return {
        prepareTransactionRequest: async (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = (0, client_js_1.signRecoveryTransaction)(client.contracts.recovery);
            }
            const request = await (0, actions_1.prepareTransactionRequest)(client, {
                ...args,
                type: "eip712",
            });
            return request;
        },
        estimateContractGas: (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = (0, client_js_1.signRecoveryTransaction)(client.contracts.recovery);
            }
            return (0, actions_1.estimateContractGas)(client, args);
        },
        estimateGas: async (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = (0, client_js_1.signRecoveryTransaction)(client.contracts.recovery);
            }
            const estimated = await (0, actions_1.estimateGas)(client, args);
            return estimated;
        },
    };
}
//# sourceMappingURL=publicActionsRewrite.js.map