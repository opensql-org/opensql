let SQLHandler = require('../../base/sql')

class Mysql extends SQLHandler {

    databaseType = 'mysql';

    constructor(sqlConfig, command) {
        super(sqlConfig, command);
    }


}


module.exports = Mysql;