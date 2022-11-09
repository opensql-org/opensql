let Operation = require('Operation');

class SQLHandler extends Operation {


    toSQL() {
        this.operationType().toSQL;
    }

    sqlWithPlaceHolder() {
        this.operationType().sqlWithPlaceHolder;
    }

    injection() {
        this.operationType().injection;
    }

    operationType() {
        return super[this.sqlConfig.operationType](this.command);
    }


}


module.exports = SQLHandler;