import { hashTypedData, } from "viem";
import { toAccount } from "viem/accounts";
import { serializeTransaction } from "viem/zksync";
import { getEip712Domain } from "../utils/getEip712Domain.js";
export function toOidcAccount(parameters) {
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
        async signMessage() {
            throw new Error("Oidc account cannot sign messages");
        },
        async signTypedData(typedData) {
            const digest = hashTypedData(typedData);
            return signTransaction({
                hash: digest,
            });
        },
    });
    return {
        ...account,
        source: "ssoOidcAccount",
        type: "local",
    };
}
//# sourceMappingURL=account.js.map