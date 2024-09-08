import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

const testQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export const TestAppProviders = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={testQueryClient}>
			{children}
		</QueryClientProvider>
	);
};
