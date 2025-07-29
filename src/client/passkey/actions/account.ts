import { type Account, type Address, type Chain, type Client, getAddress, type Hash, type Hex, keccak256, parseEventLogs, type Prettify, toHex, type TransactionReceipt, type Transport } from "viem";
import { readContract, waitForTransactionReceipt, writeContract } from "viem/actions";
import { getGeneralPaymasterInput } from "viem/zksync";

import { AAFactoryAbi } from "../../../abi/AAFactory.js";
import { WebAuthValidatorAbi } from "../../../abi/WebAuthValidator.js";
import { encodeModuleData, encodePasskeyModuleParameters, encodeSession } from "../../../utils/encoding.js";
import { noThrow } from "../../../utils/helpers.js";
import { base64UrlToUint8Array, getPasskeySignatureFromPublicKeyBytes, getPublicKeyBytesFromPasskeySignature } from "../../../utils/passkey.js";
import type { SessionConfig } from "../../../utils/session.js";

export type DeployAccountPasskeyArgs = {
  location: Address; // module address
  credentialId: string; // Unique id of the passkey public key (base64)
  credentialPublicKey: Uint8Array; // Public key of the previously registered
  expectedOrigin?: string; // Expected origin of the passkey
};
export const encodePasskeyModuleData = async (
  args: DeployAccountPasskeyArgs,
): Promise<Hash> => {
  let origin: string | undefined = args.expectedOrigin;
  if (!origin) {
    try {
      origin = window.location.origin;
    } catch {
      throw new Error("Can't identify expectedOrigin, please provide it manually");
    }
  }
  const passkeyPublicKey = getPublicKeyBytesFromPasskeySignature(args.credentialPublicKey);
  const encodedPasskeyParameters = encodePasskeyModuleParameters({
    credentialId: args.credentialId,
    passkeyPublicKey,
    expectedOrigin: origin,
  });
  return encodeModuleData({
    address: args.location,
    parameters: encodedPasskeyParameters,
  });
};

/* TODO: try to get rid of most of the contract params like passkey, session */
/* it should come from factory, not passed manually each time */
export type DeployAccountArgs = {
  credentialId: string; // Unique id of the passkey public key (base64)
  credentialPublicKey: Uint8Array; // Public key of the previously registered
  paymasterAddress?: Address; // Paymaster used to pay the fees of creating accounts
  paymasterInput?: Hex; // Input for paymaster (if provided)
  expectedOrigin?: string; // Expected origin of the passkey
  uniqueAccountId?: string; // Unique account ID, can be omitted if you don't need it
  contracts: {
    accountFactory: Address;
    passkey: Address;
    session: Address;
    recovery: Address;
    recoveryOidc: Address;
  };
  initialSession?: SessionConfig;
  onTransactionSent?: (hash: Hash) => void;
};
export type DeployAccountReturnType = {
  address: Address;
  transactionReceipt: TransactionReceipt;
};
export type FetchAccountArgs = {
  uniqueAccountId?: string; // Unique account ID, can be omitted if you don't need it
  expectedOrigin?: string; // Expected origin of the passkey
  contracts: {
    accountFactory: Address;
    passkey: Address;
    session: Address;
    recovery: Address;
  };
};
export type FetchAccountReturnType = {
  username: string;
  address: Address;
  passkeyPublicKey: Uint8Array;
};

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export const deployAccount = async <
  transport extends Transport,
  chain extends Chain,
  account extends Account,
>(
  client: Client<transport, chain, account>, // Account deployer (any viem client)
  args: Prettify<DeployAccountArgs>,
): Promise<DeployAccountReturnType> => {
  let origin: string | undefined = args.expectedOrigin;
  if (!origin) {
    try {
      origin = window.location.origin;
    } catch {
      throw new Error("Can't identify expectedOrigin, please provide it manually");
    }
  }

  const passkeyPublicKey = getPublicKeyBytesFromPasskeySignature(args.credentialPublicKey);
  const encodedPasskeyParameters = encodePasskeyModuleParameters({
    credentialId: args.credentialId,
    passkeyPublicKey,
    expectedOrigin: origin,
  });
  const encodedPasskeyModuleData = encodeModuleData({
    address: args.contracts.passkey,
    parameters: encodedPasskeyParameters,
  });
  const accountId = args.uniqueAccountId || encodedPasskeyParameters;

  const encodedSessionKeyModuleData = encodeModuleData({
    address: args.contracts.session,
    parameters: args.initialSession ? encodeSession(args.initialSession) : "0x",
  });

  const encodedGuardianRecoveryModuleData = encodeModuleData({
    address: args.contracts.recovery,
    parameters: "0x",
  });

  const encodedOidcRecoveryModuleData = encodeModuleData({
    address: args.contracts.recoveryOidc,
    parameters: "0x",
  });

  let deployProxyArgs = {
    account: client.account!,
    chain: client.chain!,
    address: args.contracts.accountFactory,
    abi: AAFactoryAbi,
    functionName: "deployProxySsoAccount",
    args: [
      keccak256(toHex(accountId)),
      [encodedPasskeyModuleData, encodedSessionKeyModuleData, encodedGuardianRecoveryModuleData, encodedOidcRecoveryModuleData],
      [],
    ],
  } as any;

  if (args.paymasterAddress) {
    deployProxyArgs = {
      ...deployProxyArgs,
      paymaster: args.paymasterAddress,
      paymasterInput: args.paymasterInput ?? getGeneralPaymasterInput({ innerInput: "0x" }),
    };
  }

  const transactionHash = await writeContract(client, deployProxyArgs);
  if (args.onTransactionSent) {
    noThrow(() => args.onTransactionSent?.(transactionHash));
  }

  const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
  if (transactionReceipt.status !== "success") throw new Error("Account deployment transaction reverted");
  const getAccountId = () => {
    if (transactionReceipt.contractAddress) {
      return transactionReceipt.contractAddress;
    }
    const accountCreatedEvent = parseEventLogs({ abi: AAFactoryAbi, logs: transactionReceipt.logs })
      .find((log) => log && log.eventName === "AccountCreated");

    if (!accountCreatedEvent) {
      throw new Error("No contract address in transaction receipt");
    }

    const { accountAddress } = accountCreatedEvent.args;
    return accountAddress;
  };

  const accountAddress = getAccountId();

  return {
    address: getAddress(accountAddress),
    transactionReceipt: transactionReceipt,
  };
};

export const fetchAccount = async <
  transport extends Transport,
  chain extends Chain,
  account extends Account,
>(
  client: Client<transport, chain, account>, // Account deployer (any viem client)
  args: Prettify<FetchAccountArgs>,
): Promise<FetchAccountReturnType> => {
  let origin: string | undefined = args.expectedOrigin;
  if (!origin) {
    try {
      origin = window.location.origin;
    } catch {
      throw new Error("Can't identify expectedOrigin, please provide it manually");
    }
  }

  if (!args.contracts.passkey) throw new Error("Passkey module address is not set");

  let username: string | undefined = args.uniqueAccountId;
  if (!username) {
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          userVerification: "discouraged",
        },
      }) as PublicKeyCredential | null;

      if (!credential) throw new Error("No registered passkeys");
      username = credential.id;
    } catch {
      throw new Error("Unable to retrieve passkey");
    }
  }

  if (!username) throw new Error("No account found");

  const credentialId = toHex(base64UrlToUint8Array(username));
  const accountAddress = await readContract(client, {
    abi: WebAuthValidatorAbi,
    address: args.contracts.passkey,
    functionName: "registeredAddress",
    args: [origin, credentialId],
  });

  if (!accountAddress || accountAddress == NULL_ADDRESS) throw new Error(`No account found for username: ${username}`);

  const publicKey = await readContract(client, {
    abi: WebAuthValidatorAbi,
    address: args.contracts.passkey,
    functionName: "getAccountKey",
    args: [origin, credentialId, accountAddress],
  });

  if (!publicKey || !publicKey[0] || !publicKey[1]) throw new Error(`Passkey credentials not found in on-chain module for passkey ${username}`);

  const passkeyPublicKey = getPasskeySignatureFromPublicKeyBytes(publicKey);

  return {
    username,
    address: accountAddress,
    passkeyPublicKey,
  };
};
