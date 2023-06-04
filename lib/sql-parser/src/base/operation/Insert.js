let BaseSQL = require('../../base/sql/BaseSQL');

class InsertOperation extends BaseSQL {

    constructor(command, sqlConfig, databaseName) {
        super(command, sqlConfig, databaseName);
        this.operationStatement = this.sqlConfig?.operation?.insert ?? 'one';
    }

    toSQL() {

    }

    injection() {

    }

}


module.exports = InsertOperation;