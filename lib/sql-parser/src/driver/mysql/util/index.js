module.exports = {

    clearInjectionArr(arr, hasDelTable) {
        return arr
            .map(item => item.type !== 'TABLE' || !hasDelTable ? item.value : undefined)
            .filter(d => d);
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