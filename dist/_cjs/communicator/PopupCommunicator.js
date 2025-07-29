"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupCommunicator = void 0;
const index_js_1 = require("../errors/index.js");
class PopupCommunicator {
    constructor(url, options) {
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "popup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "calculatePosition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "postMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (message) => {
                const popup = await this.waitForPopupLoaded();
                popup.postMessage(message, this.url.origin);
            }
        });
        Object.defineProperty(this, "postRequestAndWaitForResponse", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request) => {
                const responsePromise = this.onMessage(({ requestId }) => requestId === request.id);
                this.postMessage(request);
                return await responsePromise;
            }
        });
        Object.defineProperty(this, "onMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (predicate) => {
                return new Promise((resolve, reject) => {
                    const listener = (event) => {
                        if (event.origin !== this.url.origin)
                            return;
                        const message = event.data;
                        if (predicate(message)) {
                            resolve(message);
                            window.removeEventListener("message", listener);
                            this.listeners.delete(listener);
                        }
                    };
                    window.addEventListener("message", listener);
                    this.listeners.set(listener, { reject });
                });
            }
        });
        Object.defineProperty(this, "disconnect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                try {
                    if (this.popup && !this.popup.closed) {
                        this.popup.close();
                    }
                }
                catch (error) {
                    console.warn("Failed to close popup", error);
                }
                this.popup = null;
                this.listeners.forEach(({ reject }, listener) => {
                    reject(index_js_1.standardErrors.provider.userRejectedRequest("Request rejected"));
                    window.removeEventListener("message", listener);
                });
                this.listeners.clear();
            }
        });
        Object.defineProperty(this, "openPopup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const width = this.width;
                const height = this.height;
                const url = new URL(this.url.toString());
                url.searchParams.set("origin", window.location.origin);
                const { left, top } = this.calculatePosition
                    ? this.calculatePosition(width, height)
                    : {
                        left: (window.innerWidth - width) / 2 + window.screenX,
                        top: (window.innerHeight - height) / 2 + window.screenY,
                    };
                const popup = window.open(url, "ZKsync SSO", `width=${width}, height=${height}, left=${left}, top=${top}`);
                if (!popup) {
                    throw index_js_1.standardErrors.rpc.internal("Pop up window failed to open");
                }
                popup.focus();
                return popup;
            }
        });
        Object.defineProperty(this, "waitForPopupLoaded", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                if (this.popup && !this.popup.closed) {
                    this.popup.focus();
                    return this.popup;
                }
                this.popup = this.openPopup();
                this.onMessage(({ event }) => event === "PopupUnload")
                    .then(this.disconnect)
                    .catch(() => { });
                return this.onMessage(({ event }) => event === "PopupLoaded")
                    .then(() => {
                    if (!this.popup)
                        throw index_js_1.standardErrors.rpc.internal();
                    return this.popup;
                });
            }
        });
        Object.defineProperty(this, "ready", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                await this.waitForPopupLoaded();
            }
        });
        this.url = new URL(url);
        this.width = options?.width ?? 420;
        this.height = options?.height ?? 600;
        this.calculatePosition = options?.calculatePosition;
    }
}
exports.PopupCommunicator = PopupCommunicator;
//# sourceMappingURL=PopupCommunicator.js.map