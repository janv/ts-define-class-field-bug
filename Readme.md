This repo illustrates what I consider a bug in the typescript code generator for the `useDefineForClassFields` feature.

This has been tested in Node v18.

#### Node

Run `npm run test:node` to execute the plain node script.

```
➜  ts-define-class-field-bug git:(main) npm run test:node

> ts-define-class-field-bug@1.0.0 test:node
> node test-node.js

/Users/jan/development/ts-define-class-field-bug/test-node.js:3
    throw new Error()
    ^

Error
    at A.foo (/Users/jan/development/ts-define-class-field-bug/test-node.js:3:11)
    at Object.<anonymous> (/Users/jan/development/ts-define-class-field-bug/test-node.js:10:3)
    at Module._compile (node:internal/modules/cjs/loader:1149:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1203:10)
    at Module.load (node:internal/modules/cjs/loader:1027:32)
    at Module._load (node:internal/modules/cjs/loader:868:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47

Node.js v18.10.0
```

Observe that the name of the method that errored is reported as `A.foo`


#### Typescript with `useDefineForClassFields`

Run `npm run test:useDefine` to execute the Typescript version with the `useDefineForClassFields` flag

```
➜  ts-define-class-field-bug git:(main) ✗ npm run test:useDefine

> ts-define-class-field-bug@1.0.0 test:useDefine
> tsc --useDefineForClassFields && node test-typescript.js

/Users/jan/development/ts-define-class-field-bug/test-typescript.js:9
                throw new Error();
                ^

Error
    at A.value (/Users/jan/development/ts-define-class-field-bug/test-typescript.js:9:23)
    at Object.<anonymous> (/Users/jan/development/ts-define-class-field-bug/test-typescript.js:22:3)
    at Module._compile (node:internal/modules/cjs/loader:1149:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1203:10)
    at Module.load (node:internal/modules/cjs/loader:1027:32)
    at Module._load (node:internal/modules/cjs/loader:868:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47

Node.js v18.10.0
```

### The Bug:

Observe that the name of the method that errored is reported as `A.value`.

The function object that Javascript creates gets the name of its `value` key in the property descriptor of `defineProperty`.
This problem becomes quite annoying when used in the common pattern of pre-binding arrow-functions to class instances,
and then passing them around as event handlers in the browser.

Stack traces and the Chromium flame graph are then full of methods named `value`.