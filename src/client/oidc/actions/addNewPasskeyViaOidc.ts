import {
  type Account,
  type Address,
  type Chain,
  type Client, encodeFunctionData, type Hex,
  type Prettify, type TransactionReceipt,
  type Transport,
} from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { sendTransaction } from "viem/zksync";

import { WebAuthValidatorAbi } from "../../../abi/index.js";

export type AddNewPasskeyViaOidcArgs = {
  credentialId: Hex;
  passkeyPubKey: [Hex, Hex];
  passkeyDomain: string;
  contracts: {
    recoveryOidc: Address; // oidc recovery module
    passkey: Address;
  };
};

export async function addNewPasskeyViaOidc<
  transport extends Transport,
  chain extends Chain,
  account extends Account,

>(client: Client<transport, chain, account>, args: Prettify<AddNewPasskeyViaOidcArgs>): Promise<TransactionReceipt> {
  const callData = encodeFunctionData({
    abi: WebAuthValidatorAbi,
    functionName: "addValidationKey",
    args: [args.credentialId, args.passkeyPubKey, args.passkeyDomain],
  });

  const sendTransactionArgs = {
    account: client.account,
    to: args.contracts.passkey,
    data: callData,
    gas: 10_000_000n, // TODO: Remove when gas estimation is fixed
    type: "eip712",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const transactionHash = await sendTransaction(client, sendTransactionArgs);

  const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });

  if (transactionReceipt.status !== "success") {
    throw new Error("Add passkey via oidc reverted");
  }

  return transactionReceipt;
}
