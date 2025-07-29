import { bytesToHex, formatTransaction } from "viem";
import { deployContract, getAddresses, getCallsStatus, getCapabilities, getChainId, prepareAuthorization, sendCalls, sendRawTransaction, showCallsStatus, signAuthorization, signMessage, signTypedData, waitForCallsStatus, writeContract } from "viem/actions";
import { signTransaction } from "viem/zksync";
import { sendEip712Transaction } from "../actions/sendEip712Transaction.js";
export function zksyncSsoWalletActions(client) {
    return {
        deployContract: (args) => deployContract(client, args),
        getAddresses: () => getAddresses(client),
        getChainId: () => getChainId(client),
        sendRawTransaction: (args) => sendRawTransaction(client, args),
        sendTransaction: async (args) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const unformattedTx = Object.assign({}, args);
            if ("eip712Meta" in unformattedTx) {
                const eip712Meta = unformattedTx.eip712Meta;
                unformattedTx.gasPerPubdata = eip712Meta.gasPerPubdata ? BigInt(eip712Meta.gasPerPubdata) : undefined;
                unformattedTx.factoryDeps = eip712Meta.factoryDeps;
                unformattedTx.customSignature = eip712Meta.customSignature;
                unformattedTx.paymaster = eip712Meta.paymasterParams?.paymaster;
                unformattedTx.paymasterInput = eip712Meta.paymasterParams?.paymasterInput ? bytesToHex(new Uint8Array(eip712Meta.paymasterParams?.paymasterInput)) : undefined;
                delete unformattedTx.eip712Meta;
            }
            const formatters = client.chain?.formatters;
            const format = formatters?.transaction?.format || formatTransaction;
            const tx = {
                ...format(unformattedTx),
                type: "eip712",
            };
            return await sendEip712Transaction(client, tx);
        },
        signMessage: (args) => signMessage(client, args),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        signTransaction: (args) => signTransaction(client, args),
        signTypedData: (args) => signTypedData(client, args),
        writeContract: (args) => writeContract(client, args),
        signAuthorization: (args) => signAuthorization(client, args),
        getCallsStatus: (args) => getCallsStatus(client, args),
        getCapabilities: (args) => getCapabilities(client, args),
        prepareAuthorization: (args) => prepareAuthorization(client, args),
        sendCalls: (args) => sendCalls(client, args),
        showCallsStatus: (args) => showCallsStatus(client, args),
        waitForCallsStatus: (args) => waitForCallsStatus(client, args),
    };
}
//# sourceMappingURL=wallet.js.map