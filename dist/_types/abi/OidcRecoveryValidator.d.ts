export declare const OidcRecoveryValidatorAbi: readonly [{
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "ADDRESS_CAST_OVERFLOW";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "digest";
        readonly type: "bytes32";
    }];
    readonly name: "AddressNotFoundForDigest";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "NoOidcDataForGivenAddress";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "digest";
        readonly type: "bytes32";
    }];
    readonly name: "OidcDigestAlreadyRegisteredInAnotherAccount";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "TimeLimitExpired";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ValidateSignatureNotImplemented";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ZkProofVerificationFailed";
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
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "oidcDigest";
        readonly type: "bytes32";
    }];
    readonly name: "OidcAccountDeleted";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "oidcDigest";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "iss";
        readonly type: "string";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "isNew";
        readonly type: "bool";
    }];
    readonly name: "OidcAccountUpdated";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "oidcDigest";
        readonly type: "bytes32";
    }, {
        readonly internalType: "string";
        readonly name: "iss";
        readonly type: "string";
    }];
    readonly name: "addOidcAccount";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "digest";
        readonly type: "bytes32";
    }];
    readonly name: "addressForDigest";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "deleteOidcAccount";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_keyRegistry";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_verifier";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_webAuthValidator";
        readonly type: "address";
    }];
    readonly name: "initialize";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "keyRegistry";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "oidcDataForAddress";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "oidcDigest";
            readonly type: "bytes32";
        }, {
            readonly internalType: "string";
            readonly name: "iss";
            readonly type: "string";
        }, {
            readonly internalType: "bool";
            readonly name: "readyToRecover";
            readonly type: "bool";
        }, {
            readonly internalType: "bytes32";
            readonly name: "pendingPasskeyHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "recoverNonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "addedOn";
            readonly type: "uint256";
        }];
        readonly internalType: "struct OidcRecoveryValidator.OidcData";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "onInstall";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onUninstall";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256[2]";
                readonly name: "pA";
                readonly type: "uint256[2]";
            }, {
                readonly internalType: "uint256[2][2]";
                readonly name: "pB";
                readonly type: "uint256[2][2]";
            }, {
                readonly internalType: "uint256[2]";
                readonly name: "pC";
                readonly type: "uint256[2]";
            }];
            readonly internalType: "struct OidcRecoveryValidator.ZkProof";
            readonly name: "zkProof";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes32";
            readonly name: "kid";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "pendingPasskeyHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "timeLimit";
            readonly type: "uint256";
        }];
        readonly internalType: "struct OidcRecoveryValidator.StartRecoveryData";
        readonly name: "data";
        readonly type: "tuple";
    }, {
        readonly internalType: "address";
        readonly name: "targetAccount";
        readonly type: "address";
    }];
    readonly name: "startRecovery";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "interfaceId";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "validateSignature";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "txType";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "from";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "to";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasLimit";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasPerPubdataByteLimit";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "paymaster";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256[4]";
            readonly name: "reserved";
            readonly type: "uint256[4]";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes32[]";
            readonly name: "factoryDeps";
            readonly type: "bytes32[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "paymasterInput";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "reservedDynamic";
            readonly type: "bytes";
        }];
        readonly internalType: "struct Transaction";
        readonly name: "transaction";
        readonly type: "tuple";
    }];
    readonly name: "validateTransaction";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "verifier";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "webAuthValidator";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=OidcRecoveryValidator.d.ts.map