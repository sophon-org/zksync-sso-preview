import { type AbiStateMutability } from "viem";
type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;
type NumericKeys<T extends unknown[]> = Extract<keyof T, `${number}`>;
export type IndexedValues<T extends unknown[]> = Array<{
    [K in NumericKeys<T>]: {
        index: ToNumber<K>;
        value?: T[K];
    };
}[NumericKeys<T>]>;
export type ContractWriteMutability = Extract<AbiStateMutability, "nonpayable" | "payable">;
export type ConvertBigIntToString<T> = T extends bigint ? string : T extends Array<infer U> ? Array<ConvertBigIntToString<U>> : T extends object ? {
    [K in keyof T]: ConvertBigIntToString<T[K]>;
} : T;
export {};
//# sourceMappingURL=type-utils.d.ts.map