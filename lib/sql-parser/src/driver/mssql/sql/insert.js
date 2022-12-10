let InsertOperation = require('../../../base/operation/Insert');
let Json = require('../util/insert/Json');
let ArrayClass = require('../util/insert/Array');
let Array = new ArrayClass();

class Insert extends InsertOperation {


    jsonHandler = Json.handler(this.datum);

    arrayHandler = Array.handler(this.datum, this.column?.length);

    toSQL() {
        let mapOfSql = {
            one: `INSERT INTO ${this.from} (${this.jsonHandler.toColumn}) ` + `VALUES (${this.jsonHandler.toValue})`,
            multi: `INSERT INTO ${this.from} (${Array.isArray(this.datum) ? this.column.join(', ') : this.jsonHandler.toColumn}) ` +
                `VALUES ${Array.isArray(this.datum) ? this.arrayHandler.toValue : this.jsonHandler.toValue}`
        };

        return mapOfSql[this.operationStatement];
    }

    injection() {
        throw new Error('The injection() function hasn\'t support for this database; Use toSQL() function');
    }

}


module.exports = Insert;