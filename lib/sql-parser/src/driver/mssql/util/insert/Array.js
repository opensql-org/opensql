const Array = require('../../../../base/util/Array');

module.exports = class extends Array {
  handler(datum, lengthOfColumn) {
    // Used when to insert multi value in database
    let result = '';

    for (let i = 0; i < datum.length; i += lengthOfColumn) {
      const chunk = datum
        .slice(i, i + lengthOfColumn)
        .map(element =>
          typeof element === 'string' ? `"${element}"` : element,
        );

      const isLastIndex = datum.length === i + lengthOfColumn;

      if (isLastIndex) {
        result += `(${chunk})`;
        continue;
      }

      result += `(${chunk}), `;
    }

    return {
      toValue: result,
    };
  }
};
