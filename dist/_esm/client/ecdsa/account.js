import { toAccount } from "viem/accounts";
import { serializeTransaction } from "viem/zksync";
import { getEip712Domain } from "../utils/getEip712Domain.js";
import { toOwner } from "./types.js";
export async function toEcdsaAccount(parameters) {
    const { address, owner } = parameters;
    const localOwner = await toOwner({ owner, address });
    const account = toAccount({
        address,
        async signMessage({ message }) {
            return localOwner.signMessage({ message });
        },
        async signTransaction(transaction) {
            const signableTransaction = {
                ...transaction,
                from: this.address,
                type: "eip712",
            };
            const eip712DomainAndMessage = getEip712Domain(signableTransaction);
            const signature = await localOwner.signTypedData(eip712DomainAndMessage);
            return serializeTransaction({
                ...signableTransaction,
                customSignature: signature,
            });
        },
        async signTypedData(typedData) {
            return localOwner.signTypedData(typedData);
        },
    });
    return {
        ...account,
        source: "ssoEcdsaAccount",
    };
}
//# sourceMappingURL=account.js.map