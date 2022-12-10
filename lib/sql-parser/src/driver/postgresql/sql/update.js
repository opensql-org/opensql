let UpdateOperation = require('../../../base/operation/Update'),
    Util = require('../util'),
    Json = require('../util/update/Json');

class Update extends UpdateOperation {


    getDataFromWhereCondition(arr) {
        return Util.clearInjectionArr(arr, true);
    }

    getEitField() {
        return Json.handler(this.datum);
    }

    toSQL() {
        let editField = this.getEitField(),
            sql = `UPDATE ${this.from}` + ` SET ${editField.toSQL} `,
            indexForPlaceHolder = editField.indexForPlaceHolder;

        let query = this.queryInit();

        return `${sql}${Util.toSQL(query.toSQL, query.injection, indexForPlaceHolder)}`.trim();
    }

    injection() {
        let newArr = super.injection();
        newArr.shift();
        return newArr;
    }

}


module.exports = Update;