let BaseSQL = require('../sql/BaseSQL');

class SelectOperation extends BaseSQL {

    queryResult = [];

    injectionResult = [];

    baseQuery() {
        return ['SELECT', this.expressions, 'FROM'];
    }

    toSQL() {

    }

    queryReplacedForPlaceHolder() {

    }


    pushQueryAndInjectionWhenHaveUnionObject() {

        let query = this.queryHandler();
        this.queryResult.push([this.baseQuery().join(' '), `__$TABLE_NAME$__${this.hasWhereCondition && !this.union ? ` ${this.whereSqlKeyword} __$COLUMN_NAME$__` : ''}`, query.toSQL].join(' ').trim());
        this.injectionResult.push(...query.injection);

        if (this.union)
            this.union.forEach(item => {
                this.validateObject(item.value);
                this.addUnionKeyword(item.type);
                let query = this.queryHandler();
                this.queryResult.push(query.toSQL);
                this.injectionResult.push(...query.injection);
            });
    }

    sqlWithPlaceHolder() {

        this.pushQueryAndInjectionWhenHaveUnionObject();

        return this.queryReplacedForPlaceHolder();

    }

    injection() {

        this.pushQueryAndInjectionWhenHaveUnionObject();

        return this.injectionResult;

    }

}


module.exports = SelectOperation;