const UpdateOperation = require('../../../base/operation/Update');
const Json = require('../util/update/Json');
const Util = require('../util');

class Update extends UpdateOperation {
  getDataFromWhereCondition(arr) {
    return Util.clearInjectionArr(arr, true);
  }

  getEitField() {
    return Json.handler(this.datum);
  }

  toSQL() {
    return `UPDATE ?? SET ${this.getEitField().toSQL} ${Util.clearSql(
      this.queryInit().toSQL.trim(),
    )}`.trim();
  }
}

module.exports = Update;
