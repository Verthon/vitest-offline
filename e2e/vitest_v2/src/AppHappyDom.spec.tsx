// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";

import { handlers } from "./handlers.js";
import { App } from "./App.js";
import { TestAppProviders } from "./AppProviders.js";
import { canCheckTestFailure } from "./canCheckTestFailure.js";

const mswServer = setupServer(...handlers);

describe("App", () => {
	it.runIf(canCheckTestFailure())(
		"should fail when performing a network request",
		() => {
			expect(() =>
				render(
					<TestAppProviders>
						<App />
					</TestAppProviders>
				)
			).toThrow();
		}
	);

	it("should pass if the call to api is mocked with msw", () => {
		mswServer.listen();

		render(
			<TestAppProviders>
				<App />
			</TestAppProviders>
		);

		expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

		mswServer.close();
	});
});
