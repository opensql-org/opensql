let UpdateOperation = require('../../../base/operation/Update');
let Json = require('../util/update/Json');

class Update extends UpdateOperation {

    toSQL() {
        return `UPDATE ${this.from} ` +
            `SET ${Json.toString(this.datum)} ${this.hasWhereCondition ? this.queryWhereHandler().toSQL.trim() : ''}`.trim();
    }

    injection() {
        throw new Error('The injection() function hasn\'t support for this database; Use toSQL() function');
    }

}


module.exports = Update;