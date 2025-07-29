"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOidcTransaction = void 0;
exports.createZkSyncOidcClient = createZkSyncOidcClient;
const viem_1 = require("viem");
const wallet_js_1 = require("../recovery/decorators/wallet.js");
const account_js_1 = require("./account.js");
const index_js_1 = require("./actions/index.js");
const signOidcTransaction = (recoveryValidatorAddress) => {
    return (0, viem_1.encodeAbiParameters)([
        { type: "bytes", name: "signature" },
        { type: "address", name: "recoveryContract" },
        { type: "bytes[]", name: "validatorData" },
    ], [
        "0x",
        recoveryValidatorAddress,
        ["0x"],
    ]);
};
exports.signOidcTransaction = signOidcTransaction;
function createZkSyncOidcClient(givenParams) {
    const parameters = {
        ...givenParams,
        address: (0, viem_1.getAddress)(givenParams.address),
        key: givenParams.key || "zksync-sso-oidc-wallet",
        name: givenParams.name || "ZKsync SSO OIDC Client",
    };
    const account = (0, account_js_1.toOidcAccount)({
        address: parameters.address,
        signTransaction: async () => {
            return (0, exports.signOidcTransaction)(parameters.contracts.recoveryOidc);
        },
    });
    return (0, viem_1.createClient)({
        ...parameters,
        account,
        type: "walletClient",
    })
        .extend(() => ({
        contracts: parameters.contracts,
    }))
        .extend(viem_1.publicActions)
        .extend(wallet_js_1.zksyncSsoWalletActions)
        .extend(index_js_1.zksyncSsoOidcActions);
}
//# sourceMappingURL=client.js.map