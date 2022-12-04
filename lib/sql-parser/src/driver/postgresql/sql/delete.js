let DeleteOperation = require('../../../base/operation/Delete'),
    Util = require('../util');

class Delete extends DeleteOperation {

    toSQL() {
        let sql = `DELETE FROM ${this.from} `;

        if (!this.hasWhereCondition)
            return sql.trim();

        let query = this.queryWhereHandler();

        return `${sql}${this.whereSqlKeyword} ${Util.toSQL(`__$COLUMN_NAME$__ ${query.toSQL}`, query.injection, 1)}`;
    }

    injection() {
        return Util.clearInjectionArr(this.queryWhereHandler().injection);
    }

}


module.exports = Delete;