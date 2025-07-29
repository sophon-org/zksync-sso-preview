"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signSessionTransaction = void 0;
exports.createZksyncSessionClient = createZksyncSessionClient;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const encoding_js_1 = require("../../utils/encoding.js");
const account_js_1 = require("./account.js");
const session_js_1 = require("./actions/session.js");
const publicActionsRewrite_js_1 = require("./decorators/publicActionsRewrite.js");
const wallet_js_1 = require("./decorators/wallet.js");
const signSessionTransaction = (args) => {
    return (0, viem_1.encodeAbiParameters)([
        { type: "bytes", name: "sessionKeySignedHash" },
        { type: "address", name: "sessionContract" },
        { type: "bytes", name: "validatorData" },
    ], [
        args.sessionKeySignedHash,
        args.sessionContract,
        (0, encoding_js_1.encodeSessionTx)({
            sessionConfig: args.sessionConfig,
            to: args.to,
            callData: args.callData,
            timestamp: args.timestamp,
        }),
    ]);
};
exports.signSessionTransaction = signSessionTransaction;
function createZksyncSessionClient(_parameters) {
    const parameters = {
        ..._parameters,
        address: (0, viem_1.getAddress)(_parameters.address),
        key: _parameters.key || "zksync-sso-session-wallet",
        name: _parameters.name || "ZKsync SSO Session Client",
    };
    const getInMemoryNodeTimestamp = async () => {
        const publicClient = (0, viem_1.createPublicClient)({ chain: parameters.chain, transport: parameters.transport });
        const timestamp = await publicClient.request({ method: "config_getCurrentTimestamp" });
        return BigInt(timestamp);
    };
    const account = (0, account_js_1.toSessionAccount)({
        address: parameters.address,
        signTransaction: async ({ hash, to, callData }) => {
            const timestamp = parameters.chain.id === chains_1.zksyncInMemoryNode.id
                ? await getInMemoryNodeTimestamp()
                : undefined;
            const sessionKeySigner = (0, accounts_1.privateKeyToAccount)(parameters.sessionKey);
            const hashSignature = await sessionKeySigner.sign({ hash });
            return (0, exports.signSessionTransaction)({
                sessionKeySignedHash: hashSignature,
                sessionContract: parameters.contracts.session,
                sessionConfig: parameters.sessionConfig,
                to,
                callData,
                timestamp,
            });
        },
    });
    const client = (0, viem_1.createClient)({
        ...parameters,
        account,
        type: "walletClient",
    })
        .extend(() => ({
        sessionKey: parameters.sessionKey,
        sessionConfig: parameters.sessionConfig,
        contracts: parameters.contracts,
        paymasterHandler: parameters.paymasterHandler,
        onSessionStateChange: parameters.onSessionStateChange,
        _sessionNotifyTimeout: undefined,
    }))
        .extend(viem_1.publicActions)
        .extend(publicActionsRewrite_js_1.publicActionsRewrite)
        .extend(wallet_js_1.zksyncSsoWalletActions);
    if (client.onSessionStateChange) {
        (0, session_js_1.getSessionState)(client, {
            account: client.account.address,
            sessionConfig: client.sessionConfig,
            contracts: client.contracts,
        }).then(({ sessionState }) => {
            (0, session_js_1.sessionStateNotify)({
                sessionConfig: client.sessionConfig,
                sessionState,
                onSessionStateChange: client.onSessionStateChange,
                sessionNotifyTimeout: client._sessionNotifyTimeout,
            });
        }).catch((error) => {
            console.error("Failed to get session state on initialization:", error);
        });
    }
    return client;
}
//# sourceMappingURL=client.js.map