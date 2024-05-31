const DeleteOperation = require('../../../base/operation/Delete');
const Util = require('../util');

class Delete extends DeleteOperation {
  toSQL() {
    const sql = 'DELETE FROM ' + this.from + ' ';

    const query = this.queryWhereHandler();

    // remove table name
    query.injection.shift();

    return `${sql}${Util.clearSql(query.toSQL.trim(), query.injection)}`.trim();
  }

  injection() {
    throw new Error(
      "The injection() function hasn't support for this database; Use toSQL() function",
    );
  }
}

module.exports = Delete;
