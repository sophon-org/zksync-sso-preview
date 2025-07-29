import { Buffer } from "buffer";
import { type Address, type Hex } from "viem";
export declare const getPublicKeyBytesFromPasskeySignature: (publicPasskey: Uint8Array) => [Buffer, Buffer];
export declare const getPasskeySignatureFromPublicKeyBytes: (coordinates: readonly [Hex, Hex]) => Uint8Array;
/**
 * Return 2 32byte words for the R & S for the EC2 signature, 0 l-trimmed
 * @param signature
 * @returns r & s bytes sequentially
 */
export declare function unwrapEC2Signature(signature: Uint8Array): {
    r: Uint8Array;
    s: Uint8Array;
};
/**
 * Normalizes the 's' value of an ECDSA signature to prevent signature malleability.
 *
 * @param {Uint8Array} sBuf - The 's' value of the signature as a Uint8Array.
 * @returns {Uint8Array} The normalized 's' value as a Uint8Array.
 *
 * @description
 * This function implements the process of normalizing the 's' value in an ECDSA signature.
 * It ensures that the 's' value is always in the lower half of the curve's order,
 * which helps prevent signature malleability attacks.
 *
 * The function uses the curve order 'n' for secp256k1:
 * n = 0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551
 *
 * If 's' is greater than half of 'n', it is subtracted from 'n' to get the lower value.
 */
export declare function normalizeS(sBuf: Uint8Array): Uint8Array;
/**
 * Decode from a Base64URL-encoded string to an ArrayBuffer. Best used when converting a
 * credential ID from a JSON string to an ArrayBuffer, like in allowCredentials or
 * excludeCredentials.
 *
 * @param buffer Value to decode from base64
 * @param to (optional) The decoding to use, in case it's desirable to decode from base64 instead
 */
export declare function base64UrlToUint8Array(base64urlString: string, isUrl?: boolean): Uint8Array;
export declare function passkeyHashSignatureResponseFormat(passkeyId: string, passkeyResponse: {
    authenticatorData: string;
    clientDataJSON: string;
    signature: string;
}, contracts: {
    passkey: Address;
}): `0x${string}`;
//# sourceMappingURL=passkey.d.ts.map