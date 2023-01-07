let InsertOperation = require('../../../base/operation/Insert');
let ArrayClass = require('../util/insert/Array');
let Array = new ArrayClass();

class Insert extends InsertOperation {

    arrayHandleToValue = Array.to2DArray(this.datum, this.column?.length);

    toSQL() {
        let mapOfSql = {
            one: `INSERT INTO ?? SET ?`,
            multi: `INSERT INTO ${this.from} (${this.column}) ` + `VALUES ${this.arrayHandleToValue.value}`
        };

        return mapOfSql[this.operationStatement];
    }

    injection() {
        let mapOfSql = {
            one: [this.from, this.datum],
            multi: []
        };

        return mapOfSql[this.operationStatement];
    }

}


module.exports = Insert;