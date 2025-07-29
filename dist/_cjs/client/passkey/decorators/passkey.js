"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksyncSsoPasskeyActions = zksyncSsoPasskeyActions;
const oidc_js_1 = require("../../recovery/actions/oidc.js");
const recovery_js_1 = require("../../recovery/actions/recovery.js");
const session_js_1 = require("../../session/actions/session.js");
function zksyncSsoPasskeyActions(client) {
    return {
        createSession: async (args) => {
            return await (0, session_js_1.createSession)(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        revokeSession: async (args) => {
            return await (0, session_js_1.revokeSession)(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        proposeGuardian: async (args) => {
            return await (0, recovery_js_1.proposeGuardian)(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        confirmGuardian: async (args) => {
            return await (0, recovery_js_1.confirmGuardian)(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        removeGuardian: async (args) => {
            return await (0, recovery_js_1.removeGuardian)(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        addOidcAccount: async (args) => {
            return await (0, oidc_js_1.addOidcAccount)(client, {
                ...args,
                contracts: client.contracts,
            });
        },
        removeOidcAccount: async () => {
            return await (0, oidc_js_1.removeOidcAccount)(client, {
                contracts: client.contracts,
            });
        },
    };
}
//# sourceMappingURL=passkey.js.map