import {} from "viem";
import { estimateContractGas, estimateGas, prepareTransactionRequest } from "viem/actions";
import { signRecoveryTransaction } from "../client.js";
export function publicActionsRewrite(client) {
    return {
        prepareTransactionRequest: async (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = signRecoveryTransaction(client.contracts.recovery);
            }
            const request = await prepareTransactionRequest(client, {
                ...args,
                type: "eip712",
            });
            return request;
        },
        estimateContractGas: (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = signRecoveryTransaction(client.contracts.recovery);
            }
            return estimateContractGas(client, args);
        },
        estimateGas: async (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = signRecoveryTransaction(client.contracts.recovery);
            }
            const estimated = await estimateGas(client, args);
            return estimated;
        },
    };
}
//# sourceMappingURL=publicActionsRewrite.js.map