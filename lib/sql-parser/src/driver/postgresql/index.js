const SQLHandler = require('../../base/sql');

class Postgresql extends SQLHandler {
  databaseType = 'postgresql';

  constructor(sqlConfig, command) {
    super(sqlConfig, command);
  }
}

module.exports = Postgresql;
