const SelectOperation = require('../../../base/operation/Select');
const Util = require('../util');

class Select extends SelectOperation {
  queryReplacedForPlaceHolder() {
    return Util.clearSql(this.queryResult.join(' '), this.injectionResult);
  }

  injection() {
    throw new Error(
      "The injection() function hasn't support for this database; Use toSQL() function",
    );
  }
}

module.exports = Select;
