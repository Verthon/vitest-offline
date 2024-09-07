import http from "http";

let originalHttpRequest: typeof http.request | undefined;

export const interceptHttp = () => {
	if (!originalHttpRequest) {
		originalHttpRequest = http.request.bind(http);
	}

	http.request = ((...args: Parameters<typeof http.request>) => {
		console.log("Intercepted HTTP request");
		throw new Error("Test failed: Network requests are blocked during tests.");
	}) as typeof http.request;

	http.get = ((...args: Parameters<typeof http.get>) => {
		console.log("Intercepted HTTP GET request");
		throw new Error(
			"Test failed: Network GET requests are blocked during tests."
		);
	}) as typeof http.get;
};

export const restoreHttp = () => {
	if (originalHttpRequest) {
		http.request = originalHttpRequest;
	}
};
