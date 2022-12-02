let SelectOperation = require('../../../base/operation/Select');

class Select extends SelectOperation {

    queryReplacedForPlaceHolder() {
        return this.queryResult.join(' ')
            .replaceAll('__$TABLE_NAME$__', '??')
            .replaceAll('__$COLUMN_NAME$__', '??')
            .replaceAll('__$VALUE$__', '?')
            .replaceAll('__$OPTION_VALUE$__', '?')
            .replaceAll('__$OPTION_COLUMN$__', '?');
    }

    injection() {
        let clearInjectionArr = [];
        super.injection().forEach(item => {
            clearInjectionArr.push(item.value);
        });
        return clearInjectionArr;
    }

}


module.exports = Select;