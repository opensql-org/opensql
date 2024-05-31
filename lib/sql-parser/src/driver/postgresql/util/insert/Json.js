module.exports = {
  handler(object) {
    let placeHolder = '';
    let index = 1;
    const columns = [];
    const values = [];

    for (const key in object) {
      columns.push(key);
      values.push(object[key]);
      placeHolder += `$${index}, `;
      index++;
    }

    /**
     * Replace last comma in string
     */
    placeHolder = placeHolder.replace(/,\s*$/, '').trim();

    return {
      toValue: values
        .map(element =>
          typeof element === 'string' ? `"${element}"` : element,
        )
        .join(', '),
      toArray: values,
      toColumn: columns.join(', '),
      toPlaceHolder: placeHolder,
    };
  },
};
