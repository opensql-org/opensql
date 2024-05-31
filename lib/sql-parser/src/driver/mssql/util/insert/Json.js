module.exports = {
  handler(object) {
    let index = 1;
    const columns = [];
    const values = [];

    for (const key in object) {
      columns.push(key);
      values.push(object[key]);
      index++;
    }

    return {
      toValue: values
        .map(element =>
          typeof element === 'string' ? `"${element}"` : element,
        )
        .join(', '),
      toColumn: columns.join(', '),
    };
  },
};
