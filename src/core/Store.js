const KeyError = require("../errors/KeyError");
const { generateEvent } = require("../utils/generateEventObject");

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
		return this;
	}

	onError(fn) {
		throwIfNotFn(fn);
		this.emitter.subscribe("error", fn);
		return this;
	}

	get(key) {
		throwIfInvalidKey(key);
		const data = this.data[key];

		if (data === undefined || data === null) {
			this.emitter.emit("error")(
				(name => generateEvent(name, new KeyError(key, name)))(
					this.name
				)
			);
		} else {
			this.emitter.emit("success")(generateEvent(this.name, data));
		}
		return data;
	}

	set(key, data) {
		throwIfInvalidKey(key);
		this.data[key] = data;
		return this;
	}
}

module.exports = Store;
