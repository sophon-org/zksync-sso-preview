import { createClient, getAddress, publicActions, walletActions } from "viem";
import { eip712WalletActions } from "viem/zksync";
import { toEcdsaAccount } from "./account.js";
import { zksyncSsoEcdsaActions } from "./decorators/ecdsa.js";
import { zksyncSsoEcdsaWalletActions } from "./decorators/wallet.js";
export async function createZksyncEcdsaClient(_parameters) {
    const parameters = {
        ..._parameters,
        address: getAddress(_parameters.address),
        key: _parameters.key || "zksync-sso-ecdsa-wallet",
        name: _parameters.name || "ZKsync SSO ECDSA Client",
    };
    const account = await toEcdsaAccount({
        address: parameters.address,
        owner: parameters.owner,
    });
    const client = createClient({
        ...parameters,
        account,
        type: "walletClient",
    })
        .extend(() => ({
        contracts: parameters.contracts,
    }))
        .extend(publicActions)
        .extend(walletActions)
        .extend(eip712WalletActions())
        .extend(zksyncSsoEcdsaActions)
        .extend(zksyncSsoEcdsaWalletActions);
    return client;
}
//# sourceMappingURL=client.js.map