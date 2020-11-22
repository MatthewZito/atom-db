class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = "ValidationError";
		this.stack = "";
	}
}

module.exports = ValidationError;
