"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSessionConfigJSON = exports.msStringToSeconds = exports.getParameterChunkIndex = exports.encodedInputToAbiChunks = exports.isFollowedByDynamicInputType = exports.isDynamicInputType = void 0;
const ms_1 = require("ms");
const viem_1 = require("viem");
const DYNAMIC_ABI_INPUT_TYPES = ["bytes", "string"];
const isDynamicInputType = (inputType) => {
    return inputType.endsWith("[]") || DYNAMIC_ABI_INPUT_TYPES.includes(inputType);
};
exports.isDynamicInputType = isDynamicInputType;
const includesDynamicInputType = (abiParameters) => {
    return abiParameters.some((input) => {
        const isDynamicType = (0, exports.isDynamicInputType)(input.type);
        if (isDynamicType)
            return true;
        if (input.type.startsWith("tuple")) {
            const components = input.components;
            if (!components)
                throw new Error("Tuple without components is unsupported");
            return includesDynamicInputType(components);
        }
        return false;
    });
};
const isFollowedByDynamicInputType = (abiFunction, targetInputIndex) => {
    if (targetInputIndex >= abiFunction.inputs.length) {
        throw new Error(`Input index ${targetInputIndex} is out of bounds`);
    }
    return includesDynamicInputType(abiFunction.inputs.slice(0, targetInputIndex));
};
exports.isFollowedByDynamicInputType = isFollowedByDynamicInputType;
const encodedInputToAbiChunks = (encodedInput) => {
    if (!encodedInput.startsWith("0x")) {
        throw new Error("Input is not a valid hex string");
    }
    return (encodedInput.slice(2).match(/.{1,64}/g) || []).map((e) => `0x${e}`);
};
exports.encodedInputToAbiChunks = encodedInputToAbiChunks;
const getDummyBytesValue = (type) => {
    const size = parseInt(type.slice(5)) || 32;
    return (0, viem_1.toHex)("", { size });
};
const getDummyValue = (type) => {
    if (type === "address")
        return "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049";
    if (type.startsWith("uint") || type.startsWith("int"))
        return 0n;
    if (type.startsWith("bytes"))
        return getDummyBytesValue(type);
    if (type === "bool")
        return false;
    if (type === "string")
        return "";
    throw new Error(`Unsupported ABI type: ${type}`);
};
function getArrayComponents(type) {
    const matches = type.match(/^(.*)\[(\d+)?\]$/);
    return matches
        ? [matches[2] ? Number(matches[2]) : null, matches[1]]
        : undefined;
}
const getDummyValues = (inputs) => {
    return inputs.map((input) => {
        const arrayComponents = getArrayComponents(input.type);
        if (arrayComponents) {
            const [length, innerType] = arrayComponents;
            if (!length)
                throw new Error("Dynamic array length is unsupported");
            const arrayValue = Array.from({ length }, () => getDummyValues([{
                    ...input,
                    type: innerType,
                }]));
            return arrayValue;
        }
        if (input.type.startsWith("tuple")) {
            const components = input.components;
            if (!components)
                throw new Error("Tuple without components is unsupported");
            return getDummyValues(components);
        }
        return getDummyValue(input.type);
    });
};
const getParameterChunkIndex = (abiFunction, targetInputIndex) => {
    if (targetInputIndex >= abiFunction.inputs.length) {
        throw new Error(`Input index ${targetInputIndex} is out of bounds`);
    }
    const inputs = abiFunction.inputs.slice(0, targetInputIndex);
    const dummyValues = getDummyValues(inputs);
    const encoded = (0, viem_1.encodeAbiParameters)(inputs, dummyValues);
    const chunks = (0, exports.encodedInputToAbiChunks)(encoded);
    const chunkIndex = chunks.length;
    return chunkIndex;
};
exports.getParameterChunkIndex = getParameterChunkIndex;
const msStringToSeconds = (value) => {
    let millis;
    try {
        millis = (0, ms_1.default)(value);
    }
    catch (error) {
        throw new Error(`Invalid date format: ${value}: ${error}`);
    }
    if (millis < 0)
        throw new Error(`Date can't be in the past: ${value}`);
    if (millis === 0)
        throw new Error(`Date can't be zero: ${value}`);
    const seconds = Math.floor(millis / 1000);
    return BigInt(seconds);
};
exports.msStringToSeconds = msStringToSeconds;
const parseSessionConfigJSON = (sessionConfig) => {
    const serializeLimit = (limit) => ({
        limitType: limit.limitType,
        limit: BigInt(limit.limit),
        period: BigInt(limit.period),
    });
    return {
        ...sessionConfig,
        expiresAt: BigInt(sessionConfig.expiresAt),
        feeLimit: serializeLimit(sessionConfig.feeLimit),
        transferPolicies: sessionConfig.transferPolicies.map((policy) => ({
            ...policy,
            maxValuePerUse: BigInt(policy.maxValuePerUse),
            valueLimit: serializeLimit(policy.valueLimit),
        })),
        callPolicies: sessionConfig.callPolicies.map((policy) => ({
            ...policy,
            maxValuePerUse: BigInt(policy.maxValuePerUse),
            valueLimit: serializeLimit(policy.valueLimit),
            constraints: policy.constraints.map((constraint) => ({
                ...constraint,
                index: BigInt(constraint.index),
                limit: serializeLimit(constraint.limit),
            })),
        })),
    };
};
exports.parseSessionConfigJSON = parseSessionConfigJSON;
//# sourceMappingURL=utils.js.map