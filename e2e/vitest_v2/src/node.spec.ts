// @vitest-environment node

import { describe, it, expect } from "vitest";
import http from "node:http";
import https from "node:https";

describe("HTTP/HTTPS Network Requests", () => {
	it("should block HTTP requests", () => {
		expect(() => {
			http.get("http://example.com", () => {});
		}).toThrow("Test failed: Network GET requests are blocked during tests.");
	});

	it("should block HTTPS requests", () => {
		expect(() => {
			https.get("https://example.com", () => {});
		}).toThrow("Test failed: Network GET requests are blocked during tests.");
	});
});
