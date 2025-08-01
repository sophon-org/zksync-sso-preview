import { errorValues, standardErrorCodes } from "./constants.js";
const FALLBACK_MESSAGE = "Unspecified error message.";
const JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.";
/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 */
export function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
    if (code && Number.isInteger(code)) {
        const codeString = code.toString();
        if (hasKey(errorValues, codeString)) {
            return errorValues[codeString].message;
        }
        if (isJsonRpcServerError(code)) {
            return JSON_RPC_SERVER_ERROR_MESSAGE;
        }
    }
    return fallbackMessage;
}
/**
 * Returns whether the given code is valid.
 * A code is only valid if it has a message.
 */
export function isValidCode(code) {
    if (!Number.isInteger(code)) {
        return false;
    }
    const codeString = code.toString();
    if (errorValues[codeString]) {
        return true;
    }
    if (isJsonRpcServerError(code)) {
        return true;
    }
    return false;
}
/**
 * Returns the error code from an error object.
 */
export function getErrorCode(error) {
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
export function serialize(error, { shouldIncludeStack = false } = {}) {
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
        serialized.code = standardErrorCodes.rpc.internal;
        serialized.message = hasStringProperty(error, "message") ? error.message : FALLBACK_MESSAGE;
        serialized.data = { originalError: assignOriginalError(error) };
    }
    if (shouldIncludeStack) {
        serialized.stack = hasStringProperty(error, "stack") ? error.stack : undefined;
    }
    return serialized;
}
// Internal
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