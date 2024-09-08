import "@testing-library/jest-dom";
import {
	interceptNetworkRequests,
	restoreNetworkRequests,
} from "../../../src/index.js";

interceptNetworkRequests("block");

// beforeEach(() => {
// 	interceptNetworkRequests("block");
// });

// afterEach(() => {
// 	restoreNetworkRequests();
// });
