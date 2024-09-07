import https from "https";

let originalHttpsRequest: typeof https.request | undefined;

export const interceptHttps = () => {
	if (!originalHttpsRequest) {
		originalHttpsRequest = https.request.bind(https);
	}

	https.request = ((...args: Parameters<typeof https.request>) => {
		console.log("Intercepted HTTPS request");
		throw new Error("Test failed: Network requests are blocked during tests.");
	}) as typeof https.request;

	https.get = ((...args: Parameters<typeof https.get>) => {
		console.log("Intercepted HTTPS GET request");
		throw new Error(
			"Test failed: Network GET requests are blocked during tests."
		);
	}) as typeof https.get;
};

export const restoreHttps = () => {
	if (originalHttpsRequest) {
		https.request = originalHttpsRequest;
	}
};
