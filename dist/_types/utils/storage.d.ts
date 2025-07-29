export interface StorageLike {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
interface Serializer<T> {
    read(value: string): T;
    write(value: T): string;
}
type ChangeListener<T> = (newValue: T, oldValue: T) => void;
interface StorageItemOptions<T> {
    storage?: StorageLike;
    serializer?: Serializer<T>;
    onChange?: ChangeListener<T>;
}
export declare class StorageItem<T> {
    key: string;
    defaultValue: T;
    storage: StorageLike;
    serializer: Serializer<T>;
    private onChangeCallback?;
    constructor(key: string, defaultValue: T, options?: StorageItemOptions<T>);
    static scopedStorageKey: (key: string) => string;
    get(): T;
    set(value: T): void;
    remove(): void;
    private notifyChange;
}
export {};
//# sourceMappingURL=storage.d.ts.map