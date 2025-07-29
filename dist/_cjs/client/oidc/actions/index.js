"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksyncSsoOidcActions = zksyncSsoOidcActions;
const addNewPasskeyViaOidc_js_1 = require("./addNewPasskeyViaOidc.js");
function zksyncSsoOidcActions(client) {
    return {
        addNewPasskeyViaOidc: async (args) => {
            return (0, addNewPasskeyViaOidc_js_1.addNewPasskeyViaOidc)(client, { ...args, contracts: client.contracts });
        },
    };
}
//# sourceMappingURL=index.js.map