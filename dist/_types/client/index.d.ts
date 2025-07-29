export { fetchAccount as fetchEcdsaAccount } from "./ecdsa/actions/account.js";
export { deployAccount, fetchAccount, fetchAccount as fetchPasskeyAccount } from "./passkey/actions/account.js";
export * from "./recovery/actions/recovery.js";
export * from "./recovery/client.js";
export * from "./session/client.js";
import type { Account, Address, Chain, Client, Hash, Hex, Prettify, TransactionReceipt, Transport } from "viem";
import type { SessionConfig } from "../utils/session.js";
import { type DeployAccountPasskeyArgs } from "./passkey/actions/account.js";
export type DeployAccountPaymasterArgs = {
    location: Address;
    input?: Hex;
};
export type DeployAccountSessionArgs = {
    location: Address;
    initialSession?: SessionConfig;
};
export type DeployAccountArgs = {
    accountFactory: Address;
    installNoDataModules: Address[];
    owners: Address[];
    sessionModule?: DeployAccountSessionArgs;
    paymaster?: DeployAccountPaymasterArgs;
    passkeyModule?: DeployAccountPasskeyArgs;
    uniqueAccountId?: string;
    onTransactionSent?: (hash: Hash) => void;
};
export type DeployAccountReturnType = {
    address: Address;
    transactionReceipt: TransactionReceipt;
};
export declare const deployModularAccount: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: Prettify<DeployAccountArgs>) => Promise<DeployAccountReturnType>;
//# sourceMappingURL=index.d.ts.map