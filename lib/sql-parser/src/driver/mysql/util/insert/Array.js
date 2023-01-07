let Array = require('../../../../base/util/Array');

module.exports = class extends Array {

    toString(arr, lengthOfColumn) {
        // Used when to insert multi value in database
        let result = '';
        for (let i = 0; i < arr.length; i += lengthOfColumn) {

            let chunk = arr.slice(i, i + lengthOfColumn).map(element => {
                if (typeof element === 'string')
                    return `"${element}"`;
                return element;
            });

            let isLastIndex = arr.length === i + lengthOfColumn;

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
        let array2D = [];

        for (let i = 0; i < arr.length; i += lengthOfColumn) {
            let chunk = arr.slice(i, i + lengthOfColumn);
            let isLastIndex = arr.length - lengthOfColumn === i;
            let factor = `(${chunk.map(e => typeof e === 'string' ? `"${e}"` : e)})`;

            if (!isLastIndex)
                factor += ',';

            array2D.push(factor);
        }

        return {
            value: array2D.join(' ')
        };

    }

}