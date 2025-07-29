"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebsiteName = getWebsiteName;
exports.getFavicon = getFavicon;
exports.noThrow = noThrow;
exports.findSmallestBigInt = findSmallestBigInt;
exports.calculateMaxFee = calculateMaxFee;
function getWebsiteName() {
    const fullTitle = document.title;
    if (!fullTitle)
        return null;
    const delimiters = [" - ", " | ", " : ", " · ", " — "];
    for (const delimiter of delimiters) {
        const parts = fullTitle.split(delimiter);
        if (parts.length > 1) {
            return parts[0].trim();
        }
    }
    return fullTitle.trim();
}
function getFavicon() {
    const el = document.querySelector("link[sizes=\"192x192\"], link[sizes=\"180x180\"], link[rel=\"icon\"], link[rel=\"shortcut icon\"]");
    const href = el?.getAttribute("href");
    if (!href)
        return null;
    try {
        const url = new URL(href, document.location.href);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            return null;
        }
        return url.href;
    }
    catch {
        return null;
    }
}
function noThrow(fn) {
    try {
        return fn();
    }
    catch {
        return null;
    }
}
function findSmallestBigInt(arr) {
    if (arr.length === 0)
        throw new Error("Array must not be empty");
    let smallest = arr[0];
    for (const num of arr) {
        if (num < smallest)
            smallest = num;
    }
    return smallest;
}
function calculateMaxFee(fee) {
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