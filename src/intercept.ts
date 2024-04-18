import http from "http";
import https from "https";

let originalHttp: typeof http.request;
let originalHttps: typeof https.request;

function interceptNetworkRequests(mode: "warn" | "block"): void {
	originalHttp = http.request;
	originalHttps = https.request;

	const handler = (
		options: http.RequestOptions | string | URL,
		callback?: (res: http.IncomingMessage) => void
	): http.ClientRequest => {
		if (mode === "warn") {
			console.warn("Network request detected:", options);
			return originalHttp(options, callback);
		} else {
			// block mode
			throw new Error("Network requests are blocked in offline mode");
		}
	};

	// Wrap the handler in a function that captures and properly handles the error for testing
	const wrappedHandler = (options: any, callback: any) => {
		try {
			return handler(options, callback);
		} catch (error) {
			// Pass errors to Vitest's error handling by rejecting a promise
			return new Promise((_, reject) => reject(error));
		}
	};

	http.request = wrappedHandler as any;
	https.request = wrappedHandler as any;
}

function restoreNetworkRequests(): void {
	http.request = originalHttp;
	https.request = originalHttps;
}

export { interceptNetworkRequests, restoreNetworkRequests };
