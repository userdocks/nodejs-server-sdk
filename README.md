# **@userdocks/nodejs-server-sdk**

![npm](https://img.shields.io/npm/v/@userdocks/nodejs-server-sdk?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/userdocks/nodejs-server-sdk/build?style=flat-square)
![Coveralls branch](https://img.shields.io/coveralls/github/userdocks/nodejs-server-sdk/main?style=flat-square)
![NPM](https://img.shields.io/npm/l/@userdocks/nodejs-server-sdk?style=flat-square)

> The Node.js server SDK for userdocks. Verify access and id tokens on your server.

## Table of Contents

- [Install](#install)
- [Methods](#methods)
  - [getUserdocks](#getuserdocks)
    - [userdocks.verify](#userdocksverify)
- [Usage](#usage)
- [Usage for Development](#usage-for-development)

## **Install**

```bash
npm i @userdocks/nodejs-server-sdk
```

## **Methods**

Documentation of all the functions and methods this SDK exposes.

### **getUserdocks**

This method returns an object (TUserdocks) that exposes the verify method.

**Syntax**

Returns a new object.

```js
const userdocks = getUserdocks(options);
```

**Parameters**

- **options** `<object>`: an object holding two key value pairs
  - **app** `<object>`: an object holding three key value pairs
    - **publicKey** `<string | undefined>`: the publicKey of the userdocks application, if already cached on the server (_optional_)
    - **readOnlyApiKey** `<string>`: the read only api key of the userdocks application (_required_)
    - **id** `<string>`: the UUID of the userdocks application (_required_)
  - **authServer** `<object | undefined>`: an object holding three key value pairs (_optional_)
    - **id** `<string | undefined>`: the UUID of the authentication server (_optional_)
    - **apiUri** `<string | undefined>`: the api uri of the authetication server (_optional_)
    - **publicKeyPath** `<string | undefined>`: the pathname to the publicKey ressource on the authetication server (_optional_)

**Return Value**

- **userdocks** `<object>`: an object holding one key value pair
  - **verify** `<function>`: a method that returns a promise that should resolve a boolean

### **userdocks.verify**

Returns a promise that should resolve a new boolean indicating if a token is valid or not.

**Syntax**

Returns a promise that should resolve a new boolean.

```js
const userdocks = getUserdocks(options);

const payload = await userdocks.verify(token, tokenType);
```

**Parameters**:

- **token** `<string>`: the JSON Web Token you want to verify
- **tokenType** `<"access" | "id">`: the type of the token as string

**Return Value**:

- **payload**: a promise that should resolve the payload of the token including a boolean value `valid` indicating if the provided token is valid or not

### **Usage**

```js
import getUserdocks from '@userdocks/nodejs-server-sdk';

const token = '<a-json-web-token>';

const userdocks = getUserdocks({
  app: {
    readOnlyApiKey: '<a-read-only-api-key-of-an-userdocks-application>',
    id: '<a-uuid-of-an-userdocks-application>',
  },
});

const payload = await userdocks.verify(token, 'access');
```

## **Usage for Development**

Start the watcher and link the package locally:

```bash
npm run watch
npm run link
```

Link the package in the project where it will be used:

```bash
# if you run "npm i" in your project you need to re-run this command
npm link @userdocks/nodejs-server-sdk
```

To use this module with typescript and with npm link add the follwing to your tsconfig.json:

```json
{
  "compilerOptions": {
    "paths": {
      "@userdocks/nodejs-server-sdk": [
        "./node_modules/@userdocks/nodejs-server-sdk"
      ]
    }
  }
}
```
