export declare const WebAuthValidatorAbi: readonly [{
    readonly inputs: readonly [];
    readonly name: "ACCOUNT_EXISTS";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "BAD_CREDENTIAL_ID_LENGTH";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "BAD_DOMAIN_LENGTH";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "EMPTY_KEY";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "KEY_EXISTS";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "NOT_KEY_OWNER";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "keyOwner";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "originDomain";
        readonly type: "string";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes";
        readonly name: "credentialId";
        readonly type: "bytes";
    }];
    readonly name: "PasskeyCreated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "keyOwner";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "originDomain";
        readonly type: "string";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes";
        readonly name: "credentialId";
        readonly type: "bytes";
    }];
    readonly name: "PasskeyRemoved";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "credentialId";
        readonly type: "bytes";
    }, {
        readonly internalType: "bytes32[2]";
        readonly name: "rawPublicKey";
        readonly type: "bytes32[2]";
    }, {
        readonly internalType: "string";
        readonly name: "originDomain";
        readonly type: "string";
    }];
    readonly name: "addValidationKey";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "originDomain";
        readonly type: "string";
    }, {
        readonly internalType: "bytes";
        readonly name: "credentialId";
        readonly type: "bytes";
    }, {
        readonly internalType: "address";
        readonly name: "accountAddress";
        readonly type: "address";
    }];
    readonly name: "getAccountKey";
    readonly outputs: readonly [{
        readonly internalType: "bytes32[2]";
        readonly name: "";
        readonly type: "bytes32[2]";
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
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "onUninstall";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "originDomain";
        readonly type: "string";
    }, {
        readonly internalType: "bytes";
        readonly name: "credentialId";
        readonly type: "bytes";
    }];
    readonly name: "registeredAddress";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "accountAddress";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "credentialId";
        readonly type: "bytes";
    }, {
        readonly internalType: "string";
        readonly name: "domain";
        readonly type: "string";
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
        readonly name: "signedHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes";
        readonly name: "signature";
        readonly type: "bytes";
    }];
    readonly name: "validateSignature";
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
        readonly name: "signedHash";
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
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=WebAuthValidator.d.ts.map