import { encodeAbiParameters, getAbiItem, pad, parseAbiParameters, toHex } from "viem";
import { SessionKeyValidatorAbi } from "../abi/SessionKeyValidator.js";
import { base64UrlToUint8Array } from "../utils/passkey.js";
import { getPeriodIdsForTransaction } from "../utils/session.js";
const getSessionSpec = () => {
    return getAbiItem({
        abi: SessionKeyValidatorAbi,
        name: "createSession",
    }).inputs[0];
};
const extractSelectorFromCallData = (callData) => {
    const selector = callData.slice(0, "0x".length + 8); // first 4 bytes for function selector
    if (selector.length !== 10)
        return undefined;
    return selector;
};
export const encodeSession = (sessionConfig) => {
    return encodeAbiParameters([getSessionSpec()], [sessionConfig]);
};
export const encodeSessionTx = (args) => {
    return encodeAbiParameters([
        getSessionSpec(),
        { type: "uint64[]" },
    ], [
        args.sessionConfig,
        getPeriodIdsForTransaction({
            sessionConfig: args.sessionConfig,
            target: args.to,
            selector: args.callData ? extractSelectorFromCallData(args.callData) : undefined,
            timestamp: args.timestamp,
        }),
    ]);
};
export const encodePasskeyModuleParameters = (passkey) => {
    return encodeAbiParameters([
        { type: "bytes", name: "credentialId" },
        { type: "bytes32[2]", name: "xyPublicKeys" },
        { type: "string", name: "expectedOrigin" },
    ], [
        toHex(base64UrlToUint8Array(passkey.credentialId)),
        [pad(toHex(passkey.passkeyPublicKey[0])), pad(toHex(passkey.passkeyPublicKey[1]))],
        passkey.expectedOrigin,
    ]);
};
export const encodeModuleData = (moduleData) => {
    const moduleParams = parseAbiParameters("address, bytes");
    return encodeAbiParameters(moduleParams, [moduleData.address, moduleData.parameters]);
};
//# sourceMappingURL=encoding.js.map