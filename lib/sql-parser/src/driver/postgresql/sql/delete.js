const DeleteOperation = require('../../../base/operation/Delete');
const Util = require('../util');

class Delete extends DeleteOperation {
  toSQL() {
    const sql = 'DELETE FROM ' + this.from + ' ';

    const query = this.queryWhereHandler();

    return `${sql}${Util.toSQL(query.toSQL, query.injection, 1)}`.trim();
  }

  injection() {
    return Util.clearInjectionArr(this.queryWhereHandler().injection);
  }
}

module.exports = Delete;
