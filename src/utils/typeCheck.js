const isFunction = prospect => {
	if (typeof prospect !== "function")
		throw new Error(`${prospect} is not a function.`);
};

const isArgumentExtant = () => {
	throw new Error("Missing required constructor argument.");
};

module.exports = {
	isFunction,
	isArgumentExtant
};
