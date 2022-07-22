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
        UNION,
        OFFSET,
        BETWEEN,
        ORDER_BY,
        UNION_ALL,
        QUESTION_MARK,
        AUTO_INCREMENT,
        DOUBLE_QUESTION_MARK,
    } = require('../util/KeywordHelper'),
    {
        NULL,
        EQUAL_TO,
        NOT_NULL,
        IS_NOT_NULL
    } = require('../util/QueryHelper');


let stringOfQuestionMarkAndEqual,
    arrayOfKeyAndValueDataForQuery = [],
    identifier;


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
    for (let key in jsonObject) {
        let value = jsonObject[key];
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
    return str.toString().search('POINTER_FOR_SPACE') > -1;
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
        if (newStr[1] === 'POINTER_FOR_SPACE')
            newStr.splice(1, 1);
        return newStr[1];
    } catch (e) {
    }
}

function splitOperatorInString(str) {
    try {
        let newStr = str.split(' ');
        if (newStr[1] === 'POINTER_FOR_SPACE')
            newStr.splice(1, 1);
        if (newStr[0] === 'and' || newStr[0] === 'or')
            newStr.shift();
        return newStr[0];
    } catch (e) {
    }
}

function stringToArrayForInOperator(str) {
    return str.replace('POINTER_FOR_IN', '').trim().split(',');
}

function removeAndOperatorInString(str) {
    return str.replace('POINTER_FOR_IN', '').trim();
}

function removeOrOperatorInString(str) {
    return str.replace('or ', '').trim();
}

function removeAttachPointerFromString(str) {
    return str.replace('POINTER_FOR_ATTACH ', '').trim();
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
        return /POINTER_FOR_IN/.test(str);
    return false;
}

function isBetweenOperatorInString(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_BETWEEN/.test(str);
    return false;
}




function isLikeOperatorInString(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_LIKE/.test(str);
    return false;
}

function isAttachFunc(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_ATTACH/.test(str);
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


function getQueryAndCheckOtherConditionInJsonObject(jsonObject) {
    let index = 0,
        where = jsonObject?.where,
        option = jsonObject?.option,
        get = jsonObject?.get,
        from = jsonObject?.from,
        isUndefinedWhereCondition = where === undefined,
        isDefinedGet = get !== undefined,
        isDefinedFrom = from !== undefined,
        isUndefinedOptionKeyword = option === undefined,
        arrayOfEqualAndQuestionMarks = [];


    if (isUndefinedWhereCondition && isUndefinedOptionKeyword && !isDefinedFrom && !isDefinedGet)
        return module.exports.sqlQuery = '';


    if (isDefinedGet) {

        arrayOfKeyAndValueDataForQuery.push(get);

        get.forEach((item, index, arrayOfKeyword) => {

            let isUsedUnionAll = item === UNION_ALL,
                nextKeyword = arrayOfKeyword[index + 1],
                isUsedUnion = item === UNION;

            if (isUsedUnion || isUsedUnionAll) {
                module.exports.validateIdentifiers(nextKeyword);
                arrayOfEqualAndQuestionMarks.push(` ${item} ` + `SELECT ${module.exports.getIdentifier()} ` + `FROM ${DOUBLE_QUESTION_MARK} `);
            }

        });
    }


    if (isDefinedFrom)
        arrayOfKeyAndValueDataForQuery.push(from);


    if (!isUndefinedWhereCondition)

        for (let key in where) {
            let value = where[key],
                arrayOfOperatorAndValue2d = where?.op,
                isFirstIndex = (index === 0),
                isBetweenOperator = isBetweenOperatorInString(value),
                isOpDefined = Array.isArray(value) && key === 'op',
                isLikeOperator = isLikeOperatorInString(value),
                newValue = getValueInSpaceString(value),
                isInOperator = isInOperatorInString(value),
                arrayOfSpecialQueryUtilitiesOperator = [],
                isAccessToCheckOtherCondition = false,
                newArrayForOperatorAndValue2d = [],
                isUsedAttachFunc = isAttachFunc(value),
                isUsedIsNotNullWord = value === IS_NOT_NULL,
                isUsedSetOperatorFuncForField = isSpaceWordInString(value),
                getOperatorForSetOperator = splitOperatorAndOrInSpaceWord(value).toUpperCase(),
                isNotOperator = !isInOperator && !isBetweenOperator && !isUsedIsNotNullWord && !isLikeOperator && !isUsedSetOperatorFuncForField && !isOpDefined,
                operator = getOperatorInSpaceString(value),
                initPlaceHolder = `${DOUBLE_QUESTION_MARK} ${operator} ${QUESTION_MARK}`;


            if (isUsedSetOperatorFuncForField && !isFirstIndex) {
                arrayOfKeyAndValueDataForQuery.push(key);
                arrayOfKeyAndValueDataForQuery.push(newValue);
                arrayOfEqualAndQuestionMarks.push(`${getOperatorForSetOperator} ${initPlaceHolder}`);
                index++;
            }


            if (isUsedSetOperatorFuncForField && isFirstIndex) {
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
                arrayOfEqualAndQuestionMarks.push(`${getOperatorForSetOperator} ${initPlaceHolder}`);
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


            if (isUsedIsNotNullWord && !isFirstIndex) {
                arrayOfEqualAndQuestionMarks.push(getOp(value));
                arrayOfKeyAndValueDataForQuery.push(key);
                arrayOfEqualAndQuestionMarks.push(`${DOUBLE_QUESTION_MARK} ${IS_NOT_NULL}`);
                index++;
            }


            if (isUsedIsNotNullWord && isFirstIndex) {
                arrayOfKeyAndValueDataForQuery.push(key);
                arrayOfEqualAndQuestionMarks.push(`${IS_NOT_NULL}`);
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
            delete where['op'];
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


    let isPreviousWordEqualDesc,
        isPreviousWordEqualAsc;

    for (let key in option) {
        let value = option[key],
            isUsedOrderByWord = key === 'order',
            getIndexOneFromOrderBy = value[1],
            isArrayIndexZeroFromOrderBy = Array.isArray(value[0]),
            isValueOfOrderByWordArray = Array.isArray(value),
            isValueOfLimitWordArray = Array.isArray(value),
            isUsedAscWord = value === ASC,
            isUsedDescWord = value === DESC,
            isUsedOffsetWord = key === OFFSET.toLowerCase(),
            isUsedLimitWord = key === LIMIT.toLowerCase();

        if ((isUsedAscWord && isPreviousWordEqualDesc) || (isUsedDescWord && isPreviousWordEqualAsc)) {
            arrayOfEqualAndQuestionMarks.push(`${COMMA} ${QUESTION_MARK}`);
            arrayOfKeyAndValueDataForQuery.push(key);
        }

        isPreviousWordEqualDesc = value === DESC;
        isPreviousWordEqualAsc = value === ASC;


        if (isUsedOrderByWord && !isValueOfOrderByWordArray) {
            arrayOfEqualAndQuestionMarks.push(`${ORDER_BY} ${QUESTION_MARK}`);
            arrayOfKeyAndValueDataForQuery.push(value);
        }


        if (isUsedOrderByWord && isValueOfOrderByWordArray && !isArrayIndexZeroFromOrderBy) {
            arrayOfEqualAndQuestionMarks.push(`${ORDER_BY} ${getDoubleQuestionMarkAndCommaForOrderBy(value)}`);
            arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(value);
        }

        if (isUsedOrderByWord && isValueOfOrderByWordArray && isArrayIndexZeroFromOrderBy) {
            arrayOfEqualAndQuestionMarks.push(`${ORDER_BY} ${getDoubleQuestionMarkAndCommaForOrderBy(value[0])} ${getIndexOneFromOrderBy} ${COMMA} ${QUESTION_MARK}`);
            arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(value[0]);
        }


        if (isUsedAscWord || isUsedDescWord) {
            arrayOfEqualAndQuestionMarks.push(`${value}`);
            arrayOfKeyAndValueDataForQuery.push(key);
        }


        if (isUsedLimitWord && isValueOfLimitWordArray) {
            arrayOfEqualAndQuestionMarks.push(`${LIMIT} ${QUESTION_MARK} ${COMMA} ${QUESTION_MARK}`);
            arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(value);
        }


        if (isUsedLimitWord && !isValueOfLimitWordArray) {
            arrayOfEqualAndQuestionMarks.push(`${LIMIT} ${QUESTION_MARK}`);
            arrayOfKeyAndValueDataForQuery.push(value);
        }


        if (isUsedOffsetWord) {
            arrayOfEqualAndQuestionMarks.push(`${OFFSET} ${QUESTION_MARK}`);
            arrayOfKeyAndValueDataForQuery.push(value);
        }


    }


    if (!isUndefinedWhereCondition)
        return `WHERE ${DOUBLE_QUESTION_MARK} ` +
            `${arrayOfEqualAndQuestionMarks.join(' ').trim()}`;

    return arrayOfEqualAndQuestionMarks.join(' ').trim();

}


function getArrayToString(arr) {
    return arr.toString().replace(',', ' ').trim();
}

function isDefinedDefaultWordInFirstOfString(str) {
    if (typeof str === 'string')
        return str.search('DEFAULT') === 0;
}

function isPointField(data) {
    return /X\(/.test(data);
}

function isCast(data) {
    return /CAST\(/.test(data);
}

function isAs(data) {
    return /POINTER_FOR_AS /.test(data);
}

function isCount(data) {
    return /COUNT\(/.test(data);
}

function isSource(data) {
    return /POINTER_FOR_SOURCE /.test(data);
}


module.exports = {


    sqlQuery: '',
    stringOfDataForForSet: '',
    dataForInsertSqlQuery: [],
    stringOfValueWithComma: '',
    arrayOfDataForSqlInjection: '',
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

        if (isValueOfIndexIsNumber && !isDefinedValueInIndexTwoOfArray && (!isEnum || !isSet))
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


    getGeneratedColumns(jsonObject) {

        let array2D = [];

        let data = jsonObject.data;
        let column = jsonObject.column;
        let sizeOfField = jsonObject.column.length;


        for (let i = 0; i < data.length; i += sizeOfField) {
            let chunk = data.slice(i, i + sizeOfField);
            array2D.push(chunk);
        }

        module.exports.dataForInsertSqlQuery = [array2D];

        return column.toString();
    },


    getFindSqlQuery(jsonObject) {

        module.exports.sqlQuery = getQueryAndCheckOtherConditionInJsonObject(jsonObject);

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
            query += ` ${COMMA} PRIMARY KEY (${jsonArray.primaryKey})`;


        return module.exports.sqlQuery = query;
    },

    generateUpdateSqlQueryWithData(jsonObject) {

        generateArrayOfKeyAndValueForEditField(jsonObject.edit);

        module.exports.sqlQuery = getQueryAndCheckOtherConditionInJsonObject(jsonObject);

        module.exports.stringOfDataForForSet = stringOfQuestionMarkAndEqual;

        arrayOfKeyAndValueDataForQuery.unshift(jsonObject.table);

        module.exports.arrayOfDataForUpdateOrDeleteQuery = arrayOfKeyAndValueDataForQuery;


        arrayOfKeyAndValueDataForQuery = [];
    },


    generateDeleteSqlQueryWithData(jsonObject) {

        module.exports.sqlQuery = getQueryAndCheckOtherConditionInJsonObject(jsonObject);

        arrayOfKeyAndValueDataForQuery.unshift(jsonObject.table);

        module.exports.arrayOfDataForUpdateOrDeleteQuery = arrayOfKeyAndValueDataForQuery;

        arrayOfKeyAndValueDataForQuery = [];
        module.exports.sqlQuery = '';
    },


    getStringOfColumnWithComma(data) {

        if (!Array.isArray(data))
            return data;

        return data.toString();
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
        return module.exports.arrayOfDataForUpdateOrDeleteQuery = [];
    },


    getIdentifier() {
        return identifier;
    },


    validateIdentifiers(index) {
        if (index === null)
            return;

        let isArray = Array.isArray(index);
        if (isArray) {

            let newArr = [];

            index.forEach((item, indexOfArr) => {
                let isLastIndex = index.length === indexOfArr + 1;


                if (item !== STAR && COUNT && !isPointField(item) && !isCast(item) && !isAs(item) && !isSource(item)) {
                    newArr.push(DOUBLE_QUESTION_MARK);
                }

                if (item !== STAR && COUNT && isPointField(item) && !isCast(item) && !isAs(item) && !isSource(item)) {
                    newArr.push(item);
                }

                if (isCast(item) || isCount(item)) {
                    newArr.push(item);
                }

                if (index === STAR) {
                    newArr.push(STAR);
                }

                if (isAs(item)) {
                    newArr.push(item.replace('POINTER_FOR_AS ', ''));
                }

                if (isSource(item)) {
                    newArr.push(item.replace('POINTER_FOR_SOURCE ', ''));
                }

                if (!isLastIndex)
                    newArr.push(COMMA);

            });

            return identifier = newArr.join(' ');
        }


        if (index !== STAR && COUNT && !isPointField(index)) {
            identifier = DOUBLE_QUESTION_MARK;
        }

        if (index !== STAR && COUNT && isPointField(index)) {
            identifier = index;
        }

        if (index === STAR) {
            identifier = STAR;
        }

        if (isCast(index) || isCount(index)) {
            identifier = index;
        }

        if (isAs(index) && !isPointField(index) && !isCast(index) && !isCount(index) && !isSource(index)) {
            identifier = index.replace('POINTER_FOR_AS ', '');
        }

        if (isSource(index)) {
            identifier = index.replace('POINTER_FOR_SOURCE ', '');
        }

    }


}
