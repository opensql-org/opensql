let InsertOperation = require('../../../base/operation/Insert');
let ArrayClass = require('../util/insert/Array');
let Array = new ArrayClass();

class Insert extends InsertOperation {

    arrayHandleToValue = Array.to2DArray(this.datum, this.column?.length);

    toSQL() {
        let mapOfSql = {
            one: `INSERT INTO ?? SET ?`,
            multi: `INSERT INTO ?? (??) ` + 'VALUES (?)'
        };

        return mapOfSql[this.operationStatement];
    }

    injection() {
        let mapOfSql = {
            one: () => this.datum,
            multi: () => {
                let arr = this.arrayHandleToValue.value;
                arr.unshift(this.from, this.column);
                return arr;
            }
        };

        return mapOfSql[this.operationStatement]();
    }

}


module.exports = Insert;