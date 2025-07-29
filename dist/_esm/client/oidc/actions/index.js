import { addNewPasskeyViaOidc } from "./addNewPasskeyViaOidc.js";
export function zksyncSsoOidcActions(client) {
    return {
        addNewPasskeyViaOidc: async (args) => {
            return addNewPasskeyViaOidc(client, { ...args, contracts: client.contracts });
        },
    };
}
//# sourceMappingURL=index.js.map