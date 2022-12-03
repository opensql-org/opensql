module.exports = {

    clearInjectionArr(arr, hasDelTable) {
        let clearArr = [];
        arr.forEach(item => {
            if (item.type !== 'TABLE' || !hasDelTable)
                clearArr.push(item.value);
        });
        return clearArr;
    },

    clearSql(queryResult) {
        return queryResult
            .replaceAll('__$TABLE_NAME$__', '??')
            .replaceAll('__$COLUMN_NAME$__', '??')
            .replaceAll('__$VALUE$__', '?')
            .replaceAll('__$OPTION_VALUE$__', '?')
            .replaceAll('__$OPTION_COLUMN$__', '?');
    }

}