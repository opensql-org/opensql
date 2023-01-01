let InsertOperation = require('../../../base/operation/Insert');

class Insert extends InsertOperation {

    toSQL() {
        let sql = `INSERT INTO ${this.from} `;

        if (this.column)
            sql += `(${this.column.toString().split(',').join(', ')}) `;

        return sql;
    }

    injection() {
        throw new Error('The injection() function hasn\'t support for this database; Use toSQL() function');
    }

}


module.exports = Insert;