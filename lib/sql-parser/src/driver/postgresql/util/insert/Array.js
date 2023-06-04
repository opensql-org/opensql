let Array = require('../../../../base/util/Array');

module.exports = class extends Array {

    handler(datum, lengthOfColumn) {
        // Used when to insert multi value in database
        let result = '',
            placeHolder = '',
            indexHolder = 0;

        for (let i = 0; i < datum.length; i += lengthOfColumn) {
            let chunk = datum.slice(i, i + lengthOfColumn).map(element => typeof element === 'string' ? `"${element}"` : element);

            placeHolder += '$'.repeat(lengthOfColumn).split('')
                .map((element, index, arr) => {
                    let isLastIndex = arr.length - 1 === index;
                    if (isLastIndex)
                        return `${element + ++indexHolder}), `;

                    return `(${element + ++indexHolder}, `;
                }).join('');

            let isLastIndex = datum.length === i + lengthOfColumn;

            if (isLastIndex) {
                result += `(${chunk})`;
                continue;
            }
            result += `(${chunk}), `;

        }

        return {
            toValue: result,
            /**
             * Replace last comma in string
             */
            toPlaceHolder: placeHolder.replace(/,\s*$/, '')
        };

    }


}