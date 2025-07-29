const ZYFI_ENDPOINT = "https://api.zyfi.org/api/";
const ERC20_PAYMASTER = `${ZYFI_ENDPOINT}erc20_paymaster/v1`;
const SPONSORED_PAYMASTER = `${ZYFI_ENDPOINT}erc20_sponsored_paymaster/v1`;
export function createZyfiPaymaster(params) {
    if (!params.apiKey)
        throw new Error("ZyFi: Provide API KEY");
    if (params.sponsorshipRatio !== undefined
        && (params.sponsorshipRatio > 100
            || params.sponsorshipRatio < 0))
        throw new Error("ZyFi: Sponsorship ratio must be between 0-100");
    return async function zyfiPaymaster(args) {
        const url = params.sponsorshipRatio ? SPONSORED_PAYMASTER : ERC20_PAYMASTER;
        const payload = {
            replayLimit: params.replayLimit,
            sponsorshipRatio: params.sponsorshipRatio,
            chainId: args.chainId,
            checkNFT: params.checkNFT,
            feeTokenAddress: params.feeTokenAddress,
            isTestnet: params.isTestnet,
            gasLimit: args.gas || undefined,
            txData: {
                from: args.from,
                to: args.to,
                data: args.data ?? "0x",
                value: args.value,
            },
        };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": params.apiKey,
            },
            body: stringify(payload),
        }).then((response) => {
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        });
        const { paymasterParams, gasPerPubdata } = response.txData.customData;
        return {
            paymaster: paymasterParams.paymaster,
            paymasterInput: paymasterParams.paymasterInput,
            maxFeePerGas: BigInt(response.txData.maxFeePerGas),
            gas: BigInt(response.txData.gasLimit),
            maxPriorityFeePerGas: BigInt(response.txData.maxPriorityFeePerGas ?? 0),
            gasPerPubdata: gasPerPubdata ? BigInt(gasPerPubdata) : undefined,
        };
    };
}
function stringify(payload) {
    return JSON.stringify(payload, (_, v) => typeof v === "bigint" ? v.toString() : v);
}
//# sourceMappingURL=zyfi.js.map