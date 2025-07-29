import { hashMessage, hashTypedData } from "viem";
import { toAccount } from "viem/accounts";
import { serializeTransaction } from "viem/zksync";
import { getEip712Domain } from "../utils/getEip712Domain.js";
export function toPasskeyAccount(parameters) {
    const { address, sign } = parameters;
    const account = toAccount({
        address,
        sign,
        async signMessage({ message }) {
            return sign({
                hash: hashMessage(message),
            });
        },
        async signTypedData(typedData) {
            return sign({
                hash: hashTypedData(typedData),
            });
        },
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
                customSignature: await sign({
                    hash: digest,
                }),
            });
        },
    });
    return {
        ...account,
        source: "ssoPasskeyAccount",
    };
}
//# sourceMappingURL=account.js.map