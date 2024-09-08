import { URL } from "node:url";

export const getUrlFromArgs = (args: unknown[]) => {
	console.log('args', args)
	if (typeof args[0] === "string" || args[0] instanceof URL) {
		try {
			return new URL(args[0].toString()).href;
		} catch (error) {
			return "Unknown URL";
		}
	}

	if (typeof args[0] === "object" && args[0] !== null) {
		const options = args[0] as {
			protocol?: string;
			hostname?: string;
			path?: string;
		};
		const protocol = options.protocol || "http:";
		const hostname = options.hostname || "localhost";
		const path = options.path || "/";

		return `${protocol}//${hostname}${path}`;
	}

	return "Unknown URL";
};
