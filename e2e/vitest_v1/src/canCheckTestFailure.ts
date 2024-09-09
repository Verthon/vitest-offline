export const canCheckTestFailure = () => {
	return process.env.CHECK_TEST_FAILURE === "true";
};
