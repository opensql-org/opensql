class Query {

    databaseType = '';

    sqlConfig;

    command;

    handle() {
        let SqlBuilder = require(`../../driver/${this.databaseType}/sql/${this.sqlConfig.operationType}`);
        return new SqlBuilder(this.command);
    }

}

module.exports = Query;