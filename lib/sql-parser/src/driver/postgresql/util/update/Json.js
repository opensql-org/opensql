module.exports = {
  handler(obj) {
    const arrayOfValue = [];
    const arrayOfSql = [];
    let indexForPlaceHolder = 1;

    for (const key in obj) {
      const value = obj[key];
      arrayOfSql.push(key);
      arrayOfValue.push(value);
      arrayOfSql.push(`= $${indexForPlaceHolder} ,`);
      indexForPlaceHolder++;
    }

    return {
      injection: arrayOfValue,
      indexForPlaceHolder: indexForPlaceHolder,
      toSQL: arrayOfSql.join(' ').replace(/,\s*$/, '').trim(), // replace last comma in string
    };
  },
};
