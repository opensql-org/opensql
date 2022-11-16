class Query {

    constructor(sqlConfig, command) {
        this.sqlConfig = sqlConfig;
        this.command = command;
    }

    databaseType = '';

    sqlConfig;

    command;

    handle() {
        let SqlBuilder = require(`../../driver/${this.databaseType}/sql/${this.sqlConfig.operationType}`);
        return new SqlBuilder(this.command, this.sqlConfig);
    }

}

module.exports = Query;