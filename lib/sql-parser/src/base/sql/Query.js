class Query {
  databaseType = '';
  sqlConfig;
  command;

  constructor(sqlConfig, command) {
    this.sqlConfig = sqlConfig;
    this.command = command;
  }

  handle() {
    const SqlBuilder = require(
      `../../driver/${this.databaseType}/sql/${this.sqlConfig.operationType}`,
    );
    return new SqlBuilder(this.command, this.sqlConfig, this.databaseType);
  }
}

module.exports = Query;
