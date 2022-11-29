let BaseSQL = require('../sql/BaseSQL');

class SelectOperation extends BaseSQL {

    baseQuery() {
        return ['SELECT', this.expressions, 'FROM'];
    }

    toSQL() {

    }

    sqlWithPlaceHolder() {

    }

    injection() {

    }

}


module.exports = SelectOperation;