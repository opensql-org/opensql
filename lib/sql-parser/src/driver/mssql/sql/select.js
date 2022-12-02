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
                let obj = this.injectionResult[index];

                if (obj?.type === 'VALUE' && typeof obj?.value === 'string')
                    obj.value = `"${obj.value}"`;


                if (obj?.type === 'VALUE' && Array.isArray(obj?.value))
                    obj.value = obj.value.map(element => {
                        if (typeof element === 'string')
                            return `"${element}"`;
                        return element;
                    });


                if (obj?.value)
                    arr[i] = obj?.value;


                index++;
            }

        });


        return query.join(' ');
    }

    injection() {
        throw new Error('The injection() function hasn\'t support for this database; Use toSQL() function');
    }

}


module.exports = Select;