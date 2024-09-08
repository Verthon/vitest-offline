import https from "node:https";

import { getUrlFromArgs } from "./getUrlFromArgs.js";

export const interceptHttps = (
	onIntercept: (method: string, url: string) => void,
) => {
	const originalHttpRequest = https.request.bind(https);

	https.request = (...args) => {
		const url = getUrlFromArgs(args);

		onIntercept("http", url);

		throw new Error(
			`Test failed: Network request to ${url} is blocked during tests.`,
		);
	};

	https.get = (...args) => {
		const url = getUrlFromArgs(args);

		onIntercept("http", url);

		throw new Error(
			`Test failed: Network request to ${url} is blocked during tests.`,
		);
	};

	return () => {
		https.request = originalHttpRequest;
		https.get = originalHttpRequest;
	};
};
