![Actions for Auth0](https://cdn.auth0.com/website/auth0-actions/banner.png)
<div align="center">

[![License](https://img.shields.io/:license-Apache2.0-blue.svg?style=flat)](https://opensource.org/licenses/Apache-2.0)
[![NPM Downloads](https://img.shields.io/npm/dw/%40auth0%2Factions)](https://www.npmjs.com/package/@auth0/actions)

</div>

<div align="center">

🚀 [Getting Started](#-getting-started) • 💬 [Feedback](#-feedback-and-contributing)

</div>

Official Auth0 Actions TypeScript definitions, which will help you code and test your project’s Actions on external editors and IDEs.

## 🚀 Getting Started

**Prerequisites:**

- [Node.js v18 or higher](https://nodejs.org/en/download)
- [TypeScript 5.5 or higher](https://www.typescriptlang.org/download) (for development)
- An [Auth0 account](https://auth0.com/signup)
- Basic knowledge of [Auth0 Actions](https://auth0.com/docs/customize/actions)
- A code editor with TypeScript support (e.g., [VS Code](https://code.visualstudio.com/))

**Installation:**

Install the package using npm:

```bash
npm install --save-dev @auth0/actions
```

Or using yarn:

```bash
yarn add --dev @auth0/actions
```

Or using pnpm:

```bash
pnpm add --save-dev @auth0/actions
```

**Usage:**

Import the TypeScript definitions into your Auth0 Actions using one of the following approaches:

**JSDoc @import:**

Use this approach when you want to enable IntelliSense without changing your existing JavaScript code structure:

```javascript
/** @import {Event, PostLoginAPI} from "@auth0/actions/post-login/v3" */

/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  const user = event.user;

  // Your Action logic here
  if (user.email?.endsWith('@example.com')) {
    api.user.setAppMetadata('department', 'internal');
  }
}
```

**JSDoc @param:**

Use this approach for type safety in JavaScript files using import statements in JSDoc comments:

```javascript

/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {import('@auth0/actions/post-login/v3').Event} event - Details about the user and the context in which they are logging in.
* @param {import('@auth0/actions/post-login/v3').PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  const user = event.user;

  // Your Action logic here
  if (user.email?.endsWith('@example.com')) {
    api.user.setAppMetadata('department', 'internal');
  }
}
```

**TypeScript import:**

Use this approach when developing with TypeScript for full type checking and modern syntax:

```typescript
import type { Event, PostLoginAPI } from '@auth0/actions/post-login/v3';

/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event: Event, api: PostLoginAPI) => {
  const user = event.user;

  // Your Action logic here
  if (user.email?.endsWith('@example.com')) {
    api.user.setAppMetadata('department', 'internal');
  }
};
```

> **⚠️ Important:** When using TypeScript, you must compile your code to JavaScript before deploying to Auth0. The Auth0 Actions runtime only executes JavaScript. Use the TypeScript compiler (`tsc`) to transpile your `.ts` files to `.js` files, before it can be deployed. You must also include JSDoc comments to enable Intellisense in the Dashboard.


## 💬 Feedback and Contributing
This repository contains automatically generated TypeScript types and utilities for Auth0 Actions development. The types in this package are generated from Auth0's internal systems and are published to help developers build Actions.
**This repository does not accept external contributions.** The contents of this package are automatically generated and maintained by Auth0's internal systems.
For help using this package, reporting issues, or providing feedback:
- **Usage Documentation**: Refer to [Getting Started](#-getting-started) for examples
- **Auth0 Actions Documentation**: [auth0.com/docs/customize/actions](https://auth0.com/docs/customize/actions)
- **Support Center**: [support.auth0.com](https://support.auth0.com)
- **Community Forum**: [community.auth0.com](https://community.auth0.com)
## 📄 License
Copyright 2026 Okta, Inc.

This project is licensed under the Apache 2.0 license. See the [LICENSE](https://cdn.auth0.com/website/auth0-actions/LICENSE.txt) file for more info.
## What is Auth0?
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/auth0-logos/2023-branding/favicon/auth0-icon-ondark.svg" width="150" height="75">
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/auth0-logos/2023-branding/favicon/auth0-icon-onlight.svg" width="150" height="75">
    <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
  </picture>
</p>
<p align="center">
  Auth0 is an easy to implement, adaptable authentication and authorization platform. To learn more checkout <a href="https://auth0.com/why-auth0">Why Auth0?</a>
</p>
