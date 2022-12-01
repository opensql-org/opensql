let SelectOperation = require('../../../base/operation/Select');

class Select extends SelectOperation {

    queryReplacedForPlaceHolder() {
        let indexForValue = 1,
            indexForTableOrColumn = 0,
            regexPlaceHolder = /__\$(.*?)\$__/,
            mapOfPlaceHolder = {
                __$VALUE$__: () => `$${indexForValue}`,
                __$OPTION_VALUE$__: () => `$${indexForValue}`,
                __$OPTION_COLUMN$__: () => `$${indexForValue}`
            },
            query = this.queryResult.join(' ').split(' ');

        query.forEach((item, i, arr) => {

            if (item === '')
                return;

            if (typeof mapOfPlaceHolder?.[item] === 'function') {
                arr[i] = mapOfPlaceHolder[item]();
                indexForValue++;
                indexForTableOrColumn++;
                return;
            }

            if (regexPlaceHolder.test(item) && (this.injectionResult[indexForTableOrColumn].type === 'COLUMN' || 'TABLE')) {
                arr[i] = this.injectionResult[indexForTableOrColumn].value;
                indexForTableOrColumn++;
            }
        });

        return query.join(' ');
    }

}


module.exports = Select;