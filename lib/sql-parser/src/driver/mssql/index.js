const SQLHandler = require('../../base/sql');

class Mssql extends SQLHandler {
  databaseType = 'mssql';

  constructor(sqlConfig, command) {
    super(sqlConfig, command);
  }
}

module.exports = Mssql;
