import type { Communicator, Message } from "./index.js";
export interface PopupConfigMessage extends Message {
    event: "PopupLoaded" | "PopupUnload";
}
type PositionCalculator = (width: number, height: number) => {
    left: number;
    top: number;
};
export declare class PopupCommunicator implements Communicator {
    private readonly url;
    private popup;
    private listeners;
    private readonly width;
    private readonly height;
    private readonly calculatePosition?;
    constructor(url: string, options?: {
        width?: number;
        height?: number;
        calculatePosition?: PositionCalculator;
    });
    postMessage: (message: Message) => Promise<void>;
    postRequestAndWaitForResponse: <M extends Message>(request: Message & {
        id: NonNullable<Message["id"]>;
    }) => Promise<M>;
    onMessage: <M extends Message>(predicate: (_: Partial<M>) => boolean) => Promise<M>;
    private disconnect;
    openPopup: () => Window;
    waitForPopupLoaded: () => Promise<Window>;
    ready: () => Promise<void>;
}
export {};
//# sourceMappingURL=PopupCommunicator.d.ts.map