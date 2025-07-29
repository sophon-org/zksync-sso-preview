"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasskeySignatureFromPublicKeyBytes = exports.getPublicKeyBytesFromPasskeySignature = void 0;
exports.unwrapEC2Signature = unwrapEC2Signature;
exports.normalizeS = normalizeS;
exports.base64UrlToUint8Array = base64UrlToUint8Array;
exports.passkeyHashSignatureResponseFormat = passkeyHashSignatureResponseFormat;
const asn1_ecc_1 = require("@peculiar/asn1-ecc");
const asn1_schema_1 = require("@peculiar/asn1-schema");
const bigint_conversion_1 = require("bigint-conversion");
const buffer_1 = require("buffer");
const viem_1 = require("viem");
var COSEKEYS;
(function (COSEKEYS) {
    COSEKEYS[COSEKEYS["kty"] = 1] = "kty";
    COSEKEYS[COSEKEYS["alg"] = 3] = "alg";
    COSEKEYS[COSEKEYS["crv"] = -1] = "crv";
    COSEKEYS[COSEKEYS["x"] = -2] = "x";
    COSEKEYS[COSEKEYS["y"] = -3] = "y";
})(COSEKEYS || (COSEKEYS = {}));
function encodeInt(int) {
    if (int >= 0 && int <= 23) {
        return buffer_1.Buffer.from([int]);
    }
    else if (int >= 24 && int <= 255) {
        return buffer_1.Buffer.from([0x18, int]);
    }
    else if (int >= 256 && int <= 65535) {
        const buf = buffer_1.Buffer.alloc(3);
        buf[0] = 0x19;
        buf.writeUInt16BE(int, 1);
        return buf;
    }
    else if (int < 0 && int >= -24) {
        return buffer_1.Buffer.from([0x20 - (int + 1)]);
    }
    else if (int < -24 && int >= -256) {
        return buffer_1.Buffer.from([0x38, -int - 1]);
    }
    else if (int < -256 && int >= -65536) {
        const buf = buffer_1.Buffer.alloc(3);
        buf[0] = 0x39;
        buf.writeUInt16BE(-int - 1, 1);
        return buf;
    }
    else {
        throw new Error("Unsupported integer range");
    }
}
function encodeBytes(bytes) {
    if (bytes.length <= 23) {
        return buffer_1.Buffer.concat([buffer_1.Buffer.from([0x40 + bytes.length]), bytes]);
    }
    else if (bytes.length < 256) {
        return buffer_1.Buffer.concat([buffer_1.Buffer.from([0x58, bytes.length]), bytes]);
    }
    else {
        throw new Error("Unsupported byte array length");
    }
}
function encodeMap(map) {
    const encodedItems = [];
    const mapHeader = 0xA0 | map.size;
    encodedItems.push(buffer_1.Buffer.from([mapHeader]));
    map.forEach((value, key) => {
        encodedItems.push(encodeInt(key));
        if (buffer_1.Buffer.isBuffer(value)) {
            encodedItems.push(encodeBytes(value));
        }
        else {
            encodedItems.push(encodeInt(value));
        }
    });
    return buffer_1.Buffer.concat(encodedItems);
}
function decodeMap(buffer) {
    const map = new Map();
    let offset = 1;
    const mapHeader = buffer[0];
    const mapSize = mapHeader & 0x1F;
    for (let i = 0; i < mapSize; i++) {
        const [key, keyLength] = decodeInt(buffer, offset);
        offset += keyLength;
        const [value, valueLength] = decodeValue(buffer, offset);
        offset += valueLength;
        map.set(key, value);
    }
    return map;
}
function decodeInt(buffer, offset) {
    const intByte = buffer[offset];
    if (intByte < 24) {
        return [intByte, 1];
    }
    else if (intByte === 0x18) {
        return [buffer[offset + 1], 2];
    }
    else if (intByte === 0x19) {
        return [buffer.readUInt16BE(offset + 1), 3];
    }
    else if (intByte >= 0x20 && intByte <= 0x37) {
        return [-(intByte - 0x20) - 1, 1];
    }
    else if (intByte === 0x38) {
        return [-1 - buffer[offset + 1], 2];
    }
    else if (intByte === 0x39) {
        return [-1 - buffer.readUInt16BE(offset + 1), 3];
    }
    else {
        throw new Error("Unsupported integer format");
    }
}
function decodeBytes(buffer, offset) {
    const lengthByte = buffer[offset];
    if (lengthByte >= 0x40 && lengthByte <= 0x57) {
        const length = lengthByte - 0x40;
        return [buffer.slice(offset + 1, offset + 1 + length), length + 1];
    }
    else if (lengthByte === 0x58) {
        const length = buffer[offset + 1];
        return [buffer.slice(offset + 2, offset + 2 + length), length + 2];
    }
    else {
        throw new Error("Unsupported byte format");
    }
}
function decodeValue(buffer, offset) {
    const type = buffer[offset];
    if (type >= 0x40 && type <= 0x5F) {
        return decodeBytes(buffer, offset);
    }
    else {
        return decodeInt(buffer, offset);
    }
}
const getPublicKeyBytesFromPasskeySignature = (publicPasskey) => {
    const cosePublicKey = decodeMap(buffer_1.Buffer.from(publicPasskey));
    const x = cosePublicKey.get(COSEKEYS.x);
    const y = cosePublicKey.get(COSEKEYS.y);
    return [buffer_1.Buffer.from(x), buffer_1.Buffer.from(y)];
};
exports.getPublicKeyBytesFromPasskeySignature = getPublicKeyBytesFromPasskeySignature;
const getPasskeySignatureFromPublicKeyBytes = (coordinates) => {
    const [xHex, yHex] = coordinates;
    const x = buffer_1.Buffer.from(xHex.slice(2), "hex");
    const y = buffer_1.Buffer.from(yHex.slice(2), "hex");
    const cosePublicKey = new Map();
    cosePublicKey.set(COSEKEYS.kty, 2);
    cosePublicKey.set(COSEKEYS.alg, -7);
    cosePublicKey.set(COSEKEYS.crv, 1);
    cosePublicKey.set(COSEKEYS.x, x);
    cosePublicKey.set(COSEKEYS.y, y);
    const encodedPublicKey = encodeMap(cosePublicKey);
    return new Uint8Array(encodedPublicKey);
};
exports.getPasskeySignatureFromPublicKeyBytes = getPasskeySignatureFromPublicKeyBytes;
function unwrapEC2Signature(signature) {
    const parsedSignature = asn1_schema_1.AsnParser.parse(signature, asn1_ecc_1.ECDSASigValue);
    let rBytes = new Uint8Array(parsedSignature.r);
    let sBytes = new Uint8Array(parsedSignature.s);
    if (shouldRemoveLeadingZero(rBytes)) {
        rBytes = rBytes.slice(1);
    }
    if (shouldRemoveLeadingZero(sBytes)) {
        sBytes = sBytes.slice(1);
    }
    return {
        r: rBytes,
        s: normalizeS(sBytes),
    };
}
function normalizeS(sBuf) {
    const n = BigInt("0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551");
    const halfN = n / BigInt(2);
    const sNumber = (0, bigint_conversion_1.bufToBigint)(sBuf);
    if (sNumber / halfN) {
        return new Uint8Array((0, bigint_conversion_1.bigintToBuf)(n - sNumber));
    }
    else {
        return sBuf;
    }
}
function shouldRemoveLeadingZero(bytes) {
    return bytes[0] === 0x0 && (bytes[1] & (1 << 7)) !== 0;
}
function base64UrlToUint8Array(base64urlString, isUrl = true) {
    const _buffer = toArrayBuffer(base64urlString, isUrl);
    return new Uint8Array(_buffer);
}
function toArrayBuffer(data, isUrl) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", charsUrl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", genLookup = (target) => {
        const lookupTemp = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
        const len = chars.length;
        for (let i = 0; i < len; i++) {
            lookupTemp[target.charCodeAt(i)] = i;
        }
        return lookupTemp;
    }, lookup = genLookup(chars), lookupUrl = genLookup(charsUrl);
    const len = data.length;
    let bufferLength = data.length * 0.75, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (data[data.length - 1] === "=") {
        bufferLength--;
        if (data[data.length - 2] === "=") {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer), target = isUrl ? lookupUrl : lookup;
    for (i = 0; i < len; i += 4) {
        encoded1 = target[data.charCodeAt(i)];
        encoded2 = target[data.charCodeAt(i + 1)];
        encoded3 = target[data.charCodeAt(i + 2)];
        encoded4 = target[data.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
}
;
function passkeyHashSignatureResponseFormat(passkeyId, passkeyResponse, contracts) {
    const signature = unwrapEC2Signature(base64UrlToUint8Array(passkeyResponse.signature));
    const fatSignature = (0, viem_1.encodeAbiParameters)([
        { type: "bytes" },
        { type: "bytes" },
        { type: "bytes32[2]" },
        { type: "bytes" },
    ], [
        (0, viem_1.toHex)(base64UrlToUint8Array(passkeyResponse.authenticatorData)),
        (0, viem_1.toHex)(base64UrlToUint8Array(passkeyResponse.clientDataJSON)),
        [(0, viem_1.pad)((0, viem_1.toHex)(signature.r)), (0, viem_1.pad)((0, viem_1.toHex)(signature.s))],
        (0, viem_1.toHex)(base64UrlToUint8Array(passkeyId)),
    ]);
    const fullFormattedSig = (0, viem_1.encodeAbiParameters)([
        { type: "bytes" },
        { type: "address" },
        { type: "bytes[]" },
    ], [
        fatSignature,
        contracts.passkey,
        ["0x"],
    ]);
    return fullFormattedSig;
}
//# sourceMappingURL=passkey.js.map