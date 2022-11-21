let Array = require('../../../../base/util/Array');

module.exports = class extends Array {

    handler(datum, lengthOfColumn) {
        // Used when to insert multi value in database
        let result = '';

        for (let i = 0; i < datum.length; i += lengthOfColumn) {
            let chunk = datum.slice(i, i + lengthOfColumn).map(element => {
                if (typeof element === 'string')
                    return `"${element}"`;
                return element;
            });

            let isLastIndex = datum.length === i + lengthOfColumn;

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


}