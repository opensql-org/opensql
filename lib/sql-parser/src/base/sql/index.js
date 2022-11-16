let Operation = require('./Operation');

class SQLHandler extends Operation {


    toSQL() {
        return this.handleOperationType().toSQL();
    }

    sqlWithPlaceHolder() {
        return this.handleOperationType().sqlWithPlaceHolder();
    }

    injection() {
        return this.handleOperationType().injection();
    }

    handleOperationType() {
        return this[this.sqlConfig.operationType]();
    }


}


module.exports = SQLHandler;