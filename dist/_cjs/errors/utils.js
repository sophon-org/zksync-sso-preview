"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageFromCode = getMessageFromCode;
exports.isValidCode = isValidCode;
exports.getErrorCode = getErrorCode;
exports.serialize = serialize;
const constants_js_1 = require("./constants.js");
const FALLBACK_MESSAGE = "Unspecified error message.";
const JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.";
function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
    if (code && Number.isInteger(code)) {
        const codeString = code.toString();
        if (hasKey(constants_js_1.errorValues, codeString)) {
            return constants_js_1.errorValues[codeString].message;
        }
        if (isJsonRpcServerError(code)) {
            return JSON_RPC_SERVER_ERROR_MESSAGE;
        }
    }
    return fallbackMessage;
}
function isValidCode(code) {
    if (!Number.isInteger(code)) {
        return false;
    }
    const codeString = code.toString();
    if (constants_js_1.errorValues[codeString]) {
        return true;
    }
    if (isJsonRpcServerError(code)) {
        return true;
    }
    return false;
}
function getErrorCode(error) {
    if (typeof error === "number") {
        return error;
    }
    else if (isErrorWithCode(error)) {
        return error.code ?? error.errorCode;
    }
    return undefined;
}
function isErrorWithCode(error) {
    return (typeof error === "object"
        && error !== null
        && (typeof error.code === "number"
            || typeof error.errorCode === "number"));
}
function serialize(error, { shouldIncludeStack = false } = {}) {
    const serialized = {};
    if (error
        && typeof error === "object"
        && !Array.isArray(error)
        && hasKey(error, "code")
        && isValidCode(error.code)) {
        const _error = error;
        serialized.code = _error.code;
        if (_error.message && typeof _error.message === "string") {
            serialized.message = _error.message;
            if (hasKey(_error, "data")) {
                serialized.data = _error.data;
            }
        }
        else {
            serialized.message = getMessageFromCode(serialized.code);
            serialized.data = { originalError: assignOriginalError(error) };
        }
    }
    else {
        serialized.code = constants_js_1.standardErrorCodes.rpc.internal;
        serialized.message = hasStringProperty(error, "message") ? error.message : FALLBACK_MESSAGE;
        serialized.data = { originalError: assignOriginalError(error) };
    }
    if (shouldIncludeStack) {
        serialized.stack = hasStringProperty(error, "stack") ? error.stack : undefined;
    }
    return serialized;
}
function isJsonRpcServerError(code) {
    return code >= -32099 && code <= -32000;
}
function assignOriginalError(error) {
    if (error && typeof error === "object" && !Array.isArray(error)) {
        return Object.assign({}, error);
    }
    return error;
}
function hasKey(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function hasStringProperty(obj, prop) {
    return (typeof obj === "object" && obj !== null && prop in obj && typeof obj[prop] === "string");
}
//# sourceMappingURL=utils.js.map