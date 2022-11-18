let InsertOperation = require('../../../base/operation/Insert');
let Json = require('../../../util/Json');
let Array = require('../../../util/Array');

class Insert extends InsertOperation {

    jsonHandleToValue = Json.toValue(this.datum);

    arrayHandleToString = Array.toString(this.datum, this.column?.length);

    arrayHandleToValue = Array.to2DArray(this.datum, this.column?.length);

    placeHolder(length) {
        return ', ?'.repeat(length).replace(',', ' ').trim();
    }

    toSQL() {
        let mapOfSql = {
            one: `INSERT INTO ${this.from} ` + `SET ${Json.toString(this.datum, this.column?.length)}`,
            multi: `INSERT INTO ${this.from} (${Array.isArray(this.datum) ? this.column : this.jsonHandleToValue.column}) ` +
                `VALUES (${Array.isArray(this.datum) ? this.arrayHandleToString : this.jsonHandleToValue.value})`
        };

        return mapOfSql[this.operationStatement];
    }

    sqlWithPlaceHolder() {
        let placeHolder = '?',
            mapOfSql = {
                one: () => `INSERT INTO ?? SET ?`,
                multi: () => `INSERT INTO ?? (${placeHolder}) ` + 'VALUES ?'
            };

        let isArray = this.column.length > 1;

        if (isArray)
            placeHolder = this.placeHolder(this.column.length);

        return mapOfSql[this.operationStatement]();
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