const InsertOperation = require('../../../base/operation/Insert');
const ArrayClass = require('../util/insert/Array');
const Array = new ArrayClass();

class Insert extends InsertOperation {
  arrayHandleToValue = Array.to2DArray(this.datum, this.column?.length);

  toSQL() {
    const mapOfSql = {
      one: `INSERT INTO ?? SET ?`,
      multi:
        `INSERT INTO ${this.from} (${this.column}) ` +
        `VALUES ${this.arrayHandleToValue.value}`,
    };

    return mapOfSql[this.operationStatement];
  }

  injection() {
    const mapOfSql = {
      one: [this.from, this.datum],
      multi: [],
    };

    return mapOfSql[this.operationStatement];
  }
}

module.exports = Insert;
