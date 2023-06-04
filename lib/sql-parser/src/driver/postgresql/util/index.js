module.exports = {

    clearInjectionArr(arr, hasDelTable) {
        let clearInjectionArr = [];

        arr.forEach(item => {
            let isValue = item.type === 'VALUE' || item.type === 'OPTION_VALUE',
                isOptionColumn = item.type === 'OPTION_COLUMN';

            if (item.type === 'TABLE' && hasDelTable)
                return;

            if (isValue || isOptionColumn)
                clearInjectionArr.push(item.value);
        });

        return clearInjectionArr;
    },

    clearSql(queryResult, injectionResult) {
        let indexForValue = 1,
            indexForTableOrColumn = 0,
            regexPlaceHolder = /__\$(.*?)\$__/,
            mapOfPlaceHolder = {
                __$VALUE$__: () => `$${indexForValue}`,
                __$OPTION_VALUE$__: () => `$${indexForValue}`,
                __$OPTION_COLUMN$__: () => `$${indexForValue}`
            },
            query = queryResult.split(' ');

        query.forEach((item, i, arr) => {

            if (item === '')
                return;

            if (typeof mapOfPlaceHolder?.[item] === 'function') {
                arr[i] = mapOfPlaceHolder[item]();
                indexForValue++;
                indexForTableOrColumn++;
                return;
            }

            if (regexPlaceHolder.test(item) && (injectionResult?.[indexForTableOrColumn]?.type === 'COLUMN' || 'TABLE')) {
                arr[i] = injectionResult?.[indexForTableOrColumn]?.value;
                indexForTableOrColumn++;
            }
        });

        return query.join(' ');
    },

    toSQL(unsafeSQL, injectionArr, index) {

        let arrayOfSql = unsafeSQL.split(' '),
            indexOfPlaceHolder = index,
            indexForInjection = 0,
            arrayOfValidPlaceHolder = [
                '__$VALUE$__',
                '__$OPTION_VALUE$__',
                '__$OPTION_COLUMN$__'
            ];

        // remove table name from arr
        injectionArr.shift();


        arrayOfSql.forEach((item, i, array) => {

            if (item === '__$COLUMN_NAME$__' && injectionArr[indexForInjection]?.type === 'COLUMN') {
                array[i] = injectionArr[indexForInjection].value;
                indexForInjection += 2;
            }

            if (arrayOfValidPlaceHolder.includes(item)) {
                array[i] = `$${indexOfPlaceHolder}`;
                indexOfPlaceHolder++;
            }

        });

        return arrayOfSql.join(' ');

    }

}