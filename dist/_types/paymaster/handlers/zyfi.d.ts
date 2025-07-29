import type { Address } from "viem";
import type { CustomPaymasterHandler } from "../index.js";
export interface ZyfiPaymasterParams {
    /** Your API key. Get it from Dashboard on https://www.zyfi.org/ */
    apiKey: string;
    /** The address of the token to be used for fee payment */
    feeTokenAddress?: Address;
    /** Whether to check for NFT ownership for fee payment */
    checkNFT?: boolean;
    /** Whether the transaction is on a testnet */
    isTestnet?: boolean;
    /** The ratio of fees to be sponsored by the paymaster (0-100) */
    sponsorshipRatio?: number;
    /** determines the user nonces interval for which the response will be valid (current nonce + replayLimit). */
    replayLimit?: number;
}
export declare function createZyfiPaymaster(params: ZyfiPaymasterParams): CustomPaymasterHandler;
//# sourceMappingURL=zyfi.d.ts.map