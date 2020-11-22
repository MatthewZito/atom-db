const Database = require("./src/core/Database");

const d = new Database("mock");

const store = d.registerObjectStore("mockStore");

store.onError(error => {
	console.log(error);
});

store.onSuccess(data => {
	console.log(data);
});

store.set("item", { a: "a" });

store.get("item");

store.set("booboo", 9);

store.get("booboo");
