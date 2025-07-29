"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGeneralPaymaster = createGeneralPaymaster;
const zksync_1 = require("viem/zksync");
function createGeneralPaymaster(paymaster) {
    return async (_) => {
        return {
            paymaster,
            paymasterInput: (0, zksync_1.getGeneralPaymasterInput)({ innerInput: "0x" }),
        };
    };
}
//# sourceMappingURL=general.js.map