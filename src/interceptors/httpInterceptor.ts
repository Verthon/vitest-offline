import http from "node:http";

import { getUrlFromArgs } from "./getUrlFromArgs.js";

export const interceptHttp = (
	onIntercept: (method: string, url: string) => void,
) => {
	const originalHttpRequest = http.request.bind(http);

	http.request = (...args) => {
		const url = getUrlFromArgs(args);

		onIntercept("http", url);

		throw new Error(
			`Test failed: Network request to ${url} is blocked during tests.`,
		);
	};

	http.get = (...args) => {
		const url = getUrlFromArgs(args);

		onIntercept("http", url);

		throw new Error(
			`Test failed: Network request to ${url} is blocked during tests.`,
		);
	};

	return () => {
		http.request = originalHttpRequest;
		http.get = originalHttpRequest;
	};
};
