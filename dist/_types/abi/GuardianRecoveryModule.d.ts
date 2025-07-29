export declare const GuardianRecoveryModuleAbi: readonly [{
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "AccountAlreadyGuardedByGuardian";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "AccountNotGuardedByAddress";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "CooldownPeriodNotPassed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ExpiredRequest";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "GuardianCannotBeSelf";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "GuardianNotFound";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "GuardianNotProposed";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "chainId";
        readonly type: "uint256";
    }];
    readonly name: "NO_TIMESTAMP_ASSERTER";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "PasskeyNotMatched";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "GuardianAdded";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "GuardianProposed";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "GuardianRemoved";
    readonly type: "event";
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
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedCredentialId";
        readonly type: "bytes32";
    }];
    readonly name: "RecoveryDiscarded";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedCredentialId";
        readonly type: "bytes32";
    }];
    readonly name: "RecoveryFinished";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "hashedCredentialId";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "RecoveryInitiated";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "REQUEST_DELAY_TIME";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "REQUEST_VALIDITY_TIME";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "accountGuardianData";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isReady";
        readonly type: "bool";
    }, {
        readonly internalType: "uint64";
        readonly name: "addedAt";
        readonly type: "uint64";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "accountToGuard";
        readonly type: "address";
    }];
    readonly name: "addValidationKey";
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
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }];
    readonly name: "discardRecovery";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "getPendingRecoveryData";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "hashedCredentialId";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32[2]";
            readonly name: "rawPublicKey";
            readonly type: "bytes32[2]";
        }, {
            readonly internalType: "uint256";
            readonly name: "timestamp";
            readonly type: "uint256";
        }];
        readonly internalType: "struct GuardianRecoveryValidator.RecoveryRequest";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "guardian";
        readonly type: "address";
    }];
    readonly name: "guardianOf";
    readonly outputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "guardiansFor";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "addr";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "isReady";
            readonly type: "bool";
        }, {
            readonly internalType: "uint64";
            readonly name: "addedAt";
            readonly type: "uint64";
        }];
        readonly internalType: "struct GuardianRecoveryValidator.Guardian[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "accountToRecover";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "hashedCredentialId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32[2]";
        readonly name: "rawPublicKey";
        readonly type: "bytes32[2]";
    }, {
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }];
    readonly name: "initRecovery";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract WebAuthValidator";
        readonly name: "_webAuthValidator";
        readonly type: "address";
    }];
    readonly name: "initialize";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onInstall";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "onUninstall";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "pendingRecoveryData";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedCredentialId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "timestamp";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "newGuardian";
        readonly type: "address";
    }];
    readonly name: "proposeValidationKey";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hashedOriginDomain";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "guardianToRemove";
        readonly type: "address";
    }];
    readonly name: "removeValidationKey";
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
    readonly name: "webAuthValidator";
    readonly outputs: readonly [{
        readonly internalType: "contract WebAuthValidator";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=GuardianRecoveryModule.d.ts.map