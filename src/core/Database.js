const Store = require("./Store");

class Database {
    constructor(name) {
        this.name = name;
        this.stores = [];
    }

    registerObjectStore(name) {
        const idx = this._findStore(name);
        if (idx !== -1) {
            throw new Error(`Store ${name} has already been registered.`);
        }
        const store = this._createStore(name);
        this.stores.push(store); 
        return store;
    }

    _createStore = name => new Store(name);
    _findStore = name => this.stores.findIndex(store => store.name === name);
    
}

module.exports = Database;