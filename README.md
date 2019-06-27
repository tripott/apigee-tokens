# apigee-tokens

![npm version](https://img.shields.io/badge/npm-1.0.1-blue.svg) ![Licence MIT](https://img.shields.io/badge/licence-MIT-yellowgreen.svg) ![Open Issues](https://img.shields.io/github/issues-raw/tripott/jwt-bouncer.svg)


Promised based functions to create Apigee multi-factor auth tokens and OAuth tokens. Used to access Apigee API Management APIs which are used to automate deployment of API proxies, products, etc. to the Apigee Edge platform.

## Setup

- Clone and install dependencies

  ```bash
  git clone https://github.com/tripott/apigee-tokens.git
  cd apigee-tokens
  npm install
  ```

## Environment variables

- Copy **sample-env** as **.env**.
- Supply values for the following environment variables:
  - `SHARED_SECRET` - See **Obtaining a Shared Secret** section below.
  - `EDGE_USER_EMAIL` - Your Apigee user account email address
  - `EDGE_USER_PWD` - Your Apigee user account password.

> Keep the environment variables safe! Do not share in source code control.

## Usage

```js
require("dotenv").config();
const { getTokens, getMFAToken } = require("apigee-tokens");

getMFAToken({ secret: process.env.SHARED_SECRET })
  .then(mfaToken =>
    getTokens({
      mfaToken,
      email: process.env.EDGE_USER_EMAIL,
      pwd: process.env.EDGE_USER_PWD
    })
  )
  .then(({ access_token }) => {
    console.log({ access_token });
  });
```

## Overview

You can use [Apigee Edge RESTful management APIs](https://docs.apigee.com/api-platform/system-administration/management-api-overview) to create, configure, and manage API proxies and API products, policies for logic in your API proxies, apps and app developers, and caches.

Calls to the Apigee Edge Management API require authentication so that Apigee can be sure that you are who you say you are.

Calls require credentials with the appropriate rights, such as an organization administrator or similar account used for continuous integration and continuous delivery (CI/CD).

Two-Factor Authentication is also referred to as 2FA and is sometimes called generically as MFA (Multi-Factor Authentication) or simply OTP (One Time Password).

> Apigee recommends that you enable 2-factor authentication for your Apigee account. When 2-factor authentication is enabled, you get a randomly generated number from Apigee and send it along with your credentials.

MFA provides an additional layer of security to access Apigee Edge. The MFA uses here is based on the TOTP (Time-based One Time Password) algorithm commonly setup using the Google Authenticator mobile app.

When Multi-Factor Authentication is enabled for an Apigee login, Apigee Edge Management API access is _also protected using Two-Factor Authentication_. Ouch!

`apigee-tokens` is concerned with using OAuth2 to exchange your Edge Basic Auth credentials and an **Multi-Factor Authentication (MFA)** Token for an OAuth2 access token and refresh token. Once you have an access token, you can make calls to the Edge management API by passing the access token in the API call.

The **lib** folder contains 2 promised-based helper libraries to help with obtaining a **Multi-Factor Authentication (MFA)** Token (**mfatoken.js**) and an OAuth2 token (**edge-oauth-tokens.js**). The **test** folder contains examples to demonstrate usage of obtaining an MFA Token and OAuth2 token.

## Obtaining a Shared Secret

Before you can generate an **MFA token**, you need a _shared secret_ from Apigee. To obtain the value for the `SHARED_SECRET` environment variable you must [Extract the Shared Secret](https://community.apigee.com/articles/31461/oauth-and-two-factor-authentication-for-maven-part-2.html) for your Apigee Edge organization admin account as part of the Apigee multi factor auth setup process. The code in this repo, reads a shared secret from the `SHARED_SECRET` environment variable.

> Keep the `SHARED_SECRET` environment variable value safe!

### Auth High Level Steps

1. Get a shared secret. Details in **Obtaining a Shared Secret**.
2. Use `getMFAToken` function to generate a Multi-Factor Token.
3. Use the Multi-Factor Token and your Edge email and password in a call `getEdgeOAuth2Tokens` function to [generate an OAuth2 access token](https://docs.apigee.com/api-platform/system-administration/using-oauth2#howtogetoauth2tokens).
4. Sign requests to the API Edge Management API with the access token.

## Prerequisites

If you are unfamiliar, read up on using OAuth2 to access the Apigee Management API.

- [Using OAuth2 to access the management API](https://docs.apigee.com/api-platform/system-administration/using-oauth2#howtogetoauth2tokens)
- [Using the management API to get OAuth2 tokens](https://docs.apigee.com/api-platform/system-administration/management-api-tokens)

## **mfatoken.js**

**\lib\mfatoken.js** is a promise-based library to generate an **Multi-Factor Authentication (MFA) Token** that represents the token you typically obtain during a manual MFA workflow using something like the Google Authenticator mobile app. In short, use this library to get a randomly generated number from Apigee. You'll send this MFA Token along with your email and password credentials when it's time to get an OAuth2 token. If your Apigee Edge account that you plan to use for CI automation for the Apigee Edge Management API is protected with MFA, then you will benefit from this library.

It is based on the **mfatoken.js** code within the [apigee-edge-maven-plugin](https://github.com/apigee/apigee-deploy-maven-plugin/blob/master/samples/forecastweatherapi-recommended/src/gateway/forecastweatherapi/mfatoken.js) repo. I simply "promisified" it.

## Test

```
npm test
```

or for more signal, run tests in verbose mode:

```
npm run testV
```

## Build

```
npm run build
```

## Prepublish

Run prepublish before you publish to npm. prepublish will run lint, prettier and the build process.

```
npm run prepublish
```
