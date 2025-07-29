import { encodeFunctionData, } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { sendTransaction } from "viem/zksync";
import { WebAuthValidatorAbi } from "../../../abi/index.js";
export async function addNewPasskeyViaOidc(client, args) {
    const callData = encodeFunctionData({
        abi: WebAuthValidatorAbi,
        functionName: "addValidationKey",
        args: [args.credentialId, args.passkeyPubKey, args.passkeyDomain],
    });
    const sendTransactionArgs = {
        account: client.account,
        to: args.contracts.passkey,
        data: callData,
        gas: 10000000n, // TODO: Remove when gas estimation is fixed
        type: "eip712",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
    const transactionHash = await sendTransaction(client, sendTransactionArgs);
    const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success") {
        throw new Error("Add passkey via oidc reverted");
    }
    return transactionReceipt;
}
//# sourceMappingURL=addNewPasskeyViaOidc.js.map