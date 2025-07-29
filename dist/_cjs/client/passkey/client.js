"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZksyncPasskeyClient = createZksyncPasskeyClient;
const viem_1 = require("viem");
const zksync_1 = require("viem/zksync");
const passkey_js_1 = require("../../utils/passkey.js");
const account_js_1 = require("./account.js");
const passkey_js_2 = require("./actions/passkey.js");
const passkey_js_3 = require("./decorators/passkey.js");
const wallet_js_1 = require("./decorators/wallet.js");
function createZksyncPasskeyClient(_parameters) {
    const parameters = {
        ..._parameters,
        address: (0, viem_1.getAddress)(_parameters.address),
        key: _parameters.key || "zksync-sso-passkey-wallet",
        name: _parameters.name || "ZKsync SSO Passkey Client",
    };
    const account = (0, account_js_1.toPasskeyAccount)({
        address: parameters.address,
        chain: parameters.chain,
        contracts: parameters.contracts,
        transport: parameters.transport,
        sign: async ({ hash }) => {
            const passkeySignature = await (0, passkey_js_2.requestPasskeyAuthentication)({
                challenge: hash,
                credentialPublicKey: parameters.credentialPublicKey,
            });
            return (0, passkey_js_1.passkeyHashSignatureResponseFormat)(passkeySignature.passkeyAuthenticationResponse.id, passkeySignature.passkeyAuthenticationResponse.response, parameters.contracts);
        },
    });
    const client = (0, viem_1.createClient)({
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
        .extend(viem_1.publicActions)
        .extend(viem_1.walletActions)
        .extend((0, zksync_1.eip712WalletActions)())
        .extend(passkey_js_3.zksyncSsoPasskeyActions)
        .extend(wallet_js_1.zksyncSsoPasskeyWalletActions);
    return client;
}
//# sourceMappingURL=client.js.map