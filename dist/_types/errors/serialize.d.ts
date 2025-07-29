import { type SerializedEthereumRpcError } from "./utils.js";
/**
 * Serializes an error to a format that is compatible with the Ethereum JSON RPC error format.
 */
export declare function serializeError(error: unknown, requestOrMethod?: JSONRPCRequest | JSONRPCRequest[] | string): SerializedError;
interface SerializedError extends SerializedEthereumRpcError {
    docUrl: string;
}
interface JSONRPCRequest {
    method: string;
}
export {};
//# sourceMappingURL=serialize.d.ts.map