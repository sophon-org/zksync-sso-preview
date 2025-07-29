export function getWebsiteName() {
    const fullTitle = document.title;
    if (!fullTitle)
        return null;
    const delimiters = [" - ", " | ", " : ", " · ", " — "];
    // Find the first delimiter that splits the title
    for (const delimiter of delimiters) {
        const parts = fullTitle.split(delimiter);
        if (parts.length > 1) {
            return parts[0].trim();
        }
    }
    return fullTitle.trim();
}
export function getFavicon() {
    const el = document.querySelector("link[sizes=\"192x192\"], link[sizes=\"180x180\"], link[rel=\"icon\"], link[rel=\"shortcut icon\"]");
    const href = el?.getAttribute("href");
    if (!href)
        return null;
    try {
        const url = new URL(href, document.location.href);
        // Make sure no malicious URLs are returned like "javascript:..."
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            return null;
        }
        return url.href;
    }
    catch {
        return null;
    }
}
export function noThrow(fn) {
    try {
        return fn();
    }
    catch {
        return null;
    }
}
export function findSmallestBigInt(arr) {
    if (arr.length === 0)
        throw new Error("Array must not be empty");
    let smallest = arr[0];
    for (const num of arr) {
        if (num < smallest)
            smallest = num;
    }
    return smallest;
}
export function calculateMaxFee(fee) {
    if (!fee.gas)
        return 0n;
    if (fee.gasPrice) {
        return fee.gas * fee.gasPrice;
    }
    else if (fee.maxFeePerGas) {
        return fee.gas * fee.maxFeePerGas;
    }
    else if (fee.maxPriorityFeePerGas) {
        return fee.gas * fee.maxPriorityFeePerGas;
    }
    return 0n;
}
//# sourceMappingURL=helpers.js.map