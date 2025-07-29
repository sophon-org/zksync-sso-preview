import type { Hex } from "viem";
export type OidcData = {
    oidcDigest: Hex;
    iss: string;
    readyToRecover: boolean;
    pendingPasskeyHash: Hex;
    recoverNonce: bigint;
    addedOn: bigint;
};
//# sourceMappingURL=serialize.d.ts.map