const { isFunction, isString, isNumber } = require("./isType");
const ValidationError = require("../errors/ValidationError");

const throwIfNotFn = prospect => {
	if (!isFunction(prospect))
		throw new ValidationError(`${prospect} is not a function`);
};

const throwIfInvalidKey = prospect => {
	if (!isString(prospect) && !isNumber(prospect)) {
		throw new ValidationError(
			`'${prospect}' is not a valid key. Must be a string or number`
		);
	}
};

const throwIfNoArgument = () => {
	throw new ValidationError("Missing required constructor argument");
};

module.exports = {
	throwIfNotFn,
	throwIfInvalidKey,
	throwIfNoArgument
};
