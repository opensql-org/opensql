const Query = require('./src/query');

class SqlParser extends Query {

    constructor(sqlConfig, ...command) {
        super();
        super.sqlConfig = sqlConfig;
        super.command = command;
    }

}

module.exports = SqlParser