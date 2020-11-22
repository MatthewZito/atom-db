const generateEvent = (name, value) => ({
	parent: name,
	target: {
		value
	}
});

module.exports = {
	generateEvent
};
