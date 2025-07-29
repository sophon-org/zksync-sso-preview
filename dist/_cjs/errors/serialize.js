"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeError = serializeError;
const version_js_1 = require("../version.js");
const constants_js_1 = require("./constants.js");
const utils_js_1 = require("./utils.js");
function serializeError(error, requestOrMethod) {
    const serialized = (0, utils_js_1.serialize)(getErrorObject(error), {
        shouldIncludeStack: true,
    });
    const docUrl = new URL("https://docs.zksync.io/zksync-account-sdk/docs/errors");
    docUrl.searchParams.set("version", version_js_1.LIB_VERSION);
    docUrl.searchParams.set("code", serialized.code.toString());
    const method = getMethod(serialized.data, requestOrMethod);
    if (method) {
        docUrl.searchParams.set("method", method);
    }
    docUrl.searchParams.set("message", serialized.message);
    return {
        ...serialized,
        docUrl: docUrl.href,
    };
}
function isErrorResponse(response) {
    return response.errorMessage !== undefined;
}
function getErrorObject(error) {
    if (typeof error === "string") {
        return {
            message: error,
            code: constants_js_1.standardErrorCodes.rpc.internal,
        };
    }
    else if (isErrorResponse(error)) {
        return {
            ...error,
            message: error.errorMessage,
            code: error.errorCode,
            data: { method: error.method },
        };
    }
    return error;
}
function getMethod(serializedData, request) {
    const methodInData = serializedData?.method;
    if (methodInData) {
        return methodInData;
    }
    if (request === undefined) {
        return undefined;
    }
    else if (typeof request === "string") {
        return request;
    }
    else if (!Array.isArray(request)) {
        return request.method;
    }
    else if (request.length > 0) {
        return request[0].method;
    }
    return undefined;
}
//# sourceMappingURL=serialize.js.map