const {
    OR,
    AND,
    COUNT,
    UNION,
    GROUP_BY,
    UNION_ALL
} = require('../util/KeywordHelper');

const
    NULL = 'NULL',
    EQUAL_TO = '=',
    LESS_THAN = '<',
    GREATER_THAN = '>',
    NOT_EQUAL_TO = '<>',
    IS_NULL = 'IS NULL',
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
    IS_NULL: IS_NULL,
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
            return `${op.toLowerCase()} ${operator} POINTER_FOR_SPACE ${value}`;
        return `${operator} POINTER_FOR_SPACE ${value}`;
    },


    OR(jsonObject, operator) {
        return validateOperator(jsonObject, operator, OR);
    },


    AND(jsonObject, operator) {
        return validateOperator(jsonObject, operator, AND);
    },


    IN(arr, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} POINTER_FOR_IN ${arr}`;
        return `POINTER_FOR_IN ${arr}`;
    },


    NOT_IN(arr, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} POINTER_FOR_NOT_IN ${arr}`;
        return `POINTER_FOR_NOT_IN ${arr}`;
    },


    BETWEEN(first, second, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} POINTER_FOR_BETWEEN ${first} POINTER_FOR_AND ${second}`;
        return `POINTER_FOR_BETWEEN ${first} POINTER_FOR_AND ${second}`;
    },


    NOT_BETWEEN(first, second, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} POINTER_FOR_NOT_BETWEEN ${first} POINTER_FOR_AND ${second}`;
        return `POINTER_FOR_NOT_BETWEEN ${first} POINTER_FOR_AND ${second}`;
    },


    LIKE(str, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} POINTER_FOR_LIKE ${str}`;
        return `POINTER_FOR_LIKE ${str}`;
    },


    CAST(data, type) {
        let isString = typeof data === 'string';

        if (isString)
            return `CAST('${data}' AS ${type})`;

        return `CAST(${data} AS ${type})`;
    },


    COUNT(column) {

        if (Array.isArray(column))
            return `COUNT(DISTINCT ${column})`;

        return (column === undefined) ? `${COUNT} AS size`
            : `COUNT(${column})`;
    },


    AS(first, second) {
        return `POINTER_FOR_AS ${first} AS ${second}`;
    },


    SOURCE(name, typeName) {
        return (typeName !== undefined) ? `POINTER_FOR_SOURCE '` + name + `' AS ${typeName}` : `POINTER_FOR_SOURCE '` + name + `' AS Source`;
    },


    ATTACH(array, op) {
        if (op !== undefined)
            return {
                op: op.toLowerCase(),
                data: array
            };

        return {
            data: array
        };
    },

    UNION(jsonObject) {
        return {
            type: UNION,
            data: jsonObject
        };
    },


    NOT(str, op) {
        if (op !== undefined)
            return `${op.toLowerCase()} POINTER_FOR_NOT ${str}`;
        return `POINTER_FOR_NOT ${str}`;
    },


    UNION_ALL(jsonObject) {
        return {
            type: UNION_ALL,
            data: jsonObject
        };
    },

    MIN(column) {
        return `MIN(${column})`;
    },

    MAX(column) {
        return `MAX(${column})`;
    },

    SUM(column) {
        return `SUM(${column})`;
    },

    AVG(column) {
        return `AVG(${column})`;
    },

    CONCAT_WS(str, array, column) {
        return `CONCAT_WS("${str}", ${array.toString()}) AS ${column}`;
    },

    GROUP(data) {
        if (Array.isArray(data))
            return GROUP_BY + ' ' + data.toString();
        return GROUP_BY + ' ' + data;
    }

}