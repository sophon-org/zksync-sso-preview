import { hashMessage, hashTypedData } from "viem";
import { toAccount } from "viem/accounts";
import { serializeTransaction } from "viem/zksync";
import { getEip712Domain } from "../utils/getEip712Domain.js";
export function toRecoveryAccount(parameters) {
    const { address, signTransaction } = parameters;
    const account = toAccount({
        address,
        async signTransaction(transaction) {
            const signableTransaction = {
                ...transaction,
                from: this.address,
                type: "eip712",
            };
            const eip712DomainAndMessage = getEip712Domain(signableTransaction);
            const digest = hashTypedData(eip712DomainAndMessage);
            return serializeTransaction({
                ...signableTransaction,
                customSignature: await signTransaction({
                    hash: digest,
                }),
            });
        },
        async sign({ hash }) {
            return signTransaction({ hash });
        },
        async signMessage({ message }) {
            return signTransaction({
                hash: hashMessage(message),
            });
        },
        async signTypedData(typedData) {
            return signTransaction({
                hash: hashTypedData(typedData),
            });
        },
    });
    return {
        ...account,
        source: "ssoRecoveryAccount",
    };
}
//# sourceMappingURL=account.js.map