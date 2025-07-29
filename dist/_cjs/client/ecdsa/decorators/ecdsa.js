"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksyncSsoEcdsaActions = void 0;
const session_js_1 = require("../../session/actions/session.js");
const zksyncSsoEcdsaActions = (client) => {
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
    };
};
exports.zksyncSsoEcdsaActions = zksyncSsoEcdsaActions;
//# sourceMappingURL=ecdsa.js.map