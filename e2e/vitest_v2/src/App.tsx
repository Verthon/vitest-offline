import { useQuery } from "@tanstack/react-query";

export const App = () => {
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ["repoData"],
		queryFn: async () => {
			const response = await fetch(
				"https://api.github.com/repos/TanStack/query",
			);
			return await response.json();
		},
	});

	if (isPending) return "Loading...";

	if (error) return `Error: ${error.message}`;

	return (
		<div>
			<h1>{data.full_name}</h1>
			<p>{data.description}</p>
			<div>{isFetching ? "Updating..." : ""}</div>
		</div>
	);
};
