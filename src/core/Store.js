const KeyError = require("../errors/KeyError");

const {
	throwIfNotFn,
	throwIfNoArgument,
	throwIfInvalidKey
} = require("../utils/typeCheck");

const Emitter = require("./Emitter");

class Store {
	constructor(name = throwIfNoArgument()) {
		this.name = name;
		this.data = {};
		this.emitter = new Emitter();
	}

	onSuccess(fn) {
		throwIfNotFn(fn);
		this.emitter.subscribe("success", fn);
	}

	onError(fn) {
		throwIfNotFn(fn);
		this.emitter.subscribe("error", fn);
	}

	get(key) {
		throwIfInvalidKey(key);
		const data = this.data[key];

		if (!data) this.emitter.emit("error")(new KeyError(key, this.name));

		this.emitter.emit("success")(data);
	}

	set(key, data) {
		throwIfInvalidKey(key);
		this.data[key] = data;
	}
}

module.exports = Store;
