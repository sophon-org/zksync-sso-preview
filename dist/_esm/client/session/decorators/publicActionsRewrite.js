import { encodeFunctionData } from "viem";
import { estimateContractGas, estimateGas, prepareTransactionRequest } from "viem/actions";
import { signSessionTransaction } from "../client.js";
const emptySignature = "0x" + "1b".padStart(65 * 2, "0");
export function publicActionsRewrite(client) {
    return {
        prepareTransactionRequest: async (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = signSessionTransaction({
                    sessionKeySignedHash: emptySignature,
                    sessionContract: client.contracts.session,
                    sessionConfig: client.sessionConfig,
                    to: args.to,
                    callData: args.data,
                });
            }
            const request = await prepareTransactionRequest(client, {
                ...args,
                type: "eip712",
            });
            return request;
        },
        estimateContractGas: (args) => {
            if (!("customSignature" in args)) {
                const callData = encodeFunctionData({
                    abi: args.abi,
                    functionName: args.functionName,
                    args: args.args || [],
                });
                args.customSignature = signSessionTransaction({
                    sessionKeySignedHash: emptySignature,
                    sessionContract: client.contracts.session,
                    sessionConfig: client.sessionConfig,
                    to: args.address,
                    callData,
                });
            }
            return estimateContractGas(client, args);
        },
        estimateGas: async (args) => {
            if (!("customSignature" in args)) {
                args.customSignature = signSessionTransaction({
                    sessionKeySignedHash: emptySignature,
                    sessionContract: client.contracts.session,
                    sessionConfig: client.sessionConfig,
                    to: args.to,
                    callData: args.data,
                });
            }
            const estimated = await estimateGas(client, args);
            return estimated;
        },
    };
}
//# sourceMappingURL=publicActionsRewrite.js.map