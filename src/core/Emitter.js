class Emitter {
	constructor() {
		this.handlers = new Map();
	}

	subscribe(name, fn) {
		this.handlers.set(name, fn);
	}

	unsubscribe(name, fn) {
		this.handlers.delete(name);
	}

	emit(name) {
		if (!this.handlers.has(name)) {
			throw new Error(`${name} event has not been registered.`);
		}
		return (...args) => {
			this.handlers.get(name)(...args);
		};
	}
}

module.exports = Emitter;
