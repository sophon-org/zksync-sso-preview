import { createClient, getAddress, publicActions, walletActions } from "viem";
import { eip712WalletActions } from "viem/zksync";
import { passkeyHashSignatureResponseFormat } from "../../utils/passkey.js";
import { toPasskeyAccount } from "./account.js";
import { requestPasskeyAuthentication } from "./actions/passkey.js";
import { zksyncSsoPasskeyActions } from "./decorators/passkey.js";
import { zksyncSsoPasskeyWalletActions } from "./decorators/wallet.js";
export function createZksyncPasskeyClient(_parameters) {
    const parameters = {
        ..._parameters,
        address: getAddress(_parameters.address),
        key: _parameters.key || "zksync-sso-passkey-wallet",
        name: _parameters.name || "ZKsync SSO Passkey Client",
    };
    const account = toPasskeyAccount({
        address: parameters.address,
        chain: parameters.chain,
        contracts: parameters.contracts,
        transport: parameters.transport,
        sign: async ({ hash }) => {
            const passkeySignature = await requestPasskeyAuthentication({
                challenge: hash,
                credentialPublicKey: parameters.credentialPublicKey,
            });
            return passkeyHashSignatureResponseFormat(passkeySignature.passkeyAuthenticationResponse.id, passkeySignature.passkeyAuthenticationResponse.response, parameters.contracts);
        },
    });
    const client = createClient({
        ...parameters,
        account,
        type: "walletClient",
    })
        .extend(() => ({
        credentialPublicKey: parameters.credentialPublicKey,
        userName: parameters.userName,
        userDisplayName: parameters.userDisplayName,
        contracts: parameters.contracts,
    }))
        .extend(publicActions)
        .extend(walletActions)
        .extend(eip712WalletActions())
        .extend(zksyncSsoPasskeyActions)
        .extend(zksyncSsoPasskeyWalletActions);
    return client;
}
//# sourceMappingURL=client.js.map