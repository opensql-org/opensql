const Query = require('./src/query');

class SqlParser extends Query {

    constructor(sqlConfig, command) {
        super(sqlConfig, command);
    }

}

module.exports = SqlParser;