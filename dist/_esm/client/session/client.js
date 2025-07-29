import { createClient, createPublicClient, encodeAbiParameters, getAddress, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { zksyncInMemoryNode } from "viem/chains";
import { encodeSessionTx } from "../../utils/encoding.js";
import { toSessionAccount } from "./account.js";
import { getSessionState, sessionStateNotify } from "./actions/session.js";
import { publicActionsRewrite } from "./decorators/publicActionsRewrite.js";
import { zksyncSsoWalletActions } from "./decorators/wallet.js";
export const signSessionTransaction = (args) => {
    return encodeAbiParameters([
        { type: "bytes", name: "sessionKeySignedHash" },
        { type: "address", name: "sessionContract" },
        { type: "bytes", name: "validatorData" },
    ], [
        args.sessionKeySignedHash,
        args.sessionContract,
        encodeSessionTx({
            sessionConfig: args.sessionConfig,
            to: args.to,
            callData: args.callData,
            timestamp: args.timestamp,
        }),
    ]);
};
export function createZksyncSessionClient(_parameters) {
    const parameters = {
        ..._parameters,
        address: getAddress(_parameters.address),
        key: _parameters.key || "zksync-sso-session-wallet",
        name: _parameters.name || "ZKsync SSO Session Client",
    };
    const getInMemoryNodeTimestamp = async () => {
        const publicClient = createPublicClient({ chain: parameters.chain, transport: parameters.transport });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const timestamp = await publicClient.request({ method: "config_getCurrentTimestamp" });
        return BigInt(timestamp);
    };
    const account = toSessionAccount({
        address: parameters.address,
        signTransaction: async ({ hash, to, callData }) => {
            // In Memory Node uses a different timestamp mechanism which isn't equal to actual timestamp
            const timestamp = parameters.chain.id === zksyncInMemoryNode.id
                ? await getInMemoryNodeTimestamp()
                : undefined;
            const sessionKeySigner = privateKeyToAccount(parameters.sessionKey);
            const hashSignature = await sessionKeySigner.sign({ hash });
            return signSessionTransaction({
                sessionKeySignedHash: hashSignature,
                sessionContract: parameters.contracts.session,
                sessionConfig: parameters.sessionConfig,
                to,
                callData,
                timestamp,
            });
        },
    });
    const client = createClient({
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
        .extend(publicActions)
        .extend(publicActionsRewrite)
        .extend(zksyncSsoWalletActions);
    // Check session state on initialization if callback is provided
    if (client.onSessionStateChange) {
        getSessionState(client, {
            account: client.account.address,
            sessionConfig: client.sessionConfig,
            contracts: client.contracts,
        }).then(({ sessionState }) => {
            sessionStateNotify({
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