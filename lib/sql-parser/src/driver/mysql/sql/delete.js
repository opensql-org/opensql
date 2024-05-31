const DeleteOperation = require('../../../base/operation/Delete');
const Util = require('../util');

class Delete extends DeleteOperation {
  toSQL() {
    return `DELETE FROM ?? ${Util.clearSql(
      this.queryWhereHandler().toSQL.trim(),
    )}`.trim();
  }

  injection() {
    return Util.clearInjectionArr(this.queryWhereHandler().injection);
  }
}

module.exports = Delete;
