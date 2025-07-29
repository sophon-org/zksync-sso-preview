export declare const OidcKeyRegistryAbi: readonly [{
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }];
    readonly name: "EvenRsaModulus";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "expectedIssHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "actualIssHash";
        readonly type: "bytes32";
    }];
    readonly name: "IssuerHashMismatch";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "count";
        readonly type: "uint256";
    }];
    readonly name: "KeyCountLimitExceeded";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "index";
        readonly type: "uint256";
    }];
    readonly name: "KeyIdCannotBeZero";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "issHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }];
    readonly name: "KeyNotFound";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "issHash";
        readonly type: "bytes32";
    }];
    readonly name: "KidAlreadyRegistered";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }];
    readonly name: "ModulusCannotBeZero";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "chunkIndex";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "chunkValue";
        readonly type: "uint256";
    }];
    readonly name: "ModulusChunkTooLarge";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint8";
        readonly name: "version";
        readonly type: "uint8";
    }];
    readonly name: "Initialized";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "issHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256[17]";
        readonly name: "n";
        readonly type: "uint256[17]";
    }];
    readonly name: "KeyAdded";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "issHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }];
    readonly name: "KeyDeleted";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferStarted";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "CIRCOM_BIGINT_CHUNKS";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "CIRCOM_BIGINT_CHUNK_SIZE";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "MAX_KEYS";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "acceptOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "issHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "kid";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256[17]";
            readonly name: "rsaModulus";
            readonly type: "uint256[17]";
        }];
        readonly internalType: "struct IOidcKeyRegistry.Key";
        readonly name: "newKey";
        readonly type: "tuple";
    }];
    readonly name: "addKey";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "issHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "kid";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256[17]";
            readonly name: "rsaModulus";
            readonly type: "uint256[17]";
        }];
        readonly internalType: "struct IOidcKeyRegistry.Key[]";
        readonly name: "newKeys";
        readonly type: "tuple[]";
    }];
    readonly name: "addKeys";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "issHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }];
    readonly name: "deleteKey";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "issHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "kid";
        readonly type: "bytes32";
    }];
    readonly name: "getKey";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "issHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "kid";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256[17]";
            readonly name: "rsaModulus";
            readonly type: "uint256[17]";
        }];
        readonly internalType: "struct IOidcKeyRegistry.Key";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "issHash";
        readonly type: "bytes32";
    }];
    readonly name: "getKeys";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "issHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "kid";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256[17]";
            readonly name: "rsaModulus";
            readonly type: "uint256[17]";
        }];
        readonly internalType: "struct IOidcKeyRegistry.Key[8]";
        readonly name: "";
        readonly type: "tuple[8]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "iss";
        readonly type: "string";
    }];
    readonly name: "hashIssuer";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "initialize";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
//# sourceMappingURL=OidcKeyRegistry.d.ts.map