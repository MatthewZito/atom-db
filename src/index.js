const Database = require("./core/Database");

const init = name => new Database(name);

module.exports = init;
