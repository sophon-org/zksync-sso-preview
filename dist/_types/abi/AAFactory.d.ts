export declare const AAFactoryAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_beaconProxyBytecodeHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "_beacon";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_passKeyModule";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_sessionKeyModule";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "ACCOUNT_ALREADY_EXISTS";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "EMPTY_BEACON_ADDRESS";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "EMPTY_BEACON_BYTECODE_HASH";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "EMPTY_PASSKEY_ADDRESS";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "EMPTY_SESSIONKEY_ADDRESS";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "INVALID_ACCOUNT_KEYS";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "accountAddress";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "uniqueAccountId";
        readonly type: "bytes32";
    }];
    readonly name: "AccountCreated";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "accountId";
        readonly type: "bytes32";
    }];
    readonly name: "accountMappings";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "deployedAccount";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "beacon";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "beaconProxyBytecodeHash";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "uniqueId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes";
        readonly name: "passKey";
        readonly type: "bytes";
    }, {
        readonly internalType: "bytes";
        readonly name: "sessionKey";
        readonly type: "bytes";
    }, {
        readonly internalType: "address[]";
        readonly name: "ownerKeys";
        readonly type: "address[]";
    }];
    readonly name: "deployModularAccount";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "accountAddress";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "uniqueId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes[]";
        readonly name: "initialValidators";
        readonly type: "bytes[]";
    }, {
        readonly internalType: "address[]";
        readonly name: "initialK1Owners";
        readonly type: "address[]";
    }];
    readonly name: "deployProxySsoAccount";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "accountAddress";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getEncodedBeacon";
    readonly outputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "passKeyModule";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "sessionKeyModule";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=AAFactory.d.ts.map