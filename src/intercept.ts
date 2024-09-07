import { beforeEach, afterEach } from "vitest";

import { interceptFetch, restoreFetch } from "./fetchInterceptor.js";
import { interceptHttp, restoreHttp } from "./httpInterceptor.js";
import { interceptHttps, restoreHttps } from "./httpsInterceptor.js";

type SetupNetworkInterceptorProps = {
	requestHandlingMode?: "block";
};

let isBlocked = false;
let interceptedRequests: string[] = [];

const interceptNetworkRequests = (action: "block" | "warn"): void => {
	if (action === "block" && !isBlocked) {
		console.log("Interceptor mode:", action);

		global.fetch = async (...args) => {
			interceptedRequests.push(`Intercepted fetch request to: ${args[0]}`);
			return Promise.reject(new Error("Network requests are blocked"));
		};

		// interceptFetch();
		interceptHttp();
		interceptHttps();

		isBlocked = true;
	} else if (action === "warn" && isBlocked) {
		restoreNetworkRequests();
	}
};

const restoreNetworkRequests = (): void => {
	restoreFetch();
	restoreHttp();
	restoreHttps();
	isBlocked = false;
};

const checkForInterceptedRequests = (): void => {
	if (interceptedRequests.length > 0) {
		const message = interceptedRequests.join("\n");
		throw new Error(`Test failed due to network requests:\n${message}`);
	}
};

export const setupNetworkInterceptor = () => {
	beforeEach(() => {
		console.log("interceptNetworkRequests");
		interceptNetworkRequests("block");
	});

	afterEach(() => {
		console.log("restoreNetworkRequests");
		checkForInterceptedRequests();
		restoreNetworkRequests();
	});
};
