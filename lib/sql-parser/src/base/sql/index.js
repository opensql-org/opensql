let Operation = require('./Operation');

class SQLHandler extends Operation {


    toSQL() {
        return this.handleOperationType().toSQL();
    }

    injection() {
        return this.handleOperationType().injection();
    }

    handleOperationType() {
        return this[this.sqlConfig.operationType]();
    }


}


module.exports = SQLHandler;