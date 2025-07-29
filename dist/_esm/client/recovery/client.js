import { createClient, encodeAbiParameters, getAddress, publicActions } from "viem";
import { toRecoveryAccount } from "./account.js";
import { publicActionsRewrite } from "./decorators/publicActionsRewrite.js";
import { zksyncSsoRecoveryActions } from "./decorators/recovery.js";
import { zksyncSsoWalletActions } from "./decorators/wallet.js";
export const signRecoveryTransaction = (recoveryValidatorAddress) => {
    return encodeAbiParameters([
        { type: "bytes", name: "unusedSignedHash" },
        { type: "address", name: "recoveryContract" },
        { type: "bytes", name: "validatorData" },
    ], [
        "0x",
        recoveryValidatorAddress,
        "0x",
    ]);
};
export function createZksyncRecoveryGuardianClient(_parameters) {
    const parameters = {
        ..._parameters,
        address: getAddress(_parameters.address),
        key: _parameters.key || "zksync-sso-recovery-wallet",
        name: _parameters.name || "ZKsync SSO Recovery Client",
    };
    const account = toRecoveryAccount({
        address: parameters.address,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        signTransaction: async ({ hash: _ }) => {
            return signRecoveryTransaction(parameters.contracts.recovery);
        },
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
        .extend(publicActionsRewrite)
        .extend(zksyncSsoWalletActions)
        .extend(zksyncSsoRecoveryActions);
    return client;
}
//# sourceMappingURL=client.js.map