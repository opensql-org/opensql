module.exports = {
  clearInjectionArr(arr, hasDelTable) {
    const clearInjectionArr = [];

    for (const { type, value } of arr) {
      const isValue = type === 'VALUE' || type === 'OPTION_VALUE';
      const isOptionColumn = type === 'OPTION_COLUMN';

      if (type === 'TABLE' && hasDelTable) {
        continue;
      }

      if (isValue || isOptionColumn) {
        clearInjectionArr.push(value);
      }
    }

    return clearInjectionArr;
  },

  clearSql(queryResult, injectionResult) {
    let indexForValue = 1;
    let indexForTableOrColumn = 0;
    const query = queryResult.split(' ');
    const regexPlaceHolder = /__\$(.*?)\$__/;
    const mapOfPlaceHolder = {
      __$VALUE$__: () => `$${indexForValue}`,
      __$OPTION_VALUE$__: () => `$${indexForValue}`,
      __$OPTION_COLUMN$__: () => `$${indexForValue}`,
    };

    for (let i = 0; i < query.length; i++) {
      const it = query[i];

      if (it === '') {
        continue;
      }

      if (typeof mapOfPlaceHolder?.[it] === 'function') {
        query[i] = mapOfPlaceHolder[it]();
        indexForValue++;
        indexForTableOrColumn++;
        continue;
      }

      if (
        regexPlaceHolder.test(it) &&
        (injectionResult?.[indexForTableOrColumn]?.type === 'COLUMN' || 'TABLE')
      ) {
        query[i] = injectionResult?.[indexForTableOrColumn]?.value;
        indexForTableOrColumn++;
      }
    }

    return query.join(' ');
  },

  toSQL(unsafeSQL, injectionArr, index) {
    const arrayOfSql = unsafeSQL.split(' ');
    let indexOfPlaceHolder = index;
    let indexForInjection = 0;
    const arrayOfValidPlaceHolder = [
      '__$VALUE$__',
      '__$OPTION_VALUE$__',
      '__$OPTION_COLUMN$__',
    ];

    // remove table name from arr
    injectionArr.shift();

    for (let i = 0; i < arrayOfSql.length; i++) {
      const it = arrayOfSql[i];

      if (
        it === '__$COLUMN_NAME$__' &&
        injectionArr[indexForInjection]?.type === 'COLUMN'
      ) {
        arrayOfSql[i] = injectionArr[indexForInjection].value;
        indexForInjection += 2;
      }

      if (arrayOfValidPlaceHolder.includes(it)) {
        arrayOfSql[i] = `$${indexOfPlaceHolder}`;
        indexOfPlaceHolder++;
      }
    }

    return arrayOfSql.join(' ');
  },
};
