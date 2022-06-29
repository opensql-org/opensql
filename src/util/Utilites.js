const {
        IN,
        OR,
        AND,
        ASC,
        STAR,
        DESC,
        LIKE,
        COMMA,
        LIMIT,
        COUNT,
        OFFSET,
        BETWEEN,
        ORDER_BY,
        QUESTION_MARK,
        AUTO_INCREMENT,
        DOUBLE_QUESTION_MARK,
    } = require('./KeywordHelper'),
    {
        NULL,
        EQUAL_TO,
        NOT_NULL,
        LESS_THAN,
        IS_NOT_NULL,
        GREATER_THAN,
        NOT_EQUAL_TO,
        LESS_THAN_OR_EQUAL_TO,
        GREATER_THAN_OR_EQUAL_TO
    } = require('./QueryHelper');


let stringOfQuestionMarkAndEqual,
    arrayOfKeyAndValueDataForQuery = [],
    fieldData;


let arrayOfOperator = [
    EQUAL_TO,
    LESS_THAN,
    GREATER_THAN,
    NOT_EQUAL_TO,
    LESS_THAN_OR_EQUAL_TO,
    GREATER_THAN_OR_EQUAL_TO
];

let arrayOfValidOptionKeyword = [
    ASC,
    DESC,
    LIMIT,
    OFFSET,
    ORDER_BY
];


function generateDoubleQuestionMarksEqualQuestionMark(sizeOfKey) {
    let mergeQuestionMarksWithEqual = '';

    let initPlaceHolder = `${DOUBLE_QUESTION_MARK} ${EQUAL_TO} ${QUESTION_MARK}`;

    for (let i = 0; i < sizeOfKey; i++) {
        let isLastNumber = (i === sizeOfKey - 1);

        if (isLastNumber) {
            mergeQuestionMarksWithEqual += `${initPlaceHolder}`;
            continue;
        }

        if (i === 0 || i !== 0)
            mergeQuestionMarksWithEqual += `${initPlaceHolder} ${COMMA} `;

    }

    return stringOfQuestionMarkAndEqual = mergeQuestionMarksWithEqual;
}


function generateArrayOfKeyAndValueForEditField(jsonObject) {
    let arrayOfKeyAndValue = [],
        index = 0,
        size = 0;
    for (let key in jsonObject.edit) {
        let value = jsonObject.edit[key];
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfKeyAndValueDataForQuery.push(value.toString());
        arrayOfKeyAndValue.push(`${key}`);
        index++;
        size++;
        arrayOfKeyAndValue[index++] = `${value}`;
    }
    generateDoubleQuestionMarksEqualQuestionMark(size);
    return arrayOfKeyAndValue;
}


function isSpaceWordInString(str) {
    return str.toString().search('SPACE') > -1;
}


function getValueInSpaceString(str) {
    let value = splitValueOfSpaceWordInString(str);
    if (isSpaceWordInString(str) && value !== undefined)
        return value;
}

function getOperatorInSpaceString(str) {
    let operator = splitOperatorInString(str);
    if (isSpaceWordInString(str) && operator !== undefined)
        return operator;

    return EQUAL_TO;
}


function splitOperatorAndOrInSpaceWord(str) {
    if (isSpaceWordInString(str) && (isOrOperator(str) || isAndOperator(str)))
        return str.split(' ')[0];
    return AND;
}


function splitValueOfSpaceWordInString(str) {
    try {
        let newStr = str.split(' ');
        if (newStr[0] === ('and' || 'or'))
            newStr.shift();
        if (newStr[1] === 'SPACE')
            newStr.splice(1, 1);
        return newStr[1];
    } catch (e) {
    }
}

function splitOperatorInString(str) {
    try {
        let newStr = str.split(' ');
        if (newStr[1] === 'SPACE')
            newStr.splice(1, 1);
        if (newStr[0] === ('and' || 'or'))
            newStr.shift();
        return newStr[0];
    } catch (e) {
    }
}

function stringToArrayForInOperator(str) {
    return str.replace('in ', '').split(',');
}

function removeAndOperatorInString(str) {
    return str.replace('and ', '').trim();
}

function removeOrOperatorInString(str) {
    return str.replace('or ', '').trim();
}

function isAndOperator(str) {
    return str.search('and') === 0;
}

function isOrOperator(str) {
    return str.search('or') === 0;
}

function getValidValue(str) {
    if (isOrOperator(str))
        return removeOrOperatorInString(str);
    if (isAndOperator(str))
        return removeAndOperatorInString(str);
    return str;
}

function isInOperatorInString(str) {
    if (typeof str === 'string')
        return /in /.test(str);
    return false;
}

function isBetweenOperatorInString(str) {
    if (typeof str === 'string')
        return /between /.test(str);
    return false;
}


function isLikeOperatorInString(str) {
    if (typeof str === 'string')
        return /like /.test(str);
    return false;
}


function getValueOfLikeOperator(str) {
    return str.split(' ')[1];
}

function getOp(str) {
    let operator;
    if (isAndOperator(str) || isOrOperator(str)) {
        operator = str.split(' ')[0];
        str.replace(`${operator} `, '').trim();
        return operator.toUpperCase();
    }
    return AND;
}


function getValueOfBetweenAndOperator(str) {
    let newStr = str.split(' ');
    if (isAndOperator(str) || isOrOperator(str))
        newStr.shift();
    return [newStr[1], newStr[3]];
}


function splitStringToArrayOfCharactersForBetweenOperator(str) {
    if (typeof str === 'string')
        return getValueOfBetweenAndOperator(str);
}


function getStringOfValueForEnumOrSetDataTypesWithComma(arr) {
    let stringTypesWithComma = '';
    arr.forEach((item, index, arr) => {

        let lastIndex = arr.lastIndexOf(item);

        if (lastIndex) {
            stringTypesWithComma += `${COMMA} '${item}'`;
        }

        if (!lastIndex) {
            stringTypesWithComma += `'${item}'`;
        }

    });
    return stringTypesWithComma;
}


function getQueryAndCheckOtherConditionInWhereObject(jsonObject) {
    let index = 0,
        arrayOfEqualAndQuestionMarks = [];

    for (let key in jsonObject) {
        let value = jsonObject[key],
            arrayOfOperatorAndValue2d = jsonObject.op,
            isFirstIndex = (index === 0),
            isBetweenOperator = isBetweenOperatorInString(value),
            isOpDefined = Array.isArray(value) && key === 'op',
            isLikeOperator = isLikeOperatorInString(value),
            newValue = getValueInSpaceString(value),
            isInOperator = isInOperatorInString(value),
            arrayOfSpecialQueryUtilitiesOperator = [],
            isAccessToCheckOtherCondition = false,
            newArrayForOperatorAndValue2d = [],
            isNotOperator = !isInOperator && !isBetweenOperator && !isLikeOperator && !isSpaceWordInString(value) && !isOpDefined,
            operator = getOperatorInSpaceString(value),
            initPlaceHolder = `${DOUBLE_QUESTION_MARK} ${operator} ${QUESTION_MARK}`;


        if (isSpaceWordInString(value) && !isFirstIndex) {
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfKeyAndValueDataForQuery.push(newValue);
            arrayOfEqualAndQuestionMarks.push(`${splitOperatorAndOrInSpaceWord(value).toUpperCase()} ${initPlaceHolder}`);
            index++;
        }


        if (isSpaceWordInString(value) && isFirstIndex) {
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfKeyAndValueDataForQuery.push(newValue);
            arrayOfEqualAndQuestionMarks.push(`${operator} ${QUESTION_MARK}`);
            index++;
        }


        if (!isAccessToCheckOtherCondition && isFirstIndex && isNotOperator) {
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfKeyAndValueDataForQuery.push(value);
            arrayOfEqualAndQuestionMarks.push(`${operator} ${QUESTION_MARK}`);
            index++;
        }

        if (!isAccessToCheckOtherCondition && !isFirstIndex && isNotOperator) {
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfKeyAndValueDataForQuery.push(value);
            arrayOfEqualAndQuestionMarks.push(`${initPlaceHolder}`);
            index++;
        }

        if (isInOperator && isFirstIndex) {
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfEqualAndQuestionMarks.push(`${IN}`);
            arrayOfKeyAndValueDataForQuery.push(stringToArrayForInOperator(getValidValue(value)));
            index++;
        }


        if (isInOperator && !isFirstIndex) {
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfEqualAndQuestionMarks.push(getOp(value))
            arrayOfEqualAndQuestionMarks.push(`${DOUBLE_QUESTION_MARK} ${IN}`);
            arrayOfKeyAndValueDataForQuery.push(stringToArrayForInOperator(getValidValue(value)));
            index++;
        }


        if (isBetweenOperator && !isFirstIndex) {
            arrayOfEqualAndQuestionMarks.push(getOp(value));
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfEqualAndQuestionMarks.push(`${DOUBLE_QUESTION_MARK} ${BETWEEN} ${QUESTION_MARK} ${AND} ${QUESTION_MARK}`);
            index++;
        }

        if (isBetweenOperator && isFirstIndex) {
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfEqualAndQuestionMarks.push(`${BETWEEN} ${QUESTION_MARK} ${AND} ${QUESTION_MARK}`);
            index++;
        }

        if (isBetweenOperator) {
            arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(splitStringToArrayOfCharactersForBetweenOperator(value));
            index++;
        }

        if (isLikeOperator && !isFirstIndex) {
            arrayOfEqualAndQuestionMarks.push(getOp(value));
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfKeyAndValueDataForQuery.push(getValueOfLikeOperator(getValidValue(value)));
            arrayOfEqualAndQuestionMarks.push(`${DOUBLE_QUESTION_MARK} ${LIKE} ${QUESTION_MARK}`);
            index++;
        }

        if (isLikeOperator && isFirstIndex) {
            arrayOfKeyAndValueDataForQuery.push(key);
            arrayOfKeyAndValueDataForQuery.push(getValueOfLikeOperator(getValidValue(value)));
            arrayOfEqualAndQuestionMarks.push(`${LIKE} ${QUESTION_MARK}`);
            index++;
        }


        if (!isOpDefined)
            continue;


        arrayOfOperatorAndValue2d.forEach(item2d => {

            item2d.forEach((item, index) => {

                let isAndOperator = item === AND;
                let isOrOperator = item === OR;

                if (isAndOperator || isOrOperator) {
                    arrayOfSpecialQueryUtilitiesOperator.push(item);
                    item2d.splice(index, 1);
                }

            });

            arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(item2d);
            newArrayForOperatorAndValue2d = newArrayForOperatorAndValue2d.concat(item2d);

        });
        delete jsonObject['op'];
        let isArrayFor2dHaveOneKeyAndValue = (newArrayForOperatorAndValue2d.length === 2),
            isArrayFor2dHaveMoreThanOneKeyAndValue = (newArrayForOperatorAndValue2d.length > 2);


        if (isFirstIndex && (isArrayFor2dHaveOneKeyAndValue || isArrayFor2dHaveMoreThanOneKeyAndValue)) {
            arrayOfEqualAndQuestionMarks.push(`${operator} ${QUESTION_MARK}`);
            index++;
        }


        if (isArrayFor2dHaveOneKeyAndValue || isArrayFor2dHaveMoreThanOneKeyAndValue) {

            arrayOfSpecialQueryUtilitiesOperator.forEach(item => {

                arrayOfEqualAndQuestionMarks.push(`${item}`);
                arrayOfEqualAndQuestionMarks.push(`${initPlaceHolder}`);

            });

            index++;
        }

    }
    return arrayOfEqualAndQuestionMarks.join(' ');
}


function getArrayToString(arr) {
    return arr.toString().replace(',', ' ').trim();
}

function isDefinedDefaultWordInFirstOfString(str) {
    if (typeof str === 'string')
        return str.search('DEFAULT') === 0;
}

module.exports = {


    sqlQuery: '',
    stringOfDataForForSet: '',
    dataForInsertSqlQuery: [],
    stringOfValueWithComma: '',
    arrayOfDataForUpdateOrDeleteQuery: '',
    stringOfDoubleQuestionMarkAndComma: '',


    addDataTypeForFieldInFirstItemOfArray(type, data) {

        if (data === undefined)
            return type;

        let isArray = Array.isArray(data),
            isValueOfIndexIsNumber = false,
            newArrayForOptionsContains = [],
            newArrayOfValue = [],
            isDefinedValueInIndexTwoOfArray = false;


        let isDecimal = type === 'decimal';
        let isDouble = type === 'double';
        let isFloat = type === 'float';
        let isReal = type === 'real';
        let isEnum = type === 'enum';
        let isSet = type === 'set';


        let arrayOfValidType = [
            AUTO_INCREMENT,
            NOT_NULL,
            NULL
        ];


        if (!isArray)
            return (`${type}(${data})`).trim();


        data.forEach((item, index, arr) => {

            let isValidType = arrayOfValidType.includes(item);
            let nextItem = arr[index + 1];
            let isNextItemIsNumber = Number.isInteger(nextItem);
            let isItemIsString = typeof item === 'string';
            let isItemIsNumber = Number.isInteger(item);
            let isDefaultType = isDefinedDefaultWordInFirstOfString(item);


            if (isValidType || isDefaultType) {
                newArrayForOptionsContains.push(item);
                return;
            }


            if ((!isNextItemIsNumber && isItemIsNumber) || isItemIsString) {
                isValueOfIndexIsNumber = true;
                newArrayOfValue.push(item);
            }

            if (isNextItemIsNumber && isItemIsNumber) {
                isDefinedValueInIndexTwoOfArray = true;
                newArrayOfValue.push(item);
            }


        });

        let stringOfOptionContains = getArrayToString(newArrayForOptionsContains);
        let validateStringOfOptionContains = (stringOfOptionContains === undefined) ? ' ' : stringOfOptionContains;

        if (isEnum || isSet)
            return (`${type}(${getStringOfValueForEnumOrSetDataTypesWithComma(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();

        if (isValueOfIndexIsNumber && !isDefinedValueInIndexTwoOfArray && (!isEnum || !isSet) )
            return (`${type}(${(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();

        if ((isDecimal || isFloat || isReal || isDouble))
            return (`${type}(${(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();

        return (type + ' ' + validateStringOfOptionContains).trim();
    },


    generateValueWithComma(data) {

        if (typeof data === 'string')
            return module.exports.stringOfValueWithComma = data;

        let stringOfValueWithComma = '';


        data.forEach((item, index, array) => {

            let isLastIndex = array.length === index + 1;


            if (!isLastIndex)
                stringOfValueWithComma += `${item} ${COMMA} `;

            if (isLastIndex)
                stringOfValueWithComma += item;


        });

        return module.exports.stringOfValueWithComma = stringOfValueWithComma;
    },


    generateDoubleQuestionMarkAndComma(jsonArray) {

        let newStringOfDoubleQuestionMarkAndComma = '';

        for (let keys = Object.keys(jsonArray), i = 0, end = keys.length; i < end; i++) {

            let key = keys[i], value = jsonArray[key];


            if (typeof value === 'object') {

                let array2D = [];
                value.forEach((item) => {
                    array2D.push([item]);
                });

                module.exports.dataForInsertSqlQuery[i] = array2D;
            }


            if (end !== (i + 1))
                newStringOfDoubleQuestionMarkAndComma += `${key} ${COMMA} `;

            if (end === (i + 1))
                newStringOfDoubleQuestionMarkAndComma += key;

        }

        return newStringOfDoubleQuestionMarkAndComma;

    },


    getOptionKeywordSqlQuery(jsonArray) {

        let newArrayOfKeywordsWithSqlContext = [],
            isWhereCondition = (jsonArray.where !== undefined),
            isLimit = (jsonArray.limit !== undefined);


        if (jsonArray.optKey === undefined)
            return module.exports.sqlQuery = '';


        jsonArray.optKey.forEach((item, index, arrayOfKeyword) => {
            let isFirstIndex = (index === 0),
                nextKeyword = arrayOfKeyword[index + 1],
                isItemInOperators = arrayOfOperator.includes(item),
                isOptionKeyword = arrayOfValidOptionKeyword.includes(nextKeyword),
                isNextKeywordUndefined = (nextKeyword !== undefined),
                isNextItemOffset = (isNextKeywordUndefined && nextKeyword === OFFSET) ? `${OFFSET} ${QUESTION_MARK}` : '',
                nextItemUndefinedToNullOrValue = (isNextKeywordUndefined && !isOptionKeyword) ? nextKeyword : '';


            if (isFirstIndex && isItemInOperators)
                newArrayOfKeywordsWithSqlContext.push(` ${item} ${QUESTION_MARK} ${nextItemUndefinedToNullOrValue}`);


            if (!isFirstIndex && isItemInOperators)
                newArrayOfKeywordsWithSqlContext.push(` ${DOUBLE_QUESTION_MARK} ${item} ${QUESTION_MARK} ${nextItemUndefinedToNullOrValue}`);


            if (item === BETWEEN && !isFirstIndex && isWhereCondition)
                newArrayOfKeywordsWithSqlContext.push(` ${DOUBLE_QUESTION_MARK} ${BETWEEN} ${QUESTION_MARK} ${AND} ${QUESTION_MARK} ${nextItemUndefinedToNullOrValue}`);


            if (item === BETWEEN && isFirstIndex && isWhereCondition)
                newArrayOfKeywordsWithSqlContext.push(` ${BETWEEN} ${QUESTION_MARK} ${AND} ${QUESTION_MARK} ${nextItemUndefinedToNullOrValue}`);


            if (item === IN && isFirstIndex)
                newArrayOfKeywordsWithSqlContext.push(` ${item} ${nextItemUndefinedToNullOrValue}`);


            if (item === IN && !isFirstIndex)
                newArrayOfKeywordsWithSqlContext.push(` ${DOUBLE_QUESTION_MARK} ${item} ${nextItemUndefinedToNullOrValue}`);


            if (item === LIKE && isFirstIndex)
                newArrayOfKeywordsWithSqlContext.push(` ${item} ${QUESTION_MARK} ${nextItemUndefinedToNullOrValue}`);


            if (item === LIKE && !isFirstIndex)
                newArrayOfKeywordsWithSqlContext.push(` ${DOUBLE_QUESTION_MARK} ${item} ${QUESTION_MARK} ${nextItemUndefinedToNullOrValue}`);


            if (item === ORDER_BY)
                newArrayOfKeywordsWithSqlContext.push(` ${ORDER_BY} ${QUESTION_MARK}`)


            if (item === ASC || item === DESC)
                newArrayOfKeywordsWithSqlContext.push(`${item}`);


            if ((item === ASC && nextKeyword === DESC) || (item === DESC && nextKeyword === ASC))
                newArrayOfKeywordsWithSqlContext.push(`${COMMA} ${QUESTION_MARK}`);


            if (isLimit && item === LIMIT)
                newArrayOfKeywordsWithSqlContext.push(` ${item} ${QUESTION_MARK} ${COMMA} ${QUESTION_MARK} ${isNextItemOffset}`);


            if (!isLimit && item === LIMIT)
                newArrayOfKeywordsWithSqlContext.push(` ${item} ${QUESTION_MARK} ${isNextItemOffset}`);


            if (item === IS_NOT_NULL && !isFirstIndex)
                newArrayOfKeywordsWithSqlContext.push(`${DOUBLE_QUESTION_MARK} ${item}`);


            if (item === IS_NOT_NULL && isFirstIndex)
                newArrayOfKeywordsWithSqlContext.push(`${item}`);


        });

        module.exports.sqlQuery = newArrayOfKeywordsWithSqlContext.join('').trim();

        if (isWhereCondition)
            return module.exports.sqlQuery = `WHERE ${DOUBLE_QUESTION_MARK} ` +
                `${newArrayOfKeywordsWithSqlContext.join('').trim()}`;

        return module.exports.sqlQuery;
    },


    getCreateTableSqlQuery(jsonArray) {

        let newArrayOfFieldItem = [];

        for (let value in jsonArray.field) {
            let key = jsonArray.field[value];

            newArrayOfFieldItem.push(`${value} ${key}${COMMA} `);
        }

        let query = newArrayOfFieldItem.join('')
            .replace(/,\s*$/, ''); // replace last comma in array

        if (jsonArray.primaryKey !== undefined)
            query += ` ${COMMA} PRIMARY KEY (${jsonArray.primaryKey}) `;


        return module.exports.sqlQuery = query;
    },

    generateUpdateSqlQueryWithData(jsonObject) {

        generateArrayOfKeyAndValueForEditField(jsonObject);

        module.exports.sqlQuery = getQueryAndCheckOtherConditionInWhereObject(jsonObject.where);

        module.exports.stringOfDataForForSet = stringOfQuestionMarkAndEqual;

        arrayOfKeyAndValueDataForQuery.unshift(jsonObject.table);

        module.exports.arrayOfDataForUpdateOrDeleteQuery = arrayOfKeyAndValueDataForQuery;


        arrayOfKeyAndValueDataForQuery = [];
    },


    generateDeleteSqlQueryWithData(jsonObject) {

        module.exports.sqlQuery = getQueryAndCheckOtherConditionInWhereObject(jsonObject.where);

        arrayOfKeyAndValueDataForQuery.unshift(jsonObject.table);

        module.exports.arrayOfDataForUpdateOrDeleteQuery = arrayOfKeyAndValueDataForQuery;

        arrayOfKeyAndValueDataForQuery = [];
        module.exports.sqlQuery = '';
    },


    getStringOfColumnWithComma(data) {
        let newData = data;
        return (data !== Array) ? newData : data.forEach((item, index, arrayOfColumns) => {
            let isLastIndex = arrayOfColumns[arrayOfColumns.length - 1];
            if (!isLastIndex)
                newData += `${item} ${COMMA}`;
            if (isLastIndex)
                newData += item;
        });
    },


    removeStringOfValueWithComma() {
        return module.exports.stringOfValueWithComma = '';
    },


    removeSqlQuery() {
        return module.exports.sqlQuery = '';
    },


    removeStringOfDataForForSet() {
        return module.exports.stringOfDataForForSet = '';
    },


    removeDataForInsertSqlQuery() {
        return module.exports.dataForInsertSqlQuery = [];
    },


    removeArrayOfDataForUpdateOrDeleteQuery() {
        return module.exports.arrayOfDataForUpdateOrDeleteQuery = '';
    },


    getData() {
        return fieldData;
    },


    removeFieldDataInSelect(jsonArray) {
        let index = jsonArray.optKey[0],
            isPointField = /X\(/.test(index),
            optionKeywordArray = jsonArray.optKey;

        if (index !== STAR && COUNT && !isPointField) {
            fieldData = DOUBLE_QUESTION_MARK;
        }

        if (index !== STAR && COUNT && isPointField) {
            fieldData = index;
            optionKeywordArray.shift();
        }

        if (index === STAR) {
            fieldData = STAR;
            optionKeywordArray.shift();
        }

        if (index === COUNT) {
            fieldData = `${COUNT} AS size`;
            optionKeywordArray.shift();
        }

        return optionKeywordArray;
    }


}
