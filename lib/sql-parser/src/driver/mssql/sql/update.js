let UpdateOperation = require('../../../base/operation/Update'),
    Util = require('../util'),
    Json = require('../util/update/Json');

class Update extends UpdateOperation {

    toSQL() {
        let sql = `UPDATE ${this.from} ` + `SET ${Json.toString(this.datum)} `;

        if (!this.hasWhereCondition)
            return sql.trim();

        let query = this.queryWhereHandler();

        // remove table name
        query.injection.shift();

        sql += `${this.whereSqlKeyword} ${Util.clearSql(`__$COLUMN_NAME$__ ${query.toSQL.trim()}`, query.injection)}`;

        return sql;
    }

    injection() {
        throw new Error('The injection() function hasn\'t support for this database; Use toSQL() function');
    }

}


module.exports = Update;