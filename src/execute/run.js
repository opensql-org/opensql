let {
        query
    } = require('../DatabaseConnection'),
    {
        setNullValueInRam
    } = require('../util/Utilites');

let sql;

module.exports = {


    run(sqlQuery, inject = null) {
        query(sqlQuery, inject);
        sql = sqlQuery;
        setNullValueInRam();
    },

    getSqlQuery() {
        return sql;
    }

}