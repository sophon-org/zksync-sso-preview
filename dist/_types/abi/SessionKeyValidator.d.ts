export declare const SessionKeyValidatorAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "ADDRESS_CAST_OVERFLOW";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "input";
        readonly type: "bytes";
    }];
    readonly name: "INVALID_PAYMASTER_INPUT";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "notInitialized";
        readonly type: "address";
    }];
    readonly name: "NOT_FROM_INITIALIZED_ACCOUNT";
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
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "allowance";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "maxAllowance";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint64";
        readonly name: "period";
        readonly type: "uint64";
    }];
    readonly name: "SESSION_ALLOWANCE_EXCEEDED";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "sessionHash";
        readonly type: "bytes32";
    }];
    readonly name: "SESSION_ALREADY_EXISTS";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "target";
        readonly type: "address";
    }, {
        readonly internalType: "bytes4";
        readonly name: "selector";
        readonly type: "bytes4";
    }];
    readonly name: "SESSION_CALL_POLICY_VIOLATED";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "param";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "refValue";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint8";
        readonly name: "condition";
        readonly type: "uint8";
    }];
    readonly name: "SESSION_CONDITION_FAILED";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "expiresAt";
        readonly type: "uint256";
    }];
    readonly name: "SESSION_EXPIRES_TOO_SOON";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "actualLength";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "expectedMinimumLength";
        readonly type: "uint256";
    }];
    readonly name: "SESSION_INVALID_DATA_LENGTH";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "recovered";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "expected";
        readonly type: "address";
    }];
    readonly name: "SESSION_INVALID_SIGNER";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "lifetimeUsage";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "maxUsage";
        readonly type: "uint256";
    }];
    readonly name: "SESSION_LIFETIME_USAGE_EXCEEDED";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "usedValue";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "maxValuePerUse";
        readonly type: "uint256";
    }];
    readonly name: "SESSION_MAX_VALUE_EXCEEDED";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "SESSION_NOT_ACTIVE";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "target";
        readonly type: "address";
    }];
    readonly name: "SESSION_TRANSFER_POLICY_VIOLATED";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "SESSION_UNLIMITED_FEES";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "SESSION_ZERO_SIGNER";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "openSessions";
        readonly type: "uint256";
    }];
    readonly name: "UNINSTALL_WITH_OPEN_SESSIONS";
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
        readonly name: "sessionHash";
        readonly type: "bytes32";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "signer";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiresAt";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum SessionLib.LimitType";
                readonly name: "limitType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "limit";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "period";
                readonly type: "uint256";
            }];
            readonly internalType: "struct SessionLib.UsageLimit";
            readonly name: "feeLimit";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes4";
                readonly name: "selector";
                readonly type: "bytes4";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxValuePerUse";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.LimitType";
                    readonly name: "limitType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "limit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "period";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct SessionLib.UsageLimit";
                readonly name: "valueLimit";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.Condition";
                    readonly name: "condition";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint64";
                    readonly name: "index";
                    readonly type: "uint64";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "refValue";
                    readonly type: "bytes32";
                }, {
                    readonly components: readonly [{
                        readonly internalType: "enum SessionLib.LimitType";
                        readonly name: "limitType";
                        readonly type: "uint8";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "limit";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "period";
                        readonly type: "uint256";
                    }];
                    readonly internalType: "struct SessionLib.UsageLimit";
                    readonly name: "limit";
                    readonly type: "tuple";
                }];
                readonly internalType: "struct SessionLib.Constraint[]";
                readonly name: "constraints";
                readonly type: "tuple[]";
            }];
            readonly internalType: "struct SessionLib.CallSpec[]";
            readonly name: "callPolicies";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxValuePerUse";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.LimitType";
                    readonly name: "limitType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "limit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "period";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct SessionLib.UsageLimit";
                readonly name: "valueLimit";
                readonly type: "tuple";
            }];
            readonly internalType: "struct SessionLib.TransferSpec[]";
            readonly name: "transferPolicies";
            readonly type: "tuple[]";
        }];
        readonly indexed: false;
        readonly internalType: "struct SessionLib.SessionSpec";
        readonly name: "sessionSpec";
        readonly type: "tuple";
    }];
    readonly name: "SessionCreated";
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
        readonly name: "sessionHash";
        readonly type: "bytes32";
    }];
    readonly name: "SessionRevoked";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "signer";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiresAt";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum SessionLib.LimitType";
                readonly name: "limitType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "limit";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "period";
                readonly type: "uint256";
            }];
            readonly internalType: "struct SessionLib.UsageLimit";
            readonly name: "feeLimit";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes4";
                readonly name: "selector";
                readonly type: "bytes4";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxValuePerUse";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.LimitType";
                    readonly name: "limitType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "limit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "period";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct SessionLib.UsageLimit";
                readonly name: "valueLimit";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.Condition";
                    readonly name: "condition";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint64";
                    readonly name: "index";
                    readonly type: "uint64";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "refValue";
                    readonly type: "bytes32";
                }, {
                    readonly components: readonly [{
                        readonly internalType: "enum SessionLib.LimitType";
                        readonly name: "limitType";
                        readonly type: "uint8";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "limit";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "period";
                        readonly type: "uint256";
                    }];
                    readonly internalType: "struct SessionLib.UsageLimit";
                    readonly name: "limit";
                    readonly type: "tuple";
                }];
                readonly internalType: "struct SessionLib.Constraint[]";
                readonly name: "constraints";
                readonly type: "tuple[]";
            }];
            readonly internalType: "struct SessionLib.CallSpec[]";
            readonly name: "callPolicies";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxValuePerUse";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.LimitType";
                    readonly name: "limitType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "limit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "period";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct SessionLib.UsageLimit";
                readonly name: "valueLimit";
                readonly type: "tuple";
            }];
            readonly internalType: "struct SessionLib.TransferSpec[]";
            readonly name: "transferPolicies";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct SessionLib.SessionSpec";
        readonly name: "sessionSpec";
        readonly type: "tuple";
    }];
    readonly name: "createSession";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "smartAccount";
        readonly type: "address";
    }];
    readonly name: "isInitialized";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
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
        readonly internalType: "bytes32";
        readonly name: "sessionHash";
        readonly type: "bytes32";
    }];
    readonly name: "revokeKey";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32[]";
        readonly name: "sessionHashes";
        readonly type: "bytes32[]";
    }];
    readonly name: "revokeKeys";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "signer";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiresAt";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum SessionLib.LimitType";
                readonly name: "limitType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "limit";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "period";
                readonly type: "uint256";
            }];
            readonly internalType: "struct SessionLib.UsageLimit";
            readonly name: "feeLimit";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes4";
                readonly name: "selector";
                readonly type: "bytes4";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxValuePerUse";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.LimitType";
                    readonly name: "limitType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "limit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "period";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct SessionLib.UsageLimit";
                readonly name: "valueLimit";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.Condition";
                    readonly name: "condition";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint64";
                    readonly name: "index";
                    readonly type: "uint64";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "refValue";
                    readonly type: "bytes32";
                }, {
                    readonly components: readonly [{
                        readonly internalType: "enum SessionLib.LimitType";
                        readonly name: "limitType";
                        readonly type: "uint8";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "limit";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "period";
                        readonly type: "uint256";
                    }];
                    readonly internalType: "struct SessionLib.UsageLimit";
                    readonly name: "limit";
                    readonly type: "tuple";
                }];
                readonly internalType: "struct SessionLib.Constraint[]";
                readonly name: "constraints";
                readonly type: "tuple[]";
            }];
            readonly internalType: "struct SessionLib.CallSpec[]";
            readonly name: "callPolicies";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxValuePerUse";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum SessionLib.LimitType";
                    readonly name: "limitType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "limit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "period";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct SessionLib.UsageLimit";
                readonly name: "valueLimit";
                readonly type: "tuple";
            }];
            readonly internalType: "struct SessionLib.TransferSpec[]";
            readonly name: "transferPolicies";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct SessionLib.SessionSpec";
        readonly name: "spec";
        readonly type: "tuple";
    }];
    readonly name: "sessionState";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "enum SessionLib.Status";
            readonly name: "status";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "feesRemaining";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "remaining";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes4";
                readonly name: "selector";
                readonly type: "bytes4";
            }, {
                readonly internalType: "uint256";
                readonly name: "index";
                readonly type: "uint256";
            }];
            readonly internalType: "struct SessionLib.LimitState[]";
            readonly name: "transferValue";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "remaining";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes4";
                readonly name: "selector";
                readonly type: "bytes4";
            }, {
                readonly internalType: "uint256";
                readonly name: "index";
                readonly type: "uint256";
            }];
            readonly internalType: "struct SessionLib.LimitState[]";
            readonly name: "callValue";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "remaining";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes4";
                readonly name: "selector";
                readonly type: "bytes4";
            }, {
                readonly internalType: "uint256";
                readonly name: "index";
                readonly type: "uint256";
            }];
            readonly internalType: "struct SessionLib.LimitState[]";
            readonly name: "callParams";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct SessionLib.SessionState";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "sessionHash";
        readonly type: "bytes32";
    }];
    readonly name: "sessionStatus";
    readonly outputs: readonly [{
        readonly internalType: "enum SessionLib.Status";
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
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
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
//# sourceMappingURL=SessionKeyValidator.d.ts.map