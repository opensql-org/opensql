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
        NOT_IN,
        OFFSET,
        BETWEEN,
        ORDER_BY,
        DISTINCT,
        NOT_BETWEEN,
        QUESTION_MARK,
        AUTO_INCREMENT,
        DOUBLE_QUESTION_MARK,
    } = require('../util/KeywordHelper'),
    {
        NULL,
        IS_NULL,
        EQUAL_TO,
        NOT_NULL,
        LESS_THAN,
        IS_NOT_NULL,
        GREATER_THAN,
        NOT_EQUAL_TO,
        LESS_THAN_OR_EQUAL_TO,
        GREATER_THAN_OR_EQUAL_TO
    } = require('../util/QueryHelper');


let stringOfQuestionMarkAndEqual,
    indexForWhereJsonObject = 0,
    arrayOfEqualAndQuestionMarks = [],
    arrayOfKeyAndValueDataForQuery = [],
    identifier;

let arrayOfOperator = [
    EQUAL_TO,
    LESS_THAN,
    GREATER_THAN,
    NOT_EQUAL_TO,
    LESS_THAN_OR_EQUAL_TO,
    GREATER_THAN_OR_EQUAL_TO
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
    let newStr = str;
    let isNotOperator = isNotInString(newStr);
    if (isNotOperator)
        newStr = spiltValueInStringNot(newStr);

    if (arrayOfOperator.includes(newStr))
        return newStr;

    let operator = splitOperatorInString(newStr);
    if (isSpaceWordInString(newStr) && operator !== undefined)
        return operator;

    return EQUAL_TO;
}


function splitOperatorAndOrInSpaceWord(str) {
    if (isSpaceWordInString(str) && (isOrOperator(str) || isAndOperator(str)))
        return str.split(' ')[0];
    return AND;
}


function spiltValueInStringNot(str) {
    let finalStr = '';
    try {
        let newStr = str.split(' ');
        if (newStr[1] === 'POINTER_FOR_NOT')
            finalStr = newStr[2];
        if (newStr[0] === 'POINTER_FOR_NOT')
            finalStr = newStr[1];
        if (newStr[0] === 'and' || newStr[0] === 'or')
            newStr.shift();
        return finalStr;
    } catch (e) {
    }
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

function stringToArrayForNotInOperator(str) {
    return str.replace('POINTER_FOR_NOT_IN', '').trim().split(',');
}

function removeAndOperatorInWordInString(str) {
    return str.replace('POINTER_FOR_IN', '').trim();
}

function removeOrOperatorInString(str) {
    return str.replace('or ', '').trim();
}

function isAndOperator(str) {
    if (str !== undefined)
        return str.search('and') === 0;
    return false;
}

function isOrOperator(str) {
    if (str !== undefined)
        return str.search('or') === 0;
    return false;
}

function getValidValue(str) {
    if (isOrOperator(str))
        return removeOrOperatorInString(str);
    if (isAndOperator(str))
        return removeAndOperatorInWordInString(str);
    return str;
}

function isInOperatorInString(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_IN/.test(str);
    return false;
}

function isNotInOperatorInString(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_NOT_IN/.test(str);
    return false;
}

function isBetweenOperatorInString(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_BETWEEN/.test(str);
    return false;
}

function isNotBetweenOperatorInString(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_NOT_BETWEEN/.test(str);
    return false;
}


function isNotInString(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_NOT/.test(str);
    return false;
}

function isLikeOperatorInString(str) {
    if (typeof str === 'string')
        return /POINTER_FOR_LIKE/.test(str);
    return false;
}

function getValueOfLikeOperator(str) {
    return str.split(' ')[1];
}

function getOp(str) {
    let lastIndex = arrayOfEqualAndQuestionMarks[arrayOfEqualAndQuestionMarks.length - 1];
    if (lastIndex === 'OR' || lastIndex === 'AND')
        return '';
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

function isEmptyOpChar(value) {
    return getOp(value) === '';
}


function valueValidationForWhereJsonObject(key, value, optionData) {
    let isFirstIndex = (indexForWhereJsonObject === 0),
        isBetweenOperator = isBetweenOperatorInString(value),
        isNotBetweenOperator = isNotBetweenOperatorInString(value),
        isOpDefined = Array.isArray(value) && key === 'op',
        isLikeOperator = isLikeOperatorInString(value),
        isNotWord = isNotInString(value),
        validationAndGetNotOperator = () => {
            return (isNotWord) ? ' NOT ' : ' ';
        },
        newValue = getValueInSpaceString(value),
        isInOperator = isInOperatorInString(value),
        isNotInOperator = isNotInOperatorInString(value),
        getInOperator = () => {
            if (isInOperator)
                return IN;
            return NOT_IN;
        },
        getValueForInOperator = () => {
            if (isInOperator)
                return stringToArrayForInOperator(getValidValue(value));

            return stringToArrayForNotInOperator(getValidValue(value));
        },
        getBetweenOperator = () => {
            if (isBetweenOperator)
                return BETWEEN;
            return NOT_BETWEEN;
        },
        isAccessToCheckOtherCondition = false,
        isUsedIsNotNullWord = value === IS_NOT_NULL,
        isUsedIsNullWord = value === IS_NULL,
        isUsedSetOperatorFuncForField = isSpaceWordInString(value),
        getJsonObjectInWhereCondition = (optionData !== undefined) ?
            optionData['isJsonObjectInWhereCondition'] : false,
        isJsonObjectInWhereCondition = getJsonObjectInWhereCondition === true,
        isNotOperator = !isInOperator && !isNotInOperator && !isBetweenOperator && !isNotBetweenOperator &&
            !isUsedIsNotNullWord && !isUsedIsNullWord && !isLikeOperator && !isNotWord &&
            !isUsedSetOperatorFuncForField && !isOpDefined && !isJsonObjectInWhereCondition,
        operator = getOperatorInSpaceString(value),
        getOperatorForSetOperator = splitOperatorAndOrInSpaceWord(value).toUpperCase(),
        initPlaceHolder = `${DOUBLE_QUESTION_MARK} ${operator} ${QUESTION_MARK}`;


    if (isUsedSetOperatorFuncForField && !isFirstIndex) {
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfKeyAndValueDataForQuery.push(newValue);
        arrayOfEqualAndQuestionMarks.push(`${getOperatorForSetOperator}${validationAndGetNotOperator()}${initPlaceHolder}`);
        indexForWhereJsonObject++;
    }


    if (isUsedSetOperatorFuncForField && isFirstIndex) {
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfKeyAndValueDataForQuery.push(newValue);
        arrayOfEqualAndQuestionMarks.push(`${operator} ${QUESTION_MARK}`);
        indexForWhereJsonObject++;
    }


    if (!isAccessToCheckOtherCondition && isFirstIndex && isNotOperator) {
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfKeyAndValueDataForQuery.push(value);
        arrayOfEqualAndQuestionMarks.push(`${operator} ${QUESTION_MARK}`);
        indexForWhereJsonObject++;
    }

    if (!isAccessToCheckOtherCondition && !isFirstIndex && isNotOperator) {
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfKeyAndValueDataForQuery.push(value);
        arrayOfEqualAndQuestionMarks.push(`${getOperatorForSetOperator}${validationAndGetNotOperator()}${initPlaceHolder}`);
        indexForWhereJsonObject++;
    }

    if ((isInOperator || isNotInOperator) && isFirstIndex) {
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfEqualAndQuestionMarks.push(getInOperator());
        arrayOfKeyAndValueDataForQuery.push(getValueForInOperator());
        indexForWhereJsonObject++;
    }


    if ((isInOperator || isNotInOperator) && !isFirstIndex) {
        arrayOfKeyAndValueDataForQuery.push(key);
        if (!isEmptyOpChar(value))
            arrayOfEqualAndQuestionMarks.push(getOp(value));
        arrayOfEqualAndQuestionMarks.push(`${DOUBLE_QUESTION_MARK} ${getInOperator()}`);
        arrayOfKeyAndValueDataForQuery.push(getValueForInOperator());
        indexForWhereJsonObject++;
    }


    if ((isBetweenOperator || isNotBetweenOperator) && !isFirstIndex) {
        if (!isEmptyOpChar(value))
            arrayOfEqualAndQuestionMarks.push(getOp(value));
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfEqualAndQuestionMarks.push(`${DOUBLE_QUESTION_MARK} ${getBetweenOperator()} ${QUESTION_MARK} ${AND} ${QUESTION_MARK}`);
        indexForWhereJsonObject++;
    }

    if ((isBetweenOperator || isNotBetweenOperator) && isFirstIndex) {
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfEqualAndQuestionMarks.push(`${getBetweenOperator()} ${QUESTION_MARK} ${AND} ${QUESTION_MARK}`);
        indexForWhereJsonObject++;
    }


    if (isBetweenOperator || isNotBetweenOperator) {
        arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(splitStringToArrayOfCharactersForBetweenOperator(value));
        indexForWhereJsonObject++;
    }


    if (isLikeOperator && !isFirstIndex) {
        if (!isEmptyOpChar(value))
            arrayOfEqualAndQuestionMarks.push(getOp(value));
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfKeyAndValueDataForQuery.push(getValueOfLikeOperator(getValidValue(value)));
        arrayOfEqualAndQuestionMarks.push(`${DOUBLE_QUESTION_MARK} ${LIKE} ${QUESTION_MARK}`);
        indexForWhereJsonObject++;
    }


    if (isLikeOperator && isFirstIndex) {
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfKeyAndValueDataForQuery.push(getValueOfLikeOperator(getValidValue(value)));
        arrayOfEqualAndQuestionMarks.push(`${LIKE} ${QUESTION_MARK}`);
        indexForWhereJsonObject++;
    }


    if ((isUsedIsNotNullWord || isUsedIsNullWord) && !isFirstIndex) {
        if (!isEmptyOpChar(value))
            arrayOfEqualAndQuestionMarks.push(getOp(value));
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfEqualAndQuestionMarks.push(`${DOUBLE_QUESTION_MARK} ${value}`);
        indexForWhereJsonObject++;
    }


    if ((isUsedIsNotNullWord || isUsedIsNullWord) && isFirstIndex) {
        arrayOfKeyAndValueDataForQuery.push(key);
        arrayOfEqualAndQuestionMarks.push(`${value}`);
        indexForWhereJsonObject++;
    }

}

function isJsonObjectOfAttachMultiConditions(data) {
    if (data === undefined)
        return false;
    if (data.constructor === ({}).constructor)
        return true;
}


function InitializationIndexWhenExistMultiSqlQuery() {
    return indexForWhereJsonObject = 0;
}


function getQueryAndCheckOtherConditionInJsonObject(jsonObject, isUnion, unionType) {
    let validateWhere = () => {
            return (jsonObject?.where !== undefined) ? jsonObject?.where :
                (jsonObject?.whereNot !== undefined) ? jsonObject?.whereNot : jsonObject?.where
        },
        getWhereKey = () => {
            return (jsonObject?.where !== undefined) ? 'WHERE' :
                (jsonObject?.whereNot !== undefined) ? 'WHERE NOT' : 'WHERE'
        },
        where = validateWhere(),
        option = jsonObject?.option,
        get = jsonObject?.get,
        from = jsonObject?.from,
        isUndefinedWhereCondition = where === undefined,
        isDefinedGet = get !== undefined,
        isDefinedFrom = from !== undefined,
        isUndefinedOptionKeyword = option === undefined;


    if (isUndefinedWhereCondition && isUndefinedOptionKeyword && !isDefinedFrom && !isDefinedGet) {
        InitializationIndexWhenExistMultiSqlQuery();
        return module.exports.sqlQuery = '';
    }

    if (isDefinedGet)
        module.exports.validateIdentifiers(get);

    if (isDefinedFrom)
        arrayOfKeyAndValueDataForQuery.push(from);

    if (isUnion === true) {

        if (isUndefinedWhereCondition)
            arrayOfEqualAndQuestionMarks.push(`${unionType} ` + `SELECT ${module.exports.getIdentifier()} ` + `FROM ${DOUBLE_QUESTION_MARK}`);


        if (!isUndefinedWhereCondition)
            arrayOfEqualAndQuestionMarks.push(`${unionType} ` + `SELECT ${module.exports.getIdentifier()} ` + `FROM ${DOUBLE_QUESTION_MARK} ${getWhereKey()} ${DOUBLE_QUESTION_MARK}`);

    }

    if (!isUndefinedWhereCondition)

        for (let key in where) {
            let value = where[key],
                arrayOfOperatorAndValue2d = where?.op,
                isFirstIndex = (indexForWhereJsonObject === 0),
                isOpDefined = Array.isArray(value) && key === 'op',
                arrayOfSpecialQueryUtilitiesOperator = [],
                newArrayForOperatorAndValue2d = [],
                getAttachOpType = () => {
                    try {
                        let type = value['op'];
                        if (type !== undefined)
                            return type;
                        return AND;
                    } catch (e) {
                    }
                },
                operator = getOperatorInSpaceString(value),
                initPlaceHolder = `${DOUBLE_QUESTION_MARK} ${operator} ${QUESTION_MARK}`;


            if (isJsonObjectOfAttachMultiConditions(value) && !isFirstIndex) {
                arrayOfEqualAndQuestionMarks.push(getAttachOpType());
            }

            if (isJsonObjectOfAttachMultiConditions(value)) {
                value['data'].forEach(item => {
                    valueValidationForWhereJsonObject(key, item, {
                        isJsonObjectInWhereCondition: true
                    });
                });
                indexForWhereJsonObject++;
            }


            if (!isJsonObjectOfAttachMultiConditions(value))
                valueValidationForWhereJsonObject(key, value);

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
                indexForWhereJsonObject++;
            }


            if (isArrayFor2dHaveOneKeyAndValue || isArrayFor2dHaveMoreThanOneKeyAndValue) {

                arrayOfSpecialQueryUtilitiesOperator.forEach(item => {

                    arrayOfEqualAndQuestionMarks.push(`${item}`);
                    arrayOfEqualAndQuestionMarks.push(`${initPlaceHolder}`);

                });

                indexForWhereJsonObject++;
            }


        }


    let isPreviousWordEqualDesc,
        isPreviousWordEqualAsc;

    for (let key in option) {
        let value = option[key],
            isUsedOrderByWord = key === 'order',
            isUsedGroupByWord = key === 'group',
            getIndexOneFromOrderBy = value[1],
            isArrayIndexZeroFromOrderBy = Array.isArray(value[0]),
            isValueOfOrderByWordArray = Array.isArray(value),
            isValueOfLimitWordArray = Array.isArray(value),
            isUsedAscWord = value === ASC,
            isUsedDescWord = value === DESC,
            isUsedOffsetWord = key === OFFSET.toLowerCase(),
            isUsedLimitWord = key === LIMIT.toLowerCase();


        if (isUsedGroupByWord) {
            if (Array.isArray(value))
                return value.forEach(item => {
                    arrayOfEqualAndQuestionMarks.push(item);
                });
            arrayOfEqualAndQuestionMarks.push(value);
        }


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


    if (!isUndefinedWhereCondition) {
        InitializationIndexWhenExistMultiSqlQuery();
        return `${getWhereKey()} ${DOUBLE_QUESTION_MARK} ` +
            `${arrayOfEqualAndQuestionMarks.join(' ').trim()}`;
    }

    InitializationIndexWhenExistMultiSqlQuery();
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

function isMIN(data) {
    return /MIN\(/.test(data);
}

function isMAX(data) {
    return /MAX\(/.test(data);
}

function isAVG(data) {
    return /AVG\(/.test(data);
}

function isSUM(data) {
    return /SUM\(/.test(data);
}

function isAs(data) {
    return /POINTER_FOR_AS /.test(data);
}

function isCount(data) {
    return /COUNT\(/.test(data);
}

function isConcatWs(data) {
    return /CONCAT_WS\(/.test(data);
}

function isSource(data) {
    return /POINTER_FOR_SOURCE /.test(data);
}

function isColumn(item) {
    return item !== STAR && item !== COUNT && !isPointField(item) && !isCast(item) && !isAs(item) &&
        !isSource(item) && item !== DISTINCT && !isMAX(item) && !isMIN(item) && !isSUM(item) &&
        !isAVG(item) && !isConcatWs(item);
}


function isSqlFunction(item) {
    return (isCast(item) || isCount(item) || isMAX(item) || isMIN(item) ||
        isSUM(item) || isAVG(item) || isConcatWs(item));
}


function verifyIdentifiers(item) {
    if (isSqlFunction(item) || item === STAR || item === DISTINCT || isPointField(item))
        return item;

    if (isAs(item))
        return item.replace('POINTER_FOR_AS ', '');


    if (isSource(item))
        return item.replace('POINTER_FOR_SOURCE ', '');
}

module.exports = {


    sqlQuery: '',
    stringOfDataForForSet: '',
    dataForInsertSqlQuery: [],
    stringOfValueWithComma: '',
    arrayOfDataForSqlInjection: [],
    stringOfDoubleQuestionMarkAndComma: '',


    validateUnionQuery(array) {
        if (array === null)
            return;

        let isUnion = true;

        array.forEach(item => {

            getQueryAndCheckOtherConditionInJsonObject(item.data, isUnion, item.type);

        });
        module.exports.sqlQuery = arrayOfEqualAndQuestionMarks.join(' ').trim();
    },


    addDataTypeForFieldInFirstItemOfArray(type, data) {

        if (data === undefined)
            return type;

        let isArray = Array.isArray(data),
            isValueOfIndexIsNumber = false,
            newArrayForOptionsContains = [],
            newArrayOfValue = [],
            isDefinedValueInIndexTwoOfArray = false;


        let isDecimal = type === 'decimal',
            isDouble = type === 'double',
            isFloat = type === 'float',
            isReal = type === 'real',
            isEnum = type === 'enum',
            isSet = type === 'set';


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
        module.exports.arrayOfDataForSqlInjection = arrayOfKeyAndValueDataForQuery;

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

        module.exports.arrayOfDataForSqlInjection = arrayOfKeyAndValueDataForQuery;

    },


    generateDeleteSqlQueryWithData(jsonObject) {

        module.exports.sqlQuery = getQueryAndCheckOtherConditionInJsonObject(jsonObject);

        arrayOfKeyAndValueDataForQuery.unshift(jsonObject.table);

        module.exports.arrayOfDataForSqlInjection = arrayOfKeyAndValueDataForQuery;
    },


    getStringOfColumnWithComma(data) {

        if (!Array.isArray(data))
            return data;

        return data.toString();
    },


    setNullValueInRam() {
        identifier = '';
        indexForWhereJsonObject = 0;
        module.exports.sqlQuery = '';
        arrayOfEqualAndQuestionMarks = [];
        stringOfQuestionMarkAndEqual = '';
        arrayOfKeyAndValueDataForQuery = [];
        module.exports.stringOfDataForForSet = '';
        module.exports.dataForInsertSqlQuery = [];
        module.exports.stringOfValueWithComma = '';
        module.exports.arrayOfDataForSqlInjection = [];
        module.exports.stringOfDoubleQuestionMarkAndComma = '';
    },


    getIdentifier() {
        return identifier;
    },


    validateIdentifiers(index) {
        if (index === null)
            return identifier = STAR;

        let isArray = Array.isArray(index);
        let arrayOfData = [];
        let isLengthOfArrayMoreThanOne = () => {
            return arrayOfData.length > 1;
        }
        let getData = () => {
            if (isLengthOfArrayMoreThanOne())
                return arrayOfData;

            return arrayOfData[0];
        }
        if (isArray) {

            let newArr = [];

            index.forEach((item, indexOfArr) => {
                let isLastIndex = index.length === indexOfArr + 1;


                if (isColumn(item)) {
                    arrayOfData.push(item);
                    newArr.push(DOUBLE_QUESTION_MARK);
                }

                if (!isColumn(item))
                    newArr.push(verifyIdentifiers(item));


                if (!isLastIndex && item !== DISTINCT)
                    newArr.push(COMMA);


            });

            arrayOfKeyAndValueDataForQuery.push(getData());
            return identifier = newArr.join(' ');
        }


        if (isColumn(index) && !isSqlFunction(index)) {
            arrayOfData.push(index);
            identifier = DOUBLE_QUESTION_MARK;
        }


        if (!isColumn(index) || isSqlFunction(index))
            identifier = verifyIdentifiers(index);


        arrayOfKeyAndValueDataForQuery.push(getData());

    }


}
