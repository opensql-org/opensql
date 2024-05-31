const UpdateOperation = require('../../../base/operation/Update');
const Json = require('../util/update/Json');
const Util = require('../util');

class Update extends UpdateOperation {
  toSQL() {
    const sql = `UPDATE ${this.from} ` + `SET ${Json.toString(this.datum)} `;

    const query = this.queryWhereHandler();

    // remove table name
    query.injection.shift();

    return `${sql}${Util.clearSql(query.toSQL.trim(), query.injection)}`.trim();
  }

  injection() {
    throw new Error(
      "The injection() function hasn't support for this database; Use toSQL() function",
    );
  }
}

module.exports = Update;
