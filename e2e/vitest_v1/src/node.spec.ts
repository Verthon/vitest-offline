// @vitest-environment node

import { describe, it, expect } from "vitest";
import http from "node:http";
import https from "node:https";
import { setupServer } from "msw/node";

import { canCheckTestFailure } from "./canCheckTestFailure.js";
import { handlers } from "./handlers.js";

const server = setupServer(...handlers);

describe("HTTP/HTTPS Network Requests", () => {
	it.runIf(canCheckTestFailure())("should block HTTP requests", () => {
		expect(() => {
			http.get("http://example.com", () => {});
		}).toThrow(
			"Test failed: Network request to http://example.com/ is blocked during tests",
		);
	});

	it.runIf(canCheckTestFailure())("should block HTTPS requests", () => {
		expect(() => {
			https.get("https://example.com", () => {});
		}).toThrow(
			"Test failed: Network request to https://example.com/ is blocked during tests",
		);
	});

	it("should allow mocked HTTPS requests", async () => {
		server.listen();

		const data = await new Promise((resolve) => {
			https.get("https://api.github.com/repos/TanStack/query", (res) => {
				let rawData = "";
				res.on("data", (chunk) => {
					rawData += chunk;
				});
				res.on("end", () => {
					resolve(JSON.parse(rawData));
				});
			});
		});

		//@ts-expect-error
		expect(data.full_name).toBe("John");
		//@ts-expect-error
		expect(data.description).toBe("Test description");

		server.close();
	});
});
