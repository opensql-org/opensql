const config = require('../Config');

class TypeHandler {
  #databaseInstance;

  constructor(sqlConfig, command) {
    const listOfSupportedDatabases = config.database.arr.includes(
      sqlConfig?.type,
    );

    if (typeof sqlConfig?.type !== 'string' || !listOfSupportedDatabases) {
      throw Error(
        `Database wasn't support, List of supported databases: ${config.database.arr}`,
      );
    }

    const importClass = require(`../driver/${sqlConfig.type}`);
    this.#databaseInstance = new importClass(sqlConfig, command);
  }

  toSQL() {
    return this.#databaseInstance.toSQL();
  }

  injection() {
    return this.#databaseInstance.injection();
  }
}

module.exports = TypeHandler;
