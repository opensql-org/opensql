let mysql = require('mysql'),
    {
        DatabaseConnectionError
    } = require('./exception/DatabaseConnectionError');

let queryResult;
let con;

module.exports = {

    connect(object) {
        if (object !== undefined) {

            let charset = object['charset'];

            if (charset === undefined)
                charset = 'utf8mb4';

            object['multipleStatements'] = true;

            con = mysql.createConnection(object);

        }
    },

    query(sql, arrayObjects) {

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


    sqlQueryResult(callBackResult) {
        queryResult = (result => {
            callBackResult(result);
        });
    }

}