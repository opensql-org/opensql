let Operation = require('Operation');

class SQLHandler extends Operation {


    toSQL() {
        this.handleOperationType().toSQL;
    }

    sqlWithPlaceHolder() {
        this.handleOperationType().sqlWithPlaceHolder;
    }

    injection() {
        this.handleOperationType().injection;
    }

    handleOperationType() {
        return super[this.sqlConfig.operationType]();
    }


}


module.exports = SQLHandler;