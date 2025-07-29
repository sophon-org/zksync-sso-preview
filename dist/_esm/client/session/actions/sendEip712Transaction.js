import { assertRequest } from "viem";
import { parseAccount } from "viem/accounts";
import { prepareTransactionRequest, sendRawTransaction } from "viem/actions";
import { zksync } from "viem/zksync";
import { InvalidEip712TransactionError } from "../../utils/assertEip712Transaction.js";
import { isEIP712Transaction } from "../../utils/isEip712Transaction.js";
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
export async function sendEip712Transaction(client, parameters) {
    const { account: account_ = client.account, chain = client.chain, ...rest } = parameters;
    if (!account_)
        throw new Error("Account not found.");
    const account = parseAccount(account_);
    assertEip712Request(parameters);
    const request = await getAction(client, prepareTransactionRequest, "prepareTransactionRequest")({
        account,
        chain,
        nonceManager: account.nonceManager,
        ...rest,
    });
    const serializer = chain?.serializers?.transaction;
    const serializedTransaction = (await account.signTransaction(request, {
        serializer,
    }));
    return await getAction(client, sendRawTransaction, "sendRawTransaction")({
        serializedTransaction,
    });
}
/**
 * Retrieves and returns an action from the client (if exists), and falls
 * back to the tree-shakable action.
 *
 * Useful for extracting overridden actions from a client (ie. if a consumer
 * wants to override the `sendTransaction` implementation).
 */
export function getAction(client, actionFn, 
// cspell:ignore minifiers
// Some minifiers drop `Function.prototype.name`, or replace it with short letters,
// meaning that `actionFn.name` will not always work. For that case, the consumer
// needs to pass the name explicitly.
name) {
    const action_implicit = client[actionFn.name];
    if (typeof action_implicit === "function")
        return action_implicit;
    const action_explicit = client[name];
    if (typeof action_explicit === "function")
        return action_explicit;
    return (params) => actionFn(client, params);
}
export function assertEip712Request(args) {
    if (!isEIP712Transaction(args))
        throw new InvalidEip712TransactionError();
    assertRequest(args);
}
//# sourceMappingURL=sendEip712Transaction.js.map