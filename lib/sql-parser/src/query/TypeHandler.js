let config = require('../Config');

class TypeHandler {

    sqlConfig;

    command = [];

    databaseInstance

    constructor() {
        let databaseTypeInConfigObject = config.database.obj[this.sqlConfig?.type];
        if (typeof this.sqlConfig?.type !== 'string' || !databaseTypeInConfigObject)
            throw Error(`Database wasn't support, List of supported databases: ${config.database.arr}`);

        let importClass = require(`../driver/${databaseTypeInConfigObject}`);
        this.databaseInstance = new importClass(this.sqlConfig, this.command);
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