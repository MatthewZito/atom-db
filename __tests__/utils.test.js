const {
	throwIfNotFn,
	throwIfNoArgument,
	throwIfInvalidKey
} = require("../src/utils/typeCheck.js");

const { generateEvent } = require("../src/utils/generateEventObject.js");

const notFunctions = [
	"string",
	["1", "2", 3],
	{ m: 1, b: 4 },
	{ fn: () => {} },
	null,
	undefined,
	9
];

const notStringOrNum = [
	{},
	[],
	null,
	undefined,
	() => {}
];

function fnDec() {
	return;
}

const fnArr = () => {};

const fnExpr = function () {
	return;
};

const fnCon = new Function("a", "b", "return a + b");

describe("Evaluation of package utilities", () => {
	describe("Evaluation of function type-check", () => {
		it("Should throw an error when provided a non-function argument", () => {
			notFunctions.forEach(item => {
				expect(() => {
					throwIfNotFn(item)
				}).toThrow(`'${item}' is not a function`);
			});
		});

		it("Should return when provided an arrow function", () => {
			expect(throwIfNotFn(fnArr)).toBeUndefined();
		});

		it("Should return when provided a function declaration", () => {
			expect(throwIfNotFn(fnDec)).toBeUndefined();
		});

		it("Should return when provided a function expression", () => {
			expect(throwIfNotFn(fnExpr)).toBeUndefined();
		});

		it("Should return when provided a function constructor", () => {
			expect(throwIfNotFn(fnCon)).toBeUndefined();
		});
	});

	describe("Evaluation of argument exception trigger", () => {
		it("Should throw an error when called", () => {
			expect(() => {
				throwIfNoArgument()
			}).toThrow("Missing required constructor argument");
		});
	});

	describe("Evaluation of event object generation", () => {
		it("Should generate an event object with properties 'parent', 'target', and 'value'", () => {
			const nameSpace = "mock";
			const returnValue = "test";
			const e = generateEvent(nameSpace, returnValue);

			expect(e).toHaveProperty("parent", nameSpace);
			expect(e.parent).toEqual(nameSpace);
			expect(e.target).toHaveProperty("value");
			expect(e.target).toHaveProperty("value", returnValue);
			expect(e.target.value).toBe(returnValue);
		});
	});

	describe("Evaluation of key type-checking", () => {
		it("Should throw an error if the key is not of types String or Number", () => {
			notStringOrNum.forEach(item => {
				expect(() => {
					throwIfInvalidKey(item)
				}).toThrow(`'${item}' is not a valid key. Must be a string or number`);
			});
		});
	});
});
