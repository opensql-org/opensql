let SelectOperation = require('../../../base/operation/Select');

class Select extends SelectOperation {

    queryResult = [];

    injectionResult = [];

    queryReplacedForPlaceHolder() {
        return this.queryResult.join(' ')
            .replaceAll('__$TABLE_NAME$__', '??')
            .replaceAll('__$COLUMN_NAME$__', '??')
            .replaceAll('__$VALUE$__', '?')
            .replaceAll('__$OPTION_VALUE$__', '?')
            .replaceAll('__$OPTION_COLUMN$__', '?');
    }

    pushQueryAndInjection() {
        let query = this.queryHandler();
        this.queryResult.push(this.baseQuery().join(' ') + ` ??${!!this.union ? ' ' : ''}` + query.toSQL);
        this.injectionResult.push(query.injection);
    }

    pushQueryAndInjectionWhenHaveUnionObject() {
        if (this.union)
            this.union.forEach(item => {
                this.validateObject(item.value);
                this.addUnionKeyword(item.type);
                let query = this.queryHandler();
                this.queryResult.push(query.toSQL);
                this.injectionResult.push(query.injection);
            });
    }

}


module.exports = Select;