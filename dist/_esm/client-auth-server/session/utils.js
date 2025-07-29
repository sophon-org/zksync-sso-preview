import ms from "ms";
import { encodeAbiParameters, toHex } from "viem";
const DYNAMIC_ABI_INPUT_TYPES = ["bytes", "string"];
export const isDynamicInputType = (inputType) => {
    return inputType.endsWith("[]") || DYNAMIC_ABI_INPUT_TYPES.includes(inputType);
};
const includesDynamicInputType = (abiParameters) => {
    return abiParameters.some((input) => {
        const isDynamicType = isDynamicInputType(input.type);
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
export const isFollowedByDynamicInputType = (abiFunction, targetInputIndex) => {
    if (targetInputIndex >= abiFunction.inputs.length) {
        throw new Error(`Input index ${targetInputIndex} is out of bounds`);
    }
    return includesDynamicInputType(abiFunction.inputs.slice(0, targetInputIndex));
};
export const encodedInputToAbiChunks = (encodedInput) => {
    if (!encodedInput.startsWith("0x")) {
        throw new Error("Input is not a valid hex string");
    }
    return (encodedInput.slice(2).match(/.{1,64}/g) || []).map((e) => `0x${e}`); // 32 bytes abi chunks
};
const getDummyBytesValue = (type) => {
    const size = parseInt(type.slice(5)) || 32;
    return toHex("", { size });
};
// Function to generate dummy values for ABI types
const getDummyValue = (type) => {
    if (type === "address")
        return "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049";
    if (type.startsWith("uint") || type.startsWith("int"))
        return 0n; // BigInt for numbers
    if (type.startsWith("bytes"))
        return getDummyBytesValue(type); // Empty bytes
    if (type === "bool")
        return false;
    if (type === "string")
        return ""; // Empty string
    throw new Error(`Unsupported ABI type: ${type}`);
};
function getArrayComponents(type) {
    const matches = type.match(/^(.*)\[(\d+)?\]$/);
    return matches
        ? [matches[2] ? Number(matches[2]) : null, matches[1]]
        : undefined;
}
// Recursive function to fill dummy values for complex types like tuples
const getDummyValues = (inputs) => {
    return inputs.map((input) => {
        const arrayComponents = getArrayComponents(input.type);
        if (arrayComponents) {
            // Recursively fill array components
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
            // Recursively fill tuple components
            const components = input.components;
            if (!components)
                throw new Error("Tuple without components is unsupported");
            return getDummyValues(components);
        }
        return getDummyValue(input.type);
    });
};
export const getParameterChunkIndex = (abiFunction, targetInputIndex) => {
    if (targetInputIndex >= abiFunction.inputs.length) {
        throw new Error(`Input index ${targetInputIndex} is out of bounds`);
    }
    const inputs = abiFunction.inputs.slice(0, targetInputIndex);
    const dummyValues = getDummyValues(inputs);
    const encoded = encodeAbiParameters(inputs, dummyValues);
    const chunks = encodedInputToAbiChunks(encoded);
    const chunkIndex = chunks.length;
    return chunkIndex;
};
export const msStringToSeconds = (value) => {
    let millis;
    try {
        millis = ms(value);
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
export const parseSessionConfigJSON = (sessionConfig) => {
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
//# sourceMappingURL=utils.js.map