/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 */
export declare function getMessageFromCode(code: number | undefined, fallbackMessage?: string): string;
/**
 * Returns whether the given code is valid.
 * A code is only valid if it has a message.
 */
export declare function isValidCode(code: number): boolean;
/**
 * Returns the error code from an error object.
 */
export declare function getErrorCode(error: unknown): number | undefined;
/**
 * Serializes the given error to an Ethereum JSON RPC-compatible error object.
 * Merely copies the given error's values if it is already compatible.
 * If the given error is not fully compatible, it will be preserved on the
 * returned object's data.originalError property.
 */
export interface SerializedEthereumRpcError {
    code: number;
    message: string;
    data?: unknown;
    stack?: string;
}
export declare function serialize(error: unknown, { shouldIncludeStack }?: {
    shouldIncludeStack?: boolean | undefined;
}): SerializedEthereumRpcError;
//# sourceMappingURL=utils.d.ts.map