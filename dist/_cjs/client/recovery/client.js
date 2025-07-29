"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRecoveryTransaction = void 0;
exports.createZksyncRecoveryGuardianClient = createZksyncRecoveryGuardianClient;
const viem_1 = require("viem");
const account_js_1 = require("./account.js");
const publicActionsRewrite_js_1 = require("./decorators/publicActionsRewrite.js");
const recovery_js_1 = require("./decorators/recovery.js");
const wallet_js_1 = require("./decorators/wallet.js");
const signRecoveryTransaction = (recoveryValidatorAddress) => {
    return (0, viem_1.encodeAbiParameters)([
        { type: "bytes", name: "unusedSignedHash" },
        { type: "address", name: "recoveryContract" },
        { type: "bytes", name: "validatorData" },
    ], [
        "0x",
        recoveryValidatorAddress,
        "0x",
    ]);
};
exports.signRecoveryTransaction = signRecoveryTransaction;
function createZksyncRecoveryGuardianClient(_parameters) {
    const parameters = {
        ..._parameters,
        address: (0, viem_1.getAddress)(_parameters.address),
        key: _parameters.key || "zksync-sso-recovery-wallet",
        name: _parameters.name || "ZKsync SSO Recovery Client",
    };
    const account = (0, account_js_1.toRecoveryAccount)({
        address: parameters.address,
        signTransaction: async ({ hash: _ }) => {
            return (0, exports.signRecoveryTransaction)(parameters.contracts.recovery);
        },
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
        .extend(publicActionsRewrite_js_1.publicActionsRewrite)
        .extend(wallet_js_1.zksyncSsoWalletActions)
        .extend(recovery_js_1.zksyncSsoRecoveryActions);
    return client;
}
//# sourceMappingURL=client.js.map