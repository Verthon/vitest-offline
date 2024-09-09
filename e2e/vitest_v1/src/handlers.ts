import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("https://api.github.com/repos/TanStack/query", () => {
		return HttpResponse.json({
			full_name: "John",
			description: "Test description",
		});
	}),
];
