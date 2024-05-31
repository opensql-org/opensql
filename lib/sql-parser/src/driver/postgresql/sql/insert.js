const InsertOperation = require('../../../base/operation/Insert');
const ArrayClass = require('../util/insert/Array');
const Json = require('../util/insert/Json');
const Array = new ArrayClass();

class Insert extends InsertOperation {
  jsonHandler = Json.handler(this.datum);

  arrayHandler = Array.handler(this.datum, this.column?.length);

  toSQL() {
    const mapOfSql = {
      one:
        `INSERT INTO ${this.from} (${this.jsonHandler.toColumn}) ` +
        `VALUES (${this.jsonHandler.toPlaceHolder})`,
      multi:
        `INSERT INTO ${this.from} (${
          Array.isArray(this.datum)
            ? this.column.join(', ')
            : this.jsonHandler.toColumn
        }) ` +
        `VALUES ${
          Array.isArray(this.datum)
            ? this.arrayHandler.toPlaceHolder
            : this.jsonHandler.toPlaceHolder
        }`,
    };

    return mapOfSql[this.operationStatement];
  }

  injection() {
    return Array.isArray(this.datum) ? this.datum : this.jsonHandler.toArray;
  }
}

module.exports = Insert;
