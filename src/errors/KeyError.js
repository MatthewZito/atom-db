const ValidationError = require("./ValidationError");

class KeyError extends ValidationError {
	constructor(key, store) {
		super(`Key ${key} does not exist in store ${store}`);
		this.name = "KeyError";
		this.key = key;
		this.store = store;
	}
}

module.exports = KeyError;
