export declare const SsoAccountAbi: readonly [{
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
        readonly internalType: "uint256";
        readonly name: "actualValue";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "expectedValue";
        readonly type: "uint256";
    }];
    readonly name: "BATCH_MSG_VALUE_MISMATCH";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "FEE_PAYMENT_FAILED";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "hook";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isValidation";
        readonly type: "bool";
    }];
    readonly name: "HOOK_ALREADY_EXISTS";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "hookAddress";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isValidation";
        readonly type: "bool";
    }];
    readonly name: "HOOK_ERC165_FAIL";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "hook";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isValidation";
        readonly type: "bool";
    }];
    readonly name: "HOOK_NOT_FOUND";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "required";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "available";
        readonly type: "uint256";
    }];
    readonly name: "INSUFFICIENT_FUNDS";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "INVALID_ACCOUNT_KEYS";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "METHOD_NOT_IMPLEMENTED";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "notBootloader";
        readonly type: "address";
    }];
    readonly name: "NOT_FROM_BOOTLOADER";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "notSelf";
        readonly type: "address";
    }];
    readonly name: "NOT_FROM_SELF";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "OWNER_ALREADY_EXISTS";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "OWNER_NOT_FOUND";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }];
    readonly name: "VALIDATOR_ALREADY_EXISTS";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }];
    readonly name: "VALIDATOR_ERC165_FAIL";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }];
    readonly name: "VALIDATOR_NOT_FOUND";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "index";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes";
        readonly name: "revertData";
        readonly type: "bytes";
    }];
    readonly name: "BatchCallFailure";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "hook";
        readonly type: "address";
    }];
    readonly name: "HookAdded";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "hook";
        readonly type: "address";
    }];
    readonly name: "HookRemoved";
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
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "K1OwnerAdded";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "K1OwnerRemoved";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }];
    readonly name: "ValidatorAdded";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }];
    readonly name: "ValidatorRemoved";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "hook";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isValidation";
        readonly type: "bool";
    }, {
        readonly internalType: "bytes";
        readonly name: "initData";
        readonly type: "bytes";
    }];
    readonly name: "addHook";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "addK1Owner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "initData";
        readonly type: "bytes";
    }];
    readonly name: "addModuleValidator";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "target";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "allowFailure";
            readonly type: "bool";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "callData";
            readonly type: "bytes";
        }];
        readonly internalType: "struct Call[]";
        readonly name: "_calls";
        readonly type: "tuple[]";
    }];
    readonly name: "batchCall";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
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
        readonly name: "_transaction";
        readonly type: "tuple";
    }];
    readonly name: "executeTransaction";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
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
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly name: "executeTransactionFromOutside";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes[]";
        readonly name: "initialValidators";
        readonly type: "bytes[]";
    }, {
        readonly internalType: "address[]";
        readonly name: "initialK1Owners";
        readonly type: "address[]";
    }];
    readonly name: "initialize";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "isHook";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "isK1Owner";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }];
    readonly name: "isModuleValidator";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "hash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes";
        readonly name: "signature";
        readonly type: "bytes";
    }];
    readonly name: "isValidSignature";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "magicValue";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bool";
        readonly name: "isValidation";
        readonly type: "bool";
    }];
    readonly name: "listHooks";
    readonly outputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "hookList";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "listK1Owners";
    readonly outputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "k1OwnerList";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "listModuleValidators";
    readonly outputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "validatorList";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onERC1155BatchReceived";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onERC1155Received";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onERC721Received";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
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
        readonly name: "_transaction";
        readonly type: "tuple";
    }];
    readonly name: "payForTransaction";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
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
        readonly name: "_transaction";
        readonly type: "tuple";
    }];
    readonly name: "prepareForPaymaster";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "hook";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isValidation";
        readonly type: "bool";
    }, {
        readonly internalType: "bytes";
        readonly name: "deinitData";
        readonly type: "bytes";
    }];
    readonly name: "removeHook";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "addr";
        readonly type: "address";
    }];
    readonly name: "removeK1Owner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "deinitData";
        readonly type: "bytes";
    }];
    readonly name: "removeModuleValidator";
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
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "hook";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "isValidation";
        readonly type: "bool";
    }, {
        readonly internalType: "bytes";
        readonly name: "deinitData";
        readonly type: "bytes";
    }];
    readonly name: "unlinkHook";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "validator";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "deinitData";
        readonly type: "bytes";
    }];
    readonly name: "unlinkModuleValidator";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_suggestedSignedHash";
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
        readonly name: "_transaction";
        readonly type: "tuple";
    }];
    readonly name: "validateTransaction";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "magic";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=SsoAccount.d.ts.map