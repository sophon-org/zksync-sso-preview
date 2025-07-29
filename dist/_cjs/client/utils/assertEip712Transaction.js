"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEip712TransactionError = void 0;
exports.assertEip712Transaction = assertEip712Transaction;
const viem_1 = require("viem");
const isEip712Transaction_js_1 = require("./isEip712Transaction.js");
function assertEip712Transaction(transaction) {
    const { chainId, to, from, paymaster, paymasterInput } = transaction;
    if (!(0, isEip712Transaction_js_1.isEIP712Transaction)(transaction))
        throw new InvalidEip712TransactionError();
    if (!chainId || chainId <= 0)
        throw new viem_1.InvalidChainIdError({ chainId });
    if (to && !(0, viem_1.isAddress)(to))
        throw new viem_1.InvalidAddressError({ address: to });
    if (from && !(0, viem_1.isAddress)(from))
        throw new viem_1.InvalidAddressError({ address: from });
    if (paymaster && !(0, viem_1.isAddress)(paymaster))
        throw new viem_1.InvalidAddressError({ address: paymaster });
    if (paymaster && !paymasterInput) {
        throw new viem_1.BaseError("`paymasterInput` must be provided when `paymaster` is defined");
    }
    if (!paymaster && paymasterInput) {
        throw new viem_1.BaseError("`paymaster` must be provided when `paymasterInput` is defined");
    }
}
class InvalidEip712TransactionError extends viem_1.BaseError {
    constructor() {
        super([
            "Transaction is not an EIP712 transaction.",
            "",
            "Transaction must:",
            "  - include `type: \"eip712\"`",
            "  - include one of the following: `customSignature`, `paymaster`, `paymasterInput`, `gasPerPubdata`, `factoryDeps`",
        ].join("\n"));
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidEip712TransactionError"
        });
    }
}
exports.InvalidEip712TransactionError = InvalidEip712TransactionError;
//# sourceMappingURL=assertEip712Transaction.js.map