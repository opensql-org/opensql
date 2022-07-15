const {
    OR,
    AND,
    COMMA,
    COUNT,
    QUESTION_MARK
} = require('../util/KeywordHelper');

const
    NULL = 'NULL',
    EQUAL_TO = '=',
    LESS_THAN = '<',
    GREATER_THAN = '>',
    NOT_EQUAL_TO = '<>',
    NOT_NULL = 'NOT NULL',
    IS_NOT_NULL = 'IS NOT NULL',
    LESS_THAN_OR_EQUAL_TO = '<=',
    GREATER_THAN_OR_EQUAL_TO = '>=';

let saveStateOfArray,
    arrayOfOperator = [
        EQUAL_TO,
        LESS_THAN,
        NOT_EQUAL_TO,
        GREATER_THAN,
        LESS_THAN_OR_EQUAL_TO,
        GREATER_THAN_OR_EQUAL_TO
    ];


function getKeyAndValue(jsonObject, type) {
    let data;
    for (let key in jsonObject)
        data = {
            key: key,
            value: jsonObject[key]
        };

    return `${type} ` + data['key'] + ' ' + data['value'];
}

function getDoubleQuestionMarkAndCommaForOrderBy(arr) {
    let str = '';
    arr.forEach((item, index, arr) => {

        let lastIndex = arr.lastIndexOf(item);

        if (lastIndex) {
            str += ` ${COMMA} ${QUESTION_MARK}`;
        }

        if (!lastIndex) {
            str += `${QUESTION_MARK}`;
        }

    });
    return str;
}

function validateOperator(jsonObject, operator, type) {
    let arrayOfKeyAndValue = getKeyAndValue(jsonObject, type).split(' ');
    let arrayOfKeyAndValueWithLastOperator = getKeyAndValue(jsonObject, type).split(' ');


    if (operator !== undefined && !Array.isArray(operator)) {
        saveStateOfArray = arrayOfKeyAndValueWithLastOperator;
        saveStateOfArray = saveStateOfArray.concat(operator);
    }

    if (operator !== undefined && Array.isArray(operator)) {
        saveStateOfArray = arrayOfKeyAndValueWithLastOperator;
        saveStateOfArray = saveStateOfArray.concat(operator);
    }

    if (operator === undefined) {
        saveStateOfArray = arrayOfKeyAndValue;
        saveStateOfArray = saveStateOfArray.concat(operator);
    }

    return saveStateOfArray.filter(v => v);
}


module.exports = {


    NULL: NULL,
    NOT_NULL: NOT_NULL,
    EQUAL_TO: EQUAL_TO,
    LESS_THAN: LESS_THAN,
    IS_NOT_NULL: IS_NOT_NULL,
    GREATER_THAN: GREATER_THAN,
    NOT_EQUAL_TO: NOT_EQUAL_TO,
    LESS_THAN_OR_EQUAL_TO: LESS_THAN_OR_EQUAL_TO,
    GREATER_THAN_OR_EQUAL_TO: GREATER_THAN_OR_EQUAL_TO,


    setOperator(operator, value, op) {
        let itemInArrayOfOperator = arrayOfOperator.includes(operator);

        if (!itemInArrayOfOperator || value === undefined)
            throw new Error('Invalid data type');

        if (op !== undefined)
            return `${op.toLowerCase()} ${operator} SPACE ${value}`;
        return `${operator} SPACE ${value}`;
    },


    OR(jsonObject, operator) {
        return validateOperator(jsonObject, operator, OR);
    },


    AND(jsonObject, operator) {
        return validateOperator(jsonObject, operator, AND);
    },


    IN(arr, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} in ${arr}`;
        return `in ${arr}`;
    },


    BETWEEN(first, second, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} between ${first} and ${second}`;
        return `between ${first} and ${second}`;
    },


    LIKE(str, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} like ${str}`;
        return `like ${str}`;
    },


    ORDER(data) {
        let isArray = Array.isArray(data);

        if (isArray)
            return {
                placeHolder: getDoubleQuestionMarkAndCommaForOrderBy(data)
            };

        return '';
    },


    CAST(data, type) {
        let isString = typeof data === 'string';

        if (isString)
            return `CAST('${data}' AS ${type})`;

        return `CAST(${data} AS ${type})`;
    },


    COUNT(column) {
        return (column === undefined) ? `${COUNT} AS size` : `COUNT(${column})`;
    },


    AS(first, second) {
        return `POINTER_FOR_AS ${first} AS ${second}`;
    }


}