export declare function getWebsiteName(): string | null;
export declare function getFavicon(): string | null;
export declare function noThrow<T>(fn: () => T): T | null;
export declare function findSmallestBigInt(arr: bigint[]): bigint;
export declare function calculateMaxFee(fee: {
    gas?: bigint;
    gasPrice?: bigint;
    maxFeePerGas?: bigint;
    maxPriorityFeePerGas?: bigint;
}): bigint;
//# sourceMappingURL=helpers.d.ts.map