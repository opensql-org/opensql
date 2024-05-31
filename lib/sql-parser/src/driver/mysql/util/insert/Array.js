const Array = require('../../../../base/util/Array');

module.exports = class extends Array {
  toString(arr, lengthOfColumn) {
    // Used when to insert multi value in database
    let result = '';

    for (let i = 0; i < arr.length; i += lengthOfColumn) {
      let chunk = arr
        .slice(i, i + lengthOfColumn)
        .map(element =>
          typeof element === 'string' ? `"${element}"` : element,
        );

      if (isLastIndex) {
        result += `(${chunk})`;
        continue;
      }

      result += `(${chunk}), `;
    }

    return result;
  }

  to2DArray(arr, lengthOfColumn) {
    // Used when to insert multi value in database
    const array2D = [];

    for (let i = 0; i < arr.length; i += lengthOfColumn) {
      const isLastIndex = arr.length - lengthOfColumn === i;
      const chunk = arr.slice(i, i + lengthOfColumn);
      let factor = `(${chunk.map(e =>
        typeof e === 'string' ? `"${e}"` : e,
      )})`;

      if (!isLastIndex) {
        factor += ',';
      }

      array2D.push(factor);
    }

    return {
      value: array2D.join(' '),
    };
  }
};
