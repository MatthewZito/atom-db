const Database = require("./core/Database");

module.exports = init = name => new Database(name);
