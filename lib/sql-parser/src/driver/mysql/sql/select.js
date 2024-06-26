const SelectOperation = require('../../../base/operation/Select');
const Util = require('../util');

class Select extends SelectOperation {
  queryReplacedForPlaceHolder() {
    return Util.clearSql(this.queryResult.join(' '));
  }

  injection() {
    return Util.clearInjectionArr(super.injection());
  }
}

module.exports = Select;
