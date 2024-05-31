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
        `VALUES (${this.jsonHandler.toValue})`,
      multi:
        `INSERT INTO ${this.from} (${
          Array.isArray(this.datum)
            ? this.column.join(', ')
            : this.jsonHandler.toColumn
        }) ` +
        `VALUES ${
          Array.isArray(this.datum)
            ? this.arrayHandler.toValue
            : this.jsonHandler.toValue
        }`,
    };

    return mapOfSql[this.operationStatement];
  }

  injection() {
    throw new Error(
      "The injection() function hasn't support for this database; Use toSQL() function",
    );
  }
}

module.exports = Insert;
