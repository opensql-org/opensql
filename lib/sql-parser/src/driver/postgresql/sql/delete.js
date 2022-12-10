let DeleteOperation = require('../../../base/operation/Delete'),
    Util = require('../util');

class Delete extends DeleteOperation {

    toSQL() {
        let sql = `DELETE FROM ${this.from} `;

        let query = this.queryWhereHandler();

        return `${sql}${Util.toSQL(query.toSQL, query.injection, 1)}`.trim();
    }

    injection() {
        return Util.clearInjectionArr(this.queryWhereHandler().injection);
    }

}


module.exports = Delete;