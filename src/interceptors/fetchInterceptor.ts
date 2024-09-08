export const interceptFetch = (
	onIntercept: (method: string, url: string) => void,
) => {
	const originalFetch = global.fetch;

	global.fetch = async (...args) => {
		//@ts-expect-error
		const url = typeof args[0] === "string" ? args[0] : args[0].url;
		onIntercept("fetch", url);
		return Promise.reject(new Error("Network requests are blocked"));
	};

	return () => {
		global.fetch = originalFetch;
	};
};
