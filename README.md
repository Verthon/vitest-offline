# vitest-offline

Simple addon to your vitest, that will break tests if any of them make a network request.

## Install

With npm:
```shell
npm i -D vitest-offline
```

With pnpm:
```shell
pnpm add -D vitest-offline
```

With yarn:
```shell
yarn add vitest-offline --dev
```

## Use

In your vitest setup file add following code:

```ts
// e.g. src/setupTests.ts

import { setupNetworkInterceptor } from "vitest-offline";

setupNetworkInterceptor();
```

Import to your Vite config file:

```ts
// vitest.config.mts or vite.config.mts

export default defineConfig({
	test: {
		...
    // make sure it is correct path to your setupTests file
		setupFiles: "./src/setupTests.ts",
	},
});
```