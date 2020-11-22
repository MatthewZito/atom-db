## atom-db | a flexible object database for any environment
[![Coverage Status](https://coveralls.io/repos/github/MatthewZito/atom-db/badge.svg?branch=master)](https://coveralls.io/github/MatthewZito/atom-db?branch=master)
[![Build Status](https://travis-ci.org/MatthewZito/atom-db.svg?branch=master)](https://travis-ci.org/MatthewZito/atom-db)
[![npm version](https://badge.fury.io/js/vivisector.svg)](https://badge.fury.io/js/atom-db)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
-   [Introduction](#intro)
    -   [Features](#feat)
-   [Installation + Usage](#usage)
-   [Documentation](#docs)
-   [Upcoming Features](#upcoming)

## <a name="intro"></a> Introduction
*Atom-db* is a zero-dependency object / NOSQL data store. A database can have any number of stores, each of which emit `onSuccess` and `onError` events to the store instance. You can use the `.get` and `.set` methods to persist and retrieve data to and from the store, respectively.

### <a name="feat"></a> Features
  - zero dependencies
  - fast object retrieval 
  - create multiple, namespaced databases with little configuration
  - catch errors in an isolated per-store context via a single event hook 

## <a name="usage"></a> Installation and Usage
[Install via NPM](https://www.npmjs.com/package/atom-db) with `npm i atom-db`.

Instantiate your database by requiring the library's built-in `init` function:
```
const db = require("atom-db");

const storeA = db("test").registerObjectStore("mock");
```

Subscribe to the success and error handlers:
```
storeA.onError(e => {
	console.log(e.target.value.message);
});

storeA.onSuccess(e => {
	console.log(e.target.value);
});
```

Set some data in the store:
```
store.set("person", { musician: "Cornelius Cardew" });
```

Retrieve data:
```
const musician = store.get("person");
```

## <a name="docs"></a> Documentation
#### Database instance
A database is initialized with a `name` argument. This can be a String, Number, or Symbol. Initialized database instances have attached to them a `registerObjectStore` method that can be used to create new stores. The database instance places the registered store modules in a `stores` array.

You can instantiate any number of separate database instances, each with their own localized stores.

**Example:**
```
const db = require("atom-db");
const database = db("mock");
```

#### Store Module Registration 
A store module is a key-value store bound to the database instance.
To register a new store module, call `registerObjectStore`.

| Method | Return Value |
| --- | --- |
| **registerObjectStore** | returns the newly created store module with a localized event-emitter attached |

**Example:**
```
const db = require("atom-db");
const store = db("mock").registerObjectStore("people");
```

#### Store Module Events
Each store module has a localized event-emitter bound to its scope. To subscribe to the event-emitter, register a function on the `onSuccess` and `onError` properties. The functions you register will be dispatched and called once per eventing cycle.

Note: `onSuccess` and `onError` return the store instance and are therefore chainable method properties.

Event listeners available on each store instance:
| Method | Emitted Data |
| --- | --- |
| **onError** | an event object with properties `target` and `value`, where `value` is an Error instance |
| **onSuccess** |  an event object with properties `target` and `value`, where `value` is the retrieved data |

**Example:**
```
const db = require("atom-db");
const store = db("mock").registerObjectStore("people");

store.onError(e => {
	console.log(e.target.value.message);
});

store.onSuccess(e => {
	console.log(e.target.value);
});
```

#### Setting Data in a Store Module
You can set a variety of data in a given store module by using that store's `set` method. `set` expects a String or Number key and a corresponding value of any type.

You'll need to subscribe handlers to that store's `onError` and `onSuccess` properties prior to setting data.

| Method | Return Value |
| --- | --- |
| **set** | returns the store instance itself and is therefore chainable |

**Example:**
```
const db = require("atom-db");
const store = db("mock").registerObjectStore("people");

store.onError(e => {
	console.log(e.target.value.message);
});

store.onSuccess(e => {
	console.log(e.target.value);
});

store.set("person", { musician: "Cornelius Cardew" });
```

#### Retrieving Data from a Store
You can retrieve previously set data from a given store module by using that store's `get` method. `get` expects a key identifier and will trigger the given store's emitter to emit either the `onSuccess` event (the requested data exists in the store), or the `onError` event (the requested data either does not exist in the store, or the key argument is malformed).

You'll need to subscribe handlers to that store's `onError` and `onSuccess` properties prior to getting data. You'll also need to set data, of course.

| Method | Return Value |
| --- | --- |
| **get** | returns the requested value, or undefined if the provided key has not been set in the store |

**Example:**
```
const db = require("atom-db");
const store = db("mock").registerObjectStore("people");

store.onError(e => {
	console.log(e.target.value.message);
});

store.onSuccess(e => {
	console.log(e.target.value);
});

store.set("person", { musician: "Cornelius Cardew" });

const p = store.get("person");
```

#### Event Properties

##### onSuccess
```
{ 
parent: <name prop of store to which data belongs>,
target: {
    value: <retrieved data>
    }
}
```

##### onError
```
{ 
parent: <name prop of store from which the error derives>,
target: {
    value: <an extended instance of Error>
    }
}
```

## <a name="upcoming"></a> Upcoming Features
* configurable adapters for local storage, node file system, and JSON
* multiple event registration
* built-in compose and pipe transformers