export { fetchAccount as fetchEcdsaAccount } from "./ecdsa/actions/account.js";
export { deployAccount, fetchAccount, fetchAccount as fetchPasskeyAccount } from "./passkey/actions/account.js";
export * from "./recovery/actions/recovery.js";
export * from "./recovery/client.js";
export * from "./session/client.js";
import { concat, getAddress, keccak256, parseEventLogs, toHex } from "viem";
import { waitForTransactionReceipt, writeContract } from "viem/actions";
import { getGeneralPaymasterInput } from "viem/zksync";
import { AAFactoryAbi } from "../abi/AAFactory.js";
import { encodeModuleData, encodeSession } from "../utils/encoding.js";
import { noThrow } from "../utils/helpers.js";
import { encodePasskeyModuleData } from "./passkey/actions/account.js";
export const deployModularAccount = async (client, // Account deployer (any viem client)
args) => {
    const uniqueIds = [];
    if (args.uniqueAccountId) {
        uniqueIds.push(toHex(args.uniqueAccountId));
    }
    if (args.owners) {
        uniqueIds.push(...args.owners);
    }
    const modules = [];
    if (args.sessionModule) {
        modules.push(encodeModuleData({
            address: args.sessionModule.location,
            parameters: args.sessionModule.initialSession ? encodeSession(args.sessionModule.initialSession) : "0x",
        }));
    }
    if (args.passkeyModule) {
        uniqueIds.push(toHex(args.passkeyModule.credentialId));
        modules.push(await encodePasskeyModuleData(args.passkeyModule));
    }
    if (args.installNoDataModules) {
        args.installNoDataModules.forEach((moduleNoDataInstall) => {
            modules.push(encodeModuleData({
                address: moduleNoDataInstall,
                parameters: "0x",
            }));
        });
    }
    let deployProxyArgs = {
        account: client.account,
        chain: client.chain,
        address: args.accountFactory,
        abi: AAFactoryAbi,
        functionName: "deployProxySsoAccount",
        args: [
            keccak256(toHex(concat(uniqueIds))),
            modules,
            args.owners,
        ],
    };
    if (args.paymaster) {
        deployProxyArgs = {
            ...deployProxyArgs,
            paymaster: args.paymaster.location,
            paymasterInput: args.paymaster.input ?? getGeneralPaymasterInput({ innerInput: "0x" }),
        };
    }
    const transactionHash = await writeContract(client, deployProxyArgs);
    if (args.onTransactionSent) {
        noThrow(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await waitForTransactionReceipt(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("Account deployment transaction reverted");
    const accountCreatedEvent = parseEventLogs({ abi: AAFactoryAbi, logs: transactionReceipt.logs })
        .find((log) => log && log.eventName === "AccountCreated");
    if (!accountCreatedEvent) {
        throw new Error("No contract address in transaction receipt");
    }
    const { accountAddress } = accountCreatedEvent.args;
    return {
        address: getAddress(accountAddress),
        transactionReceipt: transactionReceipt,
    };
};
//# sourceMappingURL=index.js.map