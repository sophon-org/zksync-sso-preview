import { createClient, encodeAbiParameters, getAddress, publicActions, } from "viem";
import { zksyncSsoWalletActions } from "../recovery/decorators/wallet.js";
import { toOidcAccount } from "./account.js";
import { zksyncSsoOidcActions } from "./actions/index.js";
export const signOidcTransaction = (recoveryValidatorAddress) => {
    return encodeAbiParameters([
        { type: "bytes", name: "signature" },
        { type: "address", name: "recoveryContract" },
        { type: "bytes[]", name: "validatorData" },
    ], [
        "0x",
        recoveryValidatorAddress,
        ["0x"],
    ]);
};
export function createZkSyncOidcClient(givenParams) {
    const parameters = {
        ...givenParams,
        address: getAddress(givenParams.address),
        key: givenParams.key || "zksync-sso-oidc-wallet",
        name: givenParams.name || "ZKsync SSO OIDC Client",
    };
    const account = toOidcAccount({
        address: parameters.address,
        signTransaction: async () => {
            return signOidcTransaction(parameters.contracts.recoveryOidc);
        },
    });
    return createClient({
        ...parameters,
        account,
        type: "walletClient",
    })
        .extend(() => ({
        contracts: parameters.contracts,
    }))
        .extend(publicActions)
        .extend(zksyncSsoWalletActions)
        .extend(zksyncSsoOidcActions);
}
//# sourceMappingURL=client.js.map