import { beforeEach, afterEach } from "vitest";

import { interceptFetch } from "./interceptors/fetchInterceptor.js";
import { interceptHttp } from "./interceptors/httpInterceptor.js";
import { interceptHttps } from "./interceptors/httpsInterceptor.js";

type RequestHandlingMode = "block";

export type Interceptor = (
	onIntercept: (method: string, url: string) => void,
) => () => void;

type InterceptorState = {
	isBlocked: boolean;
	interceptedRequests: string[];
	restoreFetch: undefined | (() => void);
	restoreHttps: undefined | (() => void);
	restoreHttp: undefined | (() => void);
};

const createInterceptorState = () => {
	return {
		isBlocked: false,
		interceptedRequests: [],
		restoreFetch: undefined,
		restoreHttp: undefined,
		restoreHttps: undefined,
	} satisfies InterceptorState;
};

type InterceptNetworkRequestsProps = {
	state: InterceptorState;
	requestHandlingMode: RequestHandlingMode;
	interceptFetch: Interceptor;
	interceptHttp: Interceptor;
	interceptHttps: Interceptor;
};

const interceptNetworkRequests = ({
	state,
	requestHandlingMode,
	interceptFetch,
	interceptHttp,
	interceptHttps,
}: InterceptNetworkRequestsProps): void => {
	if (!state.isBlocked) {
		console.log("Interceptor mode:", requestHandlingMode);

		const restoreFetch = interceptFetch((_method, url) => {
			state.interceptedRequests.push(`Intercepted fetch request to: ${url}`);
		});
		const restoreHttp = interceptHttp((_method, url) => {
			state.interceptedRequests.push(`Intercepted fetch request to: ${url}`);
		});
		const restoreHttps = interceptHttps((_method, url) => {
			state.interceptedRequests.push(`Intercepted fetch request to: ${url}`);
		});

		state.isBlocked = true;
		state.restoreFetch = restoreFetch;
		state.restoreHttp = restoreHttp;
		state.restoreHttps = restoreHttps;
	}
};

const restoreNetworkRequests = (state: InterceptorState) => {
	state.restoreFetch?.();
	state.restoreHttp?.();
	state.restoreHttps?.();

	return { state, isBlocked: false };
};

const checkForInterceptedRequests = (state: InterceptorState) => {
	if (state.interceptedRequests.length > 0) {
		const message = state.interceptedRequests.join("\n");
		console.log("message", message);
		throw new Error(`Test failed due to network requests:\n${message}`);
	}
};

type SetupNetworkInterceptorProps = {
	requestHandlingMode?: RequestHandlingMode;
};

export const setupNetworkInterceptor = (
	options?: SetupNetworkInterceptorProps,
) => {
	const requestHandlingMode = options?.requestHandlingMode ?? "block";
	const state = createInterceptorState();

	beforeEach(() => {
		interceptNetworkRequests({
			state,
			requestHandlingMode,
			interceptFetch,
			interceptHttp,
			interceptHttps,
		});
	});

	afterEach(() => {
		checkForInterceptedRequests(state);
		restoreNetworkRequests(state);
	});
};
