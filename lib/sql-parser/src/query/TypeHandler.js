let config = require('../Config');

class TypeHandler {

    databaseInstance;

    constructor(sqlConfig, command) {
        let databaseTypeInConfigObject = config.database.obj[sqlConfig?.type];
        if (typeof sqlConfig?.type !== 'string' || !databaseTypeInConfigObject)
            throw Error(`Database wasn't support, List of supported databases: ${config.database.arr}`);

        let importClass = require(`../driver/${databaseTypeInConfigObject}`);
        this.databaseInstance = new importClass(sqlConfig, command);
    }

    toSQL() {
        return this.databaseInstance.toSQL();
    }

    sqlWithPlaceHolder() {
        return this.databaseInstance.sqlWithPlaceHolder();
    }

    injection() {
        return this.databaseInstance.injection();
    }


}

module.exports = TypeHandler;