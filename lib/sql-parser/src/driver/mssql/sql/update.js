let UpdateOperation = require('../../../base/operation/Update'),
    Util = require('../util'),
    Json = require('../util/update/Json');

class Update extends UpdateOperation {

    toSQL() {
        let sql = `UPDATE ${this.from} ` + `SET ${Json.toString(this.datum)} `;

        let query = this.queryWhereHandler();

        // remove table name
        query.injection.shift();


        return `${sql}${Util.clearSql(query.toSQL.trim(), query.injection)}`.trim();
    }

    injection() {
        throw new Error('The injection() function hasn\'t support for this database; Use toSQL() function');
    }

}


module.exports = Update;