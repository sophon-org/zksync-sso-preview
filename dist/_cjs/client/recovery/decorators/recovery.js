"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksyncSsoRecoveryActions = zksyncSsoRecoveryActions;
const index_js_1 = require("../../passkey/index.js");
function zksyncSsoRecoveryActions(client) {
    return {
        addAccountOwnerPasskey: async (args) => {
            return await (0, index_js_1.addAccountOwnerPasskey)(client, {
                ...args,
                contracts: client.contracts,
            });
        },
    };
}
//# sourceMappingURL=recovery.js.map