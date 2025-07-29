import { type AbiFunction, type Hash } from "viem";
import type { SessionConfig } from "../../utils/session.js";
import type { ConvertBigIntToString } from "./type-utils.js";
export declare const isDynamicInputType: (inputType: string) => boolean;
export declare const isFollowedByDynamicInputType: (abiFunction: AbiFunction, targetInputIndex: number) => boolean;
export declare const encodedInputToAbiChunks: (encodedInput: string) => Hash[];
export declare const getParameterChunkIndex: (abiFunction: AbiFunction, targetInputIndex: number) => number;
export declare const msStringToSeconds: (value: string) => bigint;
export type SessionConfigJSON = ConvertBigIntToString<SessionConfig>;
export declare const parseSessionConfigJSON: (sessionConfig: SessionConfigJSON) => SessionConfig;
//# sourceMappingURL=utils.d.ts.map