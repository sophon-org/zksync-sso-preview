"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksyncSsoWalletActions = zksyncSsoWalletActions;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const zksync_1 = require("viem/zksync");
const index_js_1 = require("../../../paymaster/index.js");
const session_js_1 = require("../../../utils/session.js");
const sendEip712Transaction_js_1 = require("../actions/sendEip712Transaction.js");
const session_js_2 = require("../actions/session.js");
const sessionErrorToSessionEventType = {
    [session_js_1.SessionErrorType.SessionInactive]: session_js_1.SessionEventType.Inactive,
    [session_js_1.SessionErrorType.SessionExpired]: session_js_1.SessionEventType.Expired,
};
async function getSessionStateAndNotify(client) {
    const { sessionState } = await (0, session_js_2.getSessionState)(client, {
        account: client.account.address,
        sessionConfig: client.sessionConfig,
        contracts: client.contracts,
    });
    if (client.onSessionStateChange) {
        (0, session_js_2.sessionStateNotify)({
            sessionConfig: client.sessionConfig,
            sessionState,
            onSessionStateChange: client.onSessionStateChange,
            sessionNotifyTimeout: client._sessionNotifyTimeout,
        });
    }
    return sessionState;
}
function zksyncSsoWalletActions(client) {
    return {
        deployContract: (args) => (0, actions_1.deployContract)(client, args),
        getAddresses: () => (0, actions_1.getAddresses)(client),
        getChainId: () => (0, actions_1.getChainId)(client),
        sendRawTransaction: (args) => (0, actions_1.sendRawTransaction)(client, args),
        sendTransaction: async (args) => {
            const unformattedTx = Object.assign({}, args);
            if ("eip712Meta" in unformattedTx) {
                const eip712Meta = unformattedTx.eip712Meta;
                unformattedTx.gasPerPubdata = eip712Meta.gasPerPubdata ? BigInt(eip712Meta.gasPerPubdata) : undefined;
                unformattedTx.factoryDeps = eip712Meta.factoryDeps;
                unformattedTx.customSignature = eip712Meta.customSignature;
                unformattedTx.paymaster = eip712Meta.paymasterParams?.paymaster;
                unformattedTx.paymasterInput = eip712Meta.paymasterParams?.paymasterInput ? (0, viem_1.bytesToHex)(new Uint8Array(eip712Meta.paymasterParams?.paymasterInput)) : undefined;
                delete unformattedTx.eip712Meta;
            }
            const { chainId: _, ...unformattedTxWithPaymaster } = await (0, index_js_1.getTransactionWithPaymasterData)(client.chain.id, client.account.address, unformattedTx, client.paymasterHandler);
            const formatters = client.chain?.formatters;
            const format = formatters?.transaction?.format || viem_1.formatTransaction;
            const tx = {
                ...format(unformattedTxWithPaymaster),
                type: "eip712",
            };
            if (client.skipPreTransactionStateValidation !== true) {
                const sessionState = await getSessionStateAndNotify(client);
                const validationResult = (0, session_js_1.validateSessionTransaction)({
                    sessionState,
                    sessionConfig: client.sessionConfig,
                    transaction: tx,
                });
                if (validationResult.error) {
                    if (client.onSessionStateChange && Object.keys(sessionErrorToSessionEventType).includes(validationResult.error.type)) {
                        client.onSessionStateChange({
                            type: sessionErrorToSessionEventType[validationResult.error.type],
                            message: validationResult.error.message,
                        });
                    }
                    throw new Error(`Session validation failed: ${validationResult.error.message} (${validationResult.error.type})`);
                }
            }
            return await (0, sendEip712Transaction_js_1.sendEip712Transaction)(client, tx);
        },
        signMessage: (args) => (0, actions_1.signMessage)(client, args),
        signTransaction: async (args) => {
            const { chainId: _, ...unformattedTxWithPaymaster } = await (0, index_js_1.getTransactionWithPaymasterData)(client.chain.id, client.account.address, args, client.paymasterHandler);
            return (0, zksync_1.signTransaction)(client, {
                ...args,
                unformattedTxWithPaymaster,
            });
        },
        signTypedData: (args) => (0, actions_1.signTypedData)(client, args),
        writeContract: (args) => (0, actions_1.writeContract)(client, args),
        signAuthorization: (args) => (0, actions_1.signAuthorization)(client, args),
        getCallsStatus: (args) => (0, actions_1.getCallsStatus)(client, args),
        getCapabilities: (args) => (0, actions_1.getCapabilities)(client, args),
        prepareAuthorization: (args) => (0, actions_1.prepareAuthorization)(client, args),
        sendCalls: (args) => (0, actions_1.sendCalls)(client, args),
        showCallsStatus: (args) => (0, actions_1.showCallsStatus)(client, args),
        waitForCallsStatus: (args) => (0, actions_1.waitForCallsStatus)(client, args),
    };
}
//# sourceMappingURL=wallet.js.map