let DeleteOperation = require('../../../base/operation/Delete'),
    Util = require('../util');

class Delete extends DeleteOperation {

    toSQL() {
        let sql = 'DELETE' + ` FROM ${this.from} `;

        let query = this.queryWhereHandler();

        // remove table name
        query.injection.shift();

        return `${sql}${Util.clearSql(query.toSQL.trim(), query.injection)}`.trim();
    }

    injection() {
        throw new Error('The injection() function hasn\'t support for this database; Use toSQL() function');
    }

}


module.exports = Delete;