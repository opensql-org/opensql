let UpdateOperation = require('../../../base/operation/Update'),
    Json = require('../util/update/Json'),
    Util = require('../util');

class Update extends UpdateOperation {

    getDataFromWhereCondition(arr) {
        return Util.clearInjectionArr(arr, true);
    }

    getEitField() {
        return Json.handler(this.datum);
    }

    toSQL() {
        return `UPDATE ?? SET ${this.getEitField().toSQL} ${this.hasWhereCondition ?
            `${this.whereSqlKeyword} ?? ${Util.clearSql(this.queryInit().toSQL.trim())}` : ''}`.trim();
    }

}


module.exports = Update;