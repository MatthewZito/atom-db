const { isFunction, isArgumentExtant } = require("../utils/typeCheck");
const Emitter = require("./Emitter");

class Store {
	constructor(name = isArgumentExtant()) {
		this.name = name;
		this.data = {};
		this.emitter = new Emitter();
	}

	onSuccess(fn) {
		this.emitter.subscribe("success", fn);
	}

	onError(fn) {
		isFunction(fn);
		this.emitter.subscribe("error", fn);
	}

	get(key) {
		const data = this.data[key];

		if (!data)
			this.emitter.emit("error")(
				new Error(`Key ${key} does not exist in ${this.name}.`)
			);

		this.emitter.emit("success")(data);
	}

	set(key, data) {
		this.data[key] = data;
	}
}

module.exports = Store;
