import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "./App.js";

const queryClient = new QueryClient();

const renderApp = () => {
	const container = document.getElementById("root");
	const root = createRoot(container as Element);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</StrictMode>,
	);
};

renderApp();
