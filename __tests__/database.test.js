const Database = require("../src/core/Database.js");

describe("Evaluation of Database class", () => {
	describe("Evaluation of database instantiation", () => {
		const dbName = "test";

		it("Should throw an error when missing required argument 'name'", () => {
			expect(() =>
				new Database().toThrow("Missing required constructor argument.")
			);
		});

		it(`Should create a new Database object with a name of ${dbName}`, () => {
			expect(new Database(dbName).name).toBe(dbName);
		});

		it(`Should create a new Database object with an empty stores array`, () => {
			expect(new Database(dbName).stores.length).toEqual(0);
		});
	});

	describe("Evaluation of database store registration", () => {
		const storeName = "test";
		const db = new Database("mock");
		it("Should register a new store, assuming said store is not extant", () => {
			const store = db.registerObjectStore(storeName);

			expect(store.name).toEqual(storeName);
			expect(store.data).toEqual({});
			expect(db.stores.length).toEqual(1);
		});

		it("Should throw an error when registering an existing store", () => {
			expect(() => db
				.registerObjectStore(storeName)
				.toThrow(`Store ${storeName} has already been registered.`));
		});

		it("Should find the specified store index", () => {
			expect(db._findStore(storeName)).toEqual(0);
			expect(db._findStore("no")).toEqual(-1);
		});
	});
});
