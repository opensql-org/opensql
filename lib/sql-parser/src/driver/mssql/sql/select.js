let SelectOperation = require('../../../base/operation/Select');

class Select extends SelectOperation {

    queryReplacedForPlaceHolder() {
        let regexPlaceHolder = /__\$(.*?)\$__/,
            index = 0,
            query = this.queryResult.join(' ').split(' ');

        query.forEach((item, i, arr) => {

            if (item === '')
                return;

            if (regexPlaceHolder.test(item)) {
                arr[i] = this.injectionResult[index].value;
                index++;
            }

        });

        return query.join(' ');
    }

}


module.exports = Select;