class InsertOperation {

    command = [];

    sqlConfig = {};

    operationStatement;

    from;

    column;

    datum;

    constructor(command, sqlConfig) {
        this.command = command;
        this.from = this.command[0].from;
        this.column = this.command[0].get;
        this.datum = this.command[0].data;
        this.sqlConfig = sqlConfig;
        this.operationStatement = !this.sqlConfig?.operation?.insert ? 'one' : this.sqlConfig?.operation?.insert;
    }

    toSQL() {

    }

    sqlWithPlaceHolder() {

    }

    injection() {

    }

}


module.exports = InsertOperation;