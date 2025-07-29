"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZksyncEcdsaClient = createZksyncEcdsaClient;
const viem_1 = require("viem");
const zksync_1 = require("viem/zksync");
const account_js_1 = require("./account.js");
const ecdsa_js_1 = require("./decorators/ecdsa.js");
const wallet_js_1 = require("./decorators/wallet.js");
async function createZksyncEcdsaClient(_parameters) {
    const parameters = {
        ..._parameters,
        address: (0, viem_1.getAddress)(_parameters.address),
        key: _parameters.key || "zksync-sso-ecdsa-wallet",
        name: _parameters.name || "ZKsync SSO ECDSA Client",
    };
    const account = await (0, account_js_1.toEcdsaAccount)({
        address: parameters.address,
        owner: parameters.owner,
    });
    const client = (0, viem_1.createClient)({
        ...parameters,
        account,
        type: "walletClient",
    })
        .extend(() => ({
        contracts: parameters.contracts,
    }))
        .extend(viem_1.publicActions)
        .extend(viem_1.walletActions)
        .extend((0, zksync_1.eip712WalletActions)())
        .extend(ecdsa_js_1.zksyncSsoEcdsaActions)
        .extend(wallet_js_1.zksyncSsoEcdsaWalletActions);
    return client;
}
//# sourceMappingURL=client.js.map