let DeleteOperation = require('../../../base/operation/Delete'),
    Util = require('../util');

class Delete extends DeleteOperation {

    toSQL() {
        let sql = `DELETE FROM ${this.from} `;

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


module.exports = Delete;