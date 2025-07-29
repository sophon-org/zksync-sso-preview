import { createWalletClient, custom, hashTypedData } from "viem";
import { toAccount } from "viem/accounts";
import { signTypedData } from "viem/actions";
import { getAction } from "viem/utils";
import { serializeTransaction } from "viem/zksync";
import { getEip712Domain } from "../utils/getEip712Domain.js";
export async function toOwner({ owner, address, }) {
    if ("type" in owner && owner.type === "local") {
        return owner;
    }
    let walletClient = undefined;
    if ("request" in owner) {
        if (!address) {
            try {
                [address] = await owner.request({
                    method: "eth_requestAccounts",
                });
            }
            catch {
                [address] = await owner.request({
                    method: "eth_accounts",
                });
            }
        }
        if (!address) {
            // For TS to be happy
            throw new Error("address is required");
        }
        walletClient = createWalletClient({
            account: address,
            transport: custom(owner),
        });
    }
    if (!walletClient) {
        walletClient = owner;
    }
    return toAccount({
        address: walletClient.account.address,
        async signMessage({ message }) {
            return walletClient.signMessage({ message });
        },
        async signTransaction(transaction) {
            const signableTransaction = {
                ...transaction,
                from: this.address,
                type: "eip712",
            };
            const eip712DomainAndMessage = getEip712Domain(signableTransaction);
            const digest = hashTypedData(eip712DomainAndMessage);
            const signedMessage = await walletClient.signMessage({ message: digest });
            return serializeTransaction({
                ...signableTransaction,
                customSignature: signedMessage,
            });
        },
        async signTypedData(typedData) {
            return getAction(walletClient, signTypedData, "signTypedData")(typedData);
        },
    });
}
//# sourceMappingURL=types.js.map