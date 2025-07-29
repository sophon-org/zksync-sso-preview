"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployModularAccount = exports.fetchPasskeyAccount = exports.fetchAccount = exports.deployAccount = exports.fetchEcdsaAccount = void 0;
var account_js_1 = require("./ecdsa/actions/account.js");
Object.defineProperty(exports, "fetchEcdsaAccount", { enumerable: true, get: function () { return account_js_1.fetchAccount; } });
var account_js_2 = require("./passkey/actions/account.js");
Object.defineProperty(exports, "deployAccount", { enumerable: true, get: function () { return account_js_2.deployAccount; } });
Object.defineProperty(exports, "fetchAccount", { enumerable: true, get: function () { return account_js_2.fetchAccount; } });
Object.defineProperty(exports, "fetchPasskeyAccount", { enumerable: true, get: function () { return account_js_2.fetchAccount; } });
__exportStar(require("./recovery/actions/recovery.js"), exports);
__exportStar(require("./recovery/client.js"), exports);
__exportStar(require("./session/client.js"), exports);
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const AAFactory_js_1 = require("../abi/AAFactory.js");
const encoding_js_1 = require("../utils/encoding.js");
const helpers_js_1 = require("../utils/helpers.js");
const account_js_3 = require("./passkey/actions/account.js");
const deployModularAccount = async (client, args) => {
    const uniqueIds = [];
    if (args.uniqueAccountId) {
        uniqueIds.push((0, viem_1.toHex)(args.uniqueAccountId));
    }
    if (args.owners) {
        uniqueIds.push(...args.owners);
    }
    const modules = [];
    if (args.sessionModule) {
        modules.push((0, encoding_js_1.encodeModuleData)({
            address: args.sessionModule.location,
            parameters: args.sessionModule.initialSession ? (0, encoding_js_1.encodeSession)(args.sessionModule.initialSession) : "0x",
        }));
    }
    if (args.passkeyModule) {
        uniqueIds.push((0, viem_1.toHex)(args.passkeyModule.credentialId));
        modules.push(await (0, account_js_3.encodePasskeyModuleData)(args.passkeyModule));
    }
    if (args.installNoDataModules) {
        args.installNoDataModules.forEach((moduleNoDataInstall) => {
            modules.push((0, encoding_js_1.encodeModuleData)({
                address: moduleNoDataInstall,
                parameters: "0x",
            }));
        });
    }
    let deployProxyArgs = {
        account: client.account,
        chain: client.chain,
        address: args.accountFactory,
        abi: AAFactory_js_1.AAFactoryAbi,
        functionName: "deployProxySsoAccount",
        args: [
            (0, viem_1.keccak256)((0, viem_1.toHex)((0, viem_1.concat)(uniqueIds))),
            modules,
            args.owners,
        ],
    };
    if (args.paymaster) {
        deployProxyArgs = {
            ...deployProxyArgs,
            paymaster: args.paymaster.location,
            paymasterInput: args.paymaster.input ?? (0, zksync_1.getGeneralPaymasterInput)({ innerInput: "0x" }),
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
exports.deployModularAccount = deployModularAccount;
//# sourceMappingURL=index.js.map