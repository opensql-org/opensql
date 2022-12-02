let BaseSQL = require('../sql/BaseSQL');

class SelectOperation extends BaseSQL {

    queryResult = [];

    injectionResult = [];

    baseQuery() {
        return ['SELECT', this.expressions, 'FROM'];
    }

    queryReplacedForPlaceHolder() {

    }

    pushQueryAndInjection() {

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

    toSQL() {

        this.pushQueryAndInjection();

        return this.queryReplacedForPlaceHolder();

    }

    injection() {

        this.pushQueryAndInjection();

        return this.injectionResult;

    }

}


module.exports = SelectOperation;