import { encodeFunctionData, } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { getGeneralPaymasterInput, sendTransaction, } from "viem/zksync";
import { OidcRecoveryValidatorAbi } from "../../../abi/index.js";
import { noThrow } from "../../../utils/helpers.js";
export const addOidcAccount = async (client, args) => {
    const callData = encodeFunctionData({
        abi: OidcRecoveryValidatorAbi,
        functionName: "addOidcAccount",
        args: [args.oidcDigest, args.iss],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recoveryOidc,
        paymaster: args.paymaster?.address,
        paymasterInput: args.paymaster?.address ? (args.paymaster?.paymasterInput || getGeneralPaymasterInput({ innerInput: "0x" })) : undefined,
        data: callData,
        gas: 10000000n, // TODO: Remove when gas estimation is fixed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
    const transactionHash = await sendTransaction(client, sendTransactionArgs);
    if (args.onTransactionSent) {
        noThrow(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("addOidcAccount transaction reverted");
    return {
        transactionReceipt,
    };
};
export const removeOidcAccount = async (client, args) => {
    const callData = encodeFunctionData({
        abi: OidcRecoveryValidatorAbi,
        functionName: "deleteOidcAccount",
        args: [],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.recoveryOidc,
        data: callData,
        gas: 10000000n, // TODO: Remove when gas estimation is fixed
        type: "eip712",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
    const transactionHash = await sendTransaction(client, sendTransactionArgs);
    const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("removeOidcAccount transaction reverted");
    return transactionReceipt;
};
//# sourceMappingURL=oidc.js.map