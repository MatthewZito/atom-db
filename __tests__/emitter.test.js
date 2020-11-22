const Emitter = require("../src/core/Emitter.js");

describe("Evaluation of Emitter class", () => {
	describe("Evaluation of Emitter instantiation", () => {
		const e = new Emitter();
		it("Should have a Map property", () => {
			expect(e.handlers).toEqual(new Map());
		});
	});
	// TODO handle re-subscription
	describe("Evaluation of Emitter event subscription", () => {
		const emitter = new Emitter();

		it("Should register an event", () => {
			const fn = () => {};
			emitter.subscribe("success", fn);

			expect(emitter.handlers.has("success")).toBe(true);
		});

		it("Should unregister an event", () => {
			emitter.unsubscribe("success");

			expect(emitter.handlers.has("success")).toBe(false);
		});
	});

	describe("Evaluation of Emitter event emitting", () => {
		const emitter = new Emitter();

		const fnMock = jest.fn();
		const argMock = "A";
		emitter.subscribe("success", fnMock);

		const fnMockTwo = jest.fn();
		emitter.subscribe("error", fnMockTwo);

		it("Should fire an event when emitted", () => {
			emitter.emit("success")(argMock);

			expect(fnMock).toHaveBeenCalledTimes(1);
			expect(fnMock).toHaveBeenCalledWith(argMock);
		});

		it("Should not fire an event that has not explicitly been emitted", () => {
			expect(fnMockTwo).toHaveBeenCalledTimes(0);
		});

		it("Should unregister an event", () => {
			emitter.unsubscribe("success");

			expect(emitter.handlers.has("success")).toBe(false);
		});

		it("Should only unregister a specified event", () => {
			emitter.unsubscribe("success");

			expect(emitter.handlers.has("success")).toBe(false);
			expect(emitter.handlers.has("error")).toBe(true);
		});

		it("Should throw an error if an event that has not been registered is emitted", () => {
			const shouldFail = "success";

			expect(() => {
				emitter.emit(shouldFail)
			}).toThrow(`'on${shouldFail.charAt(0).toUpperCase() + shouldFail.slice(1)}' event has not been registered`);
		});
	});
});
