import {} from "viem";
import { addOidcAccount, removeOidcAccount, } from "../../recovery/actions/oidc.js";
import { confirmGuardian, proposeGuardian, removeGuardian, } from "../../recovery/actions/recovery.js";
import { createSession, revokeSession, } from "../../session/actions/session.js";
export function zksyncSsoPasskeyActions(client) {
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
        proposeGuardian: async (args) => {
            return await proposeGuardian(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        confirmGuardian: async (args) => {
            return await confirmGuardian(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        removeGuardian: async (args) => {
            return await removeGuardian(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        addOidcAccount: async (args) => {
            return await addOidcAccount(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        removeOidcAccount: async () => {
            return await removeOidcAccount(client, {
                contracts: client.contracts,
            });
        },
    };
}
//# sourceMappingURL=passkey.js.map