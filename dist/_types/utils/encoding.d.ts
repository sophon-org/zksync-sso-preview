import { type Address, type Hash } from "viem";
import { type SessionConfig } from "../utils/session.js";
export declare const encodeSession: (sessionConfig: SessionConfig) => `0x${string}`;
export declare const encodeSessionTx: (args: {
    sessionConfig: SessionConfig;
    to: Address;
    callData?: Hash;
    timestamp?: bigint;
}) => `0x${string}`;
export declare const encodePasskeyModuleParameters: (passkey: {
    credentialId: string;
    passkeyPublicKey: [Buffer, Buffer];
    expectedOrigin: string;
}) => `0x${string}`;
export declare const encodeModuleData: (moduleData: {
    address: Address;
    parameters: Hash;
}) => `0x${string}`;
//# sourceMappingURL=encoding.d.ts.map