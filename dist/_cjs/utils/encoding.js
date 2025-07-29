"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeModuleData = exports.encodePasskeyModuleParameters = exports.encodeSessionTx = exports.encodeSession = void 0;
const viem_1 = require("viem");
const SessionKeyValidator_js_1 = require("../abi/SessionKeyValidator.js");
const passkey_js_1 = require("../utils/passkey.js");
const session_js_1 = require("../utils/session.js");
const getSessionSpec = () => {
    return (0, viem_1.getAbiItem)({
        abi: SessionKeyValidator_js_1.SessionKeyValidatorAbi,
        name: "createSession",
    }).inputs[0];
};
const extractSelectorFromCallData = (callData) => {
    const selector = callData.slice(0, "0x".length + 8);
    if (selector.length !== 10)
        return undefined;
    return selector;
};
const encodeSession = (sessionConfig) => {
    return (0, viem_1.encodeAbiParameters)([getSessionSpec()], [sessionConfig]);
};
exports.encodeSession = encodeSession;
const encodeSessionTx = (args) => {
    return (0, viem_1.encodeAbiParameters)([
        getSessionSpec(),
        { type: "uint64[]" },
    ], [
        args.sessionConfig,
        (0, session_js_1.getPeriodIdsForTransaction)({
            sessionConfig: args.sessionConfig,
            target: args.to,
            selector: args.callData ? extractSelectorFromCallData(args.callData) : undefined,
            timestamp: args.timestamp,
        }),
    ]);
};
exports.encodeSessionTx = encodeSessionTx;
const encodePasskeyModuleParameters = (passkey) => {
    return (0, viem_1.encodeAbiParameters)([
        { type: "bytes", name: "credentialId" },
        { type: "bytes32[2]", name: "xyPublicKeys" },
        { type: "string", name: "expectedOrigin" },
    ], [
        (0, viem_1.toHex)((0, passkey_js_1.base64UrlToUint8Array)(passkey.credentialId)),
        [(0, viem_1.pad)((0, viem_1.toHex)(passkey.passkeyPublicKey[0])), (0, viem_1.pad)((0, viem_1.toHex)(passkey.passkeyPublicKey[1]))],
        passkey.expectedOrigin,
    ]);
};
exports.encodePasskeyModuleParameters = encodePasskeyModuleParameters;
const encodeModuleData = (moduleData) => {
    const moduleParams = (0, viem_1.parseAbiParameters)("address, bytes");
    return (0, viem_1.encodeAbiParameters)(moduleParams, [moduleData.address, moduleData.parameters]);
};
exports.encodeModuleData = encodeModuleData;
//# sourceMappingURL=encoding.js.map