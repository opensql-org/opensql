module.exports = {
  handler(obj) {
    const arrayOfKeyAndValue = [];
    let size = 0;

    for (const key in obj) {
      const value = obj[key];
      arrayOfKeyAndValue.push(key);
      arrayOfKeyAndValue.push(value);
      size++;
    }

    return {
      injection: arrayOfKeyAndValue,
      toSQL: '?? = ? , '.repeat(size).replace(/,\s*$/, '').trim(), // replace last comma in string
    };
  },
};
