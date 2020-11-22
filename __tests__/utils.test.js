const {
	throwIfNotFn,
	throwIfNoArgument
} = require("../src/utils/typeCheck.js");

const notFunctions = [
	"string",
	["1", "2", 3],
	{ m: 1, b: 4 },
	{ fn: () => {} },
	null,
	undefined,
	9
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
				expect(() => throwIfNotFn(item).toThrow(`${item} is not a function.`));
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
			expect(() => throwIfNoArgument().toThrow("Missing required constructor argument."));
		});
	});
});
