import { type Account, type AssertRequestErrorType, type Chain, type Client, type ExactPartial, type PublicActions, type RpcSchema, type SendTransactionRequest, type Transport, type WalletActions } from "viem";
import { type ChainEIP712, type SendEip712TransactionParameters, type SendEip712TransactionReturnType, type SendTransactionParameters, zksync } from "viem/zksync";
import { type InvalidEip712TransactionErrorType } from "../../utils/assertEip712Transaction.js";
/**
 * Creates, signs, and sends a new EIP712 transaction to the network.
 *
 * @param client - Client to use
 * @param parameters - {@link SendEip712TransactionParameters}
 * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. {@link SendTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { zksync } from 'viem/chains'
 * import { sendEip712Transaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   chain: zksync,
 *   transport: custom(window.ethereum),
 * })
 * const hash = await sendEip712Transaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { zksync } from 'viem/chains'
 * import { sendEip712Transaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: zksync,
 *   transport: http(),
 * })
 *
 * const hash = await sendEip712Transaction(client, {
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 */
export declare function sendEip712Transaction<chain extends ChainEIP712 | undefined, account extends Account | undefined, const request extends SendTransactionRequest<chain, chainOverride>, chainOverride extends ChainEIP712 | undefined = undefined>(client: Client<Transport, chain, account>, parameters: SendEip712TransactionParameters<chain, account, chainOverride, request>): Promise<SendEip712TransactionReturnType>;
/**
 * Retrieves and returns an action from the client (if exists), and falls
 * back to the tree-shakable action.
 *
 * Useful for extracting overridden actions from a client (ie. if a consumer
 * wants to override the `sendTransaction` implementation).
 */
export declare function getAction<transport extends Transport, chain extends Chain | undefined, account extends Account | undefined, rpcSchema extends RpcSchema | undefined, extended extends {
    [key: string]: unknown;
}, client extends Client<transport, chain, account, rpcSchema, extended>, parameters, returnType>(client: client, actionFn: (_: any, parameters: parameters) => returnType, name: keyof PublicActions | keyof WalletActions | (string & {})): (parameters: parameters) => returnType;
type AssertEip712RequestParameters = ExactPartial<SendTransactionParameters<typeof zksync>>;
/** @internal */
export type AssertEip712RequestErrorType = InvalidEip712TransactionErrorType | AssertRequestErrorType;
export declare function assertEip712Request(args: AssertEip712RequestParameters): void;
export {};
//# sourceMappingURL=sendEip712Transaction.d.ts.map