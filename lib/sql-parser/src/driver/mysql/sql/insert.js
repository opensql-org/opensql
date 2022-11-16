let InsertOperation = require('../../../base/operation/Insert');
let Json = require('../../../util/Json');

class Insert extends InsertOperation {

    datum = this.command[0].data;

    jsonHandler = Json.toValue(this.datum);

    operationStatement = !this.sqlConfig?.operation?.insert ? 'one' : this.sqlConfig?.operation?.insert;

    from = this.command[0].from;

    placeHolder(length) {
        return ',?'.repeat(length).replace(',', ' ').trim();
    }

    toSQL() {
        let mapOfSql = {
            one: `INSERT INTO ${this.from} (${this.jsonHandler.column}) ` + `VALUES (${this.jsonHandler.value})`,
            multi: `INSERT INTO ${this.from} ` + `SET ${Json.toString(this.datum)}`
        };

        return mapOfSql[this.operationStatement];
    }

    sqlWithPlaceHolder() {
        let placeHolder = '?',
            mapOfSql = {
                one: () => `INSERT INTO ?? (${placeHolder}) ` + 'VALUES ?',
                multi: () => `INSERT INTO ?? SET ?`
            };

        let isArray = this.jsonHandler > 1;
        if (isArray)
            placeHolder = this.placeHolder(this.jsonHandler.length);

        return mapOfSql[this.operationStatement]();
    }

    injection() {

    }

}


module.exports = Insert;