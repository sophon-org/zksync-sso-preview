export const OidcKeyRegistryAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
    ],
    name: "EvenRsaModulus",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "expectedIssHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "actualIssHash",
        type: "bytes32",
      },
    ],
    name: "IssuerHashMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "KeyCountLimitExceeded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "KeyIdCannotBeZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "issHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
    ],
    name: "KeyNotFound",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "issHash",
        type: "bytes32",
      },
    ],
    name: "KidAlreadyRegistered",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
    ],
    name: "ModulusCannotBeZero",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "chunkIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "chunkValue",
        type: "uint256",
      },
    ],
    name: "ModulusChunkTooLarge",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "issHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256[17]",
        name: "n",
        type: "uint256[17]",
      },
    ],
    name: "KeyAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "issHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
    ],
    name: "KeyDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "CIRCOM_BIGINT_CHUNKS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CIRCOM_BIGINT_CHUNK_SIZE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_KEYS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "issHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "kid",
            type: "bytes32",
          },
          {
            internalType: "uint256[17]",
            name: "rsaModulus",
            type: "uint256[17]",
          },
        ],
        internalType: "struct IOidcKeyRegistry.Key",
        name: "newKey",
        type: "tuple",
      },
    ],
    name: "addKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "issHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "kid",
            type: "bytes32",
          },
          {
            internalType: "uint256[17]",
            name: "rsaModulus",
            type: "uint256[17]",
          },
        ],
        internalType: "struct IOidcKeyRegistry.Key[]",
        name: "newKeys",
        type: "tuple[]",
      },
    ],
    name: "addKeys",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "issHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
    ],
    name: "deleteKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "issHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "kid",
        type: "bytes32",
      },
    ],
    name: "getKey",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "issHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "kid",
            type: "bytes32",
          },
          {
            internalType: "uint256[17]",
            name: "rsaModulus",
            type: "uint256[17]",
          },
        ],
        internalType: "struct IOidcKeyRegistry.Key",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "issHash",
        type: "bytes32",
      },
    ],
    name: "getKeys",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "issHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "kid",
            type: "bytes32",
          },
          {
            internalType: "uint256[17]",
            name: "rsaModulus",
            type: "uint256[17]",
          },
        ],
        internalType: "struct IOidcKeyRegistry.Key[8]",
        name: "",
        type: "tuple[8]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "iss",
        type: "string",
      },
    ],
    name: "hashIssuer",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
