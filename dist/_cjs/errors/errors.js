"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumProviderError = exports.standardErrors = void 0;
const constants_js_1 = require("./constants.js");
const utils_js_1 = require("./utils.js");
exports.standardErrors = {
    rpc: {
        parse: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.parse, arg),
        invalidRequest: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.invalidRequest, arg),
        invalidParams: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.invalidParams, arg),
        methodNotFound: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.methodNotFound, arg),
        internal: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.internal, arg),
        server: (opts) => {
            if (!opts || typeof opts !== "object" || Array.isArray(opts)) {
                throw new Error("Ethereum RPC Server errors must provide single object argument.");
            }
            const { code } = opts;
            if (!Number.isInteger(code) || code > -32005 || code < -32099) {
                throw new Error("\"code\" must be an integer such that: -32099 <= code <= -32005");
            }
            return getEthJsonRpcError(code, opts);
        },
        invalidInput: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.invalidInput, arg),
        resourceNotFound: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.resourceNotFound, arg),
        resourceUnavailable: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.resourceUnavailable, arg),
        transactionRejected: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.transactionRejected, arg),
        methodNotSupported: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.methodNotSupported, arg),
        limitExceeded: (arg) => getEthJsonRpcError(constants_js_1.standardErrorCodes.rpc.limitExceeded, arg),
    },
    provider: {
        userRejectedRequest: (arg) => {
            return getEthProviderError(constants_js_1.standardErrorCodes.provider.userRejectedRequest, arg);
        },
        unauthorized: (arg) => {
            return getEthProviderError(constants_js_1.standardErrorCodes.provider.unauthorized, arg);
        },
        unsupportedMethod: (arg) => {
            return getEthProviderError(constants_js_1.standardErrorCodes.provider.unsupportedMethod, arg);
        },
        disconnected: (arg) => {
            return getEthProviderError(constants_js_1.standardErrorCodes.provider.disconnected, arg);
        },
        chainDisconnected: (arg) => {
            return getEthProviderError(constants_js_1.standardErrorCodes.provider.chainDisconnected, arg);
        },
        unsupportedChain: (arg) => {
            return getEthProviderError(constants_js_1.standardErrorCodes.provider.unsupportedChain, arg);
        },
        custom: (opts) => {
            if (!opts || typeof opts !== "object" || Array.isArray(opts)) {
                throw new Error("Ethereum Provider custom errors must provide single object argument.");
            }
            const { code, message, data } = opts;
            if (!message || typeof message !== "string") {
                throw new Error("\"message\" must be a nonempty string");
            }
            return new EthereumProviderError(code, message, data);
        },
    },
};
function getEthJsonRpcError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new EthereumRpcError(code, message || (0, utils_js_1.getMessageFromCode)(code), data);
}
function getEthProviderError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new EthereumProviderError(code, message || (0, utils_js_1.getMessageFromCode)(code), data);
}
function parseOpts(arg) {
    if (arg) {
        if (typeof arg === "string") {
            return [arg];
        }
        else if (typeof arg === "object" && !Array.isArray(arg)) {
            const { message, data } = arg;
            if (message && typeof message !== "string") {
                throw new Error("Must specify string message.");
            }
            return [message || undefined, data];
        }
    }
    return [];
}
class EthereumRpcError extends Error {
    constructor(code, message, data) {
        if (!Number.isInteger(code)) {
            throw new Error("\"code\" must be an integer.");
        }
        if (!message || typeof message !== "string") {
            throw new Error("\"message\" must be a nonempty string.");
        }
        super(message);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = code;
        if (data !== undefined) {
            this.data = data;
        }
    }
}
class EthereumProviderError extends EthereumRpcError {
    constructor(code, message, data) {
        if (!isValidEthProviderCode(code)) {
            throw new Error("\"code\" must be an integer such that: 1000 <= code <= 4999");
        }
        super(code, message, data);
    }
}
exports.EthereumProviderError = EthereumProviderError;
function isValidEthProviderCode(code) {
    return Number.isInteger(code) && code >= 1000 && code <= 4999;
}
//# sourceMappingURL=errors.js.map