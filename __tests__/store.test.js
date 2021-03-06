const Store = require("../src/core/Store.js");
const KeyError = require("../src/errors/KeyError.js");
const { generateEvent } = require("../src/utils/generateEventObject.js");

describe("Evaluation of Store class", () => {
	describe("Evaluation of store instantiation", () => {
		const storeName = "test";

		it("Should throw an error when missing required argument 'name'", () => {
			expect(() => {
				new Store()
			}).toThrow("Missing required constructor argument");
		});

		it(`Should create a new Store object with a name of ${storeName}`, () => {
			expect(new Store(storeName).name).toBe(storeName);
		});

		it(`Should create a new Store object with an empty data object`, () => {
			expect(new Store(storeName).data).toEqual({});
		});
	});

	describe("Evaluation of store setter", () => {
		const storeKey = "key";
		const storeValue = { a: 1 };
		const store = new Store("mock");

		it("Should insert a new key into the store", () => {
			store.set(storeKey, storeValue);

			expect(store.data).toEqual({ [storeKey]: storeValue });
			expect(store.data[storeKey]).toEqual(storeValue);
		});

		it("Should overwrite an existing store key when the same key is set", () => {
			const newValue = { b: 2 };
			store.set(storeKey, newValue);

			expect(store.data).toEqual({ [storeKey]: newValue });
			expect(store.data[storeKey]).toEqual(newValue);
		});
	});

	describe("Evaluation of store getter", () => {
		const storeKey = "key";
		const storeValue = { a: 1 };
		const store = new Store("mock");
		const e = "onSuccess"
		it(`Should throw when getting a key prior to registering the ${e} event`, () => {
			store.set(storeKey, storeValue);

			expect(() => {
				store.get(storeKey)
			}).toThrow(`'${e}' event has not been registered`);
		});

		it("Should retrieve a key's corresponding value from the store via the onSuccess event", () => {
			let returnValue;

			store.onSuccess(x => {
				returnValue = x;
			});

			store.get(storeKey);

			expect(returnValue).toEqual(generateEvent("mock", storeValue));
		});

		it("Should throw when getting an invalid key prior to registering the onError event", () => {
			const e = "onError";
			expect(() => {
				store.get("none")
			}).toThrow(`'${e}' event has not been registered`);
		});

		it("Should emit an error when retrieving a non-existent key from the store via the onError event", () => {
			const nonExtantKey = "nope";
			let returnValue;

			store.onError(x => {
				returnValue = x;
			});

			store.get(nonExtantKey);
			const err = generateEvent("mock", new KeyError(nonExtantKey, "mock"));

			expect(returnValue).toEqual(err);
		});
	});
});
