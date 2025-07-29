"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAccount = exports.deployAccount = void 0;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const AAFactory_js_1 = require("../../../abi/AAFactory.js");
const encoding_js_1 = require("../../../utils/encoding.js");
const helpers_js_1 = require("../../../utils/helpers.js");
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
const deployAccount = async (client, args) => {
    if (!args.salt) {
        args.salt = crypto.getRandomValues(new Uint8Array(32));
    }
    if (args.prefix && args.prefix.length > 12)
        throw new Error("prefix must not be longer than 12");
    const uniqueId = (0, viem_1.concat)([(0, viem_1.toHex)(args.prefix || "", { size: 12 }), args.owner]);
    const encodedSessionKeyModuleData = (0, encoding_js_1.encodeModuleData)({
        address: args.contracts.session,
        parameters: args.initialSession ? (0, encoding_js_1.encodeSession)(args.initialSession) : "0x",
    });
    let deployProxyArgs = {
        account: client.account,
        chain: client.chain,
        address: args.contracts.accountFactory,
        abi: AAFactory_js_1.AAFactoryAbi,
        functionName: "deployProxySsoAccount",
        args: [
            uniqueId,
            [encodedSessionKeyModuleData],
            [args.owner],
        ],
    };
    if (args.paymaster) {
        deployProxyArgs = {
            ...deployProxyArgs,
            paymaster: args.paymaster.address,
            paymasterInput: args.paymaster.paymasterInput ?? (0, zksync_1.getGeneralPaymasterInput)({ innerInput: "0x" }),
        };
    }
    const transactionHash = await (0, actions_1.writeContract)(client, deployProxyArgs);
    if (args.onTransactionSent) {
        (0, helpers_js_1.noThrow)(() => args.onTransactionSent?.(transactionHash));
    }
    const transactionReceipt = await (0, actions_1.waitForTransactionReceipt)(client, { hash: transactionHash });
    if (transactionReceipt.status !== "success")
        throw new Error("Account deployment transaction reverted");
    const accountCreatedEvent = (0, viem_1.parseEventLogs)({ abi: AAFactory_js_1.AAFactoryAbi, logs: transactionReceipt.logs })
        .find((log) => log && log.eventName === "AccountCreated");
    if (!accountCreatedEvent) {
        throw new Error("No contract address in transaction receipt");
    }
    const { accountAddress } = accountCreatedEvent.args;
    return {
        address: (0, viem_1.getAddress)(accountAddress),
        transactionReceipt: transactionReceipt,
    };
};
exports.deployAccount = deployAccount;
const fetchAccount = async (client, args) => {
    if (!args.contracts.accountFactory)
        throw new Error("Account factory address is not set");
    if (args.prefix && args.prefix.length > 12)
        throw new Error("prefix must not be longer than 12");
    const uniqueId = (0, viem_1.concat)([(0, viem_1.toHex)(args.prefix || "", { size: 12 }), args.owner]);
    const accountId = (0, viem_1.keccak256)((0, viem_1.encodePacked)(["bytes32", "address"], [uniqueId, client.account.address]));
    if (!accountId)
        throw new Error("No account ID provided");
    const accountAddress = await (0, actions_1.readContract)(client, {
        abi: AAFactory_js_1.AAFactoryAbi,
        address: args.contracts.accountFactory,
        functionName: "accountMappings",
        args: [accountId],
    });
    if (!accountAddress || accountAddress == NULL_ADDRESS)
        throw new Error(`No account found for ID: ${accountId}`);
    return {
        address: accountAddress,
        owner: args.owner,
    };
};
exports.fetchAccount = fetchAccount;
//# sourceMappingURL=account.js.map