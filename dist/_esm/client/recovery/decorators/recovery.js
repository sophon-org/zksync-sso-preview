import {} from "viem";
import { addAccountOwnerPasskey } from "../../passkey/index.js";
export function zksyncSsoRecoveryActions(client) {
    return {
        addAccountOwnerPasskey: async (args) => {
            return await addAccountOwnerPasskey(client, {
                ...args,
                contracts: client.contracts,
            });
        },
    };
}
//# sourceMappingURL=recovery.js.map