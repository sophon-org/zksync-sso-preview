const StorageSerializers = {
    object: {
        read: (v) => {
            try {
                return JSON.parse(v);
            }
            catch {
                throw new Error("Failed to parse JSON");
            }
        },
        write: (v) => JSON.stringify(v),
    },
};
export class StorageItem {
    constructor(key, defaultValue, options = {}) {
        Object.defineProperty(this, "key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "storage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serializer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onChangeCallback", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.key = key;
        this.defaultValue = defaultValue;
        this.storage = options.storage || localStorage;
        this.serializer = options.serializer || StorageSerializers.object;
        if (options.onChange) {
            this.onChangeCallback = options.onChange;
        }
    }
    get() {
        const storedValue = this.storage.getItem(this.key);
        if (storedValue !== null) {
            try {
                return this.serializer.read(storedValue);
            }
            catch {
                return this.defaultValue;
            }
        }
        return this.defaultValue;
    }
    set(value) {
        const oldValue = this.get();
        const serializedValue = this.serializer.write(value);
        this.storage.setItem(this.key, serializedValue);
        this.notifyChange(value, oldValue);
    }
    remove() {
        const oldValue = this.get();
        this.storage.removeItem(this.key);
        this.notifyChange(this.defaultValue, oldValue);
    }
    notifyChange(newValue, oldValue) {
        if (this.onChangeCallback) {
            this.onChangeCallback(newValue, oldValue);
        }
    }
}
Object.defineProperty(StorageItem, "scopedStorageKey", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (key) => `ZKAccount::${key}`
});
//# sourceMappingURL=storage.js.map