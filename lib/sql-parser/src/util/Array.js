module.exports = {


    toString(arr, lengthOfColumn) {
        // Used when to insert multi value in database
        let result = '';
        for (let i = 0; i < arr.length; i += lengthOfColumn) {

            let chunk = arr.slice(i, i + lengthOfColumn).map(element =>`"${element}"`);

            let isLastIndex = arr.length === i + lengthOfColumn;

            if (isLastIndex) {
                result += `(${chunk})`;
                continue;
            }

            result += `(${chunk}), `;

        }

        return result;
    },

    to2DArray(arr, lengthOfColumn) {
        // Used when to insert multi value in database
        let array2D = [];

        for (let i = 0; i < arr.length; i += lengthOfColumn) {
            let chunk = arr.slice(i, i + lengthOfColumn);
            array2D.push(chunk);
        }

        return {
            value: [array2D]
        };

    },

    isArray(arg) {
        return Array.isArray(arg);
    }

}