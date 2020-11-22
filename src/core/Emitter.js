class Emitter {
	constructor() {
		this.handlers = new Map();
	}
	// should always receive string, function args; guarded by extended classes
	subscribe(name, fn) {
		this.handlers.set(name, fn);
	}
	// should always receive string arg; guarded by extended classes
	unsubscribe(name) {
		this.handlers.delete(name);
	}

	emit(name) {
		if (!this.handlers.has(name)) {
			throw new Error(`${name} event has not been registered`);
		}
		return (...args) => {
			this.handlers.get(name)(...args);
		};
	}
}

module.exports = Emitter;
