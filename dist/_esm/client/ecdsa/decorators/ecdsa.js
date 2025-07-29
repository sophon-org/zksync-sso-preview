import {} from "viem";
import { createSession, revokeSession, } from "../../session/actions/session.js";
export const zksyncSsoEcdsaActions = (client) => {
    return {
        createSession: async (args) => {
            return await createSession(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        revokeSession: async (args) => {
            return await revokeSession(client, {
                ...args,
                contracts: client.contracts,
            });
        },
    };
};
//# sourceMappingURL=ecdsa.js.map