let mysql = require('mysql'),
    {
        DatabaseConnectionError
    } = require('./exception/DatabaseConnectionError');

const POINTER_FOR_USE_DB = 'USE_DB_?';

function isPointerForUseDbDefined(str) {
    return str.search(POINTER_FOR_USE_DB) === 0;
}

function replacePointerForUseDbToSpace(str) {
    return str.replace(POINTER_FOR_USE_DB, '').trim();
}

let queryResult;
let databaseName;
let con;

module.exports = {

    connect(object) {
        if (object !== undefined) {

            let charset = object['charset'];

            if (charset === undefined)
                charset = 'utf8mb4';

            object['multipleStatements'] = true;

        }
        if (object['database'] !== undefined)
            databaseName = object['database'];

        con = mysql.createConnection(object);
    },

    query(sql, arrayObjects) {

        if (isPointerForUseDbDefined(sql)) {
            sql = module.exports.getDatabaseName() + replacePointerForUseDbToSpace(sql);
        }

        try {
            con.query(sql, arrayObjects, (err, result) => {

                (function (cb) {
                    if (typeof cb === 'function')
                        cb((err !== null) ? err : result);
                })(queryResult);

            });
        } catch (e) {
            DatabaseConnectionError(e);
        }

    },


    getDatabaseName() {
        return (databaseName !== undefined) ? `USE ${databaseName}; ` : '';
    },


    sqlQueryResult(callBackResult) {
        queryResult = (result => {
            callBackResult(result);
        });
    }

}