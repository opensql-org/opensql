let BaseSQL = require('../sql/BaseSQL');

class SelectOperation extends BaseSQL {

    injectionResult = [];

    baseQuery() {
        return ['SELECT', this.expressions, 'FROM'];
    }

    toSQL() {

    }

    queryReplacedForPlaceHolder() {

    }

    pushQueryAndInjection() {

    }

    pushQueryAndInjectionWhenHaveUnionObject() {

    }

    sqlWithPlaceHolder() {

        this.pushQueryAndInjection();

        this.pushQueryAndInjectionWhenHaveUnionObject();

        return this.queryReplacedForPlaceHolder();

    }

    injection() {

        this.pushQueryAndInjection();

        this.pushQueryAndInjectionWhenHaveUnionObject();

        return this.injectionResult;
    }

}


module.exports = SelectOperation;