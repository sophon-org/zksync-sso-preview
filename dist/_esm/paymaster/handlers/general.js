import { getGeneralPaymasterInput } from "viem/zksync";
export function createGeneralPaymaster(paymaster) {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    return async (_) => {
        return {
            paymaster,
            paymasterInput: getGeneralPaymasterInput({ innerInput: "0x" }),
        };
    };
}
//# sourceMappingURL=general.js.map