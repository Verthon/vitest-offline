import { describe, expect, it } from "vitest";

import { getUrlFromArgs } from "./getUrlFromArgs.js";

describe("getUrlFromArgs", () => {
	it("should return full http url when input is a string", () => {
		expect(getUrlFromArgs(["http://example.com", () => null])).toBe("http://example.com/");
	});

  it("should return full https url when input is a string", () => {
		expect(getUrlFromArgs(["https://example.com", () => null])).toBe("https://example.com/");
	});

  it("should return Unknown URL in case some garbage is an input", () => {
		expect(getUrlFromArgs(["com", () => null])).toBe("Unknown URL");
	});
});
