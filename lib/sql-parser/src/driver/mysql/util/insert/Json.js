module.exports = {
  toValue(obj) {
    const arrayOfValueFromJsonObject = [];
    const arrayOfColumnFromJsonObject = [];
    let length = 0;

    for (const key in obj) {
      arrayOfValueFromJsonObject.push(obj[key]);
      arrayOfColumnFromJsonObject.push(key);
      length++;
    }

    return {
      length: length,
      value: arrayOfValueFromJsonObject.join(', '),
      column: arrayOfColumnFromJsonObject.join(', '),
    };
  },
};
