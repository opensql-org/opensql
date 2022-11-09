let SQLHandler = require('../../base/sql')

class Mysql extends SQLHandler {

    databaseType = 'mysql';

    constructor(sqlConfig, command) {
        super();
        super.sqlConfig = sqlConfig;
        super.command = command;
    }


}


module.exports = Mysql;