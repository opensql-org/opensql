const SelectOperation = require('../../../base/operation/Select');
const Util = require('../util');

class Select extends SelectOperation {
  queryReplacedForPlaceHolder() {
    return Util.clearSql(this.queryResult.join(' '), this.injectionResult);
  }

  injection() {
    return Util.clearInjectionArr(super.injection(), true);
  }
}

module.exports = Select;
