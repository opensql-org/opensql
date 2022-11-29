let SelectOperation = require('../../../base/operation/Select');

class Select extends SelectOperation {

    toSQL() {

    }

    sqlWithPlaceHolder() {
        let queryResult = [];

        queryResult.push(this.baseQuery().join(' ') + ' ?? ' + this.queryHandler().toSQL);

        if (this.union)
            this.union.forEach(item => {
                this.validateObject(item.value);
                this.addUnionKeyword(item.type);
                queryResult.push(this.queryHandler().toSQL);
            });


        return queryResult.join(' ')
            .replaceAll('__$TABLE_NAME$__', '??')
            .replaceAll('__$COLUMN_NAME$__', '??');
    }

    injection() {

    }

}


module.exports = Select;