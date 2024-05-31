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
    const editField = this.getEitField();
    const sql = `UPDATE ${this.from}` + ` SET ${editField.toSQL} `;
    const indexForPlaceHolder = editField.indexForPlaceHolder;
    const query = this.queryInit();

    return `${sql}${Util.toSQL(
      query.toSQL,
      query.injection,
      indexForPlaceHolder,
    )}`.trim();
  }

  injection() {
    const newArr = super.injection();
    newArr.shift();
    return newArr;
  }
}

module.exports = Update;
