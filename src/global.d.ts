export {};

declare global {
    interface Window {
        /** Redux initial state from SSR */
        __INITIAL_STATE__: any;
    }

    interface StaticContext {
        /** HTTP status code */
        status?: number;
        /** Redirect URL */
        url?: string;
    }
}
