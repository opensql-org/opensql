let Util = require('../util/Util');
let DEV = require('../../base/sql/DatabaseExpressionValidator');

let indexForWhereJsonObject = 0,
    haveWhereNot = false;

function initializationIndexWhenExistMultiSqlQuery() {
    return indexForWhereJsonObject = 0;
}


/**
 * To detect data and apply injections related to the desired database
 *
 * @param value can be @type any for example "username" , "ali" , ...
 * @param type @type string for example "column" , "table" , "value" ...
 *
 * @return object
 */
function toObject(value, type) {
    return {
        value: value,
        type: type
    };
}

function valueValidationForWhereJsonObject(key, value, optionData) {
    let isFirstIndex = indexForWhereJsonObject === 0,
        isBetweenOperator = value?.type === 'BETWEEN',
        isNotBetweenOperator = value?.type === 'NOT_BETWEEN',
        isLikeOperator = value?.type === 'LIKE',
        isNOTLikeOperator = value?.type === 'NOT_LIKE',
        isNotWord = isNotInString(value),
        validationAndGetNotOperator = () => {
            return (isNotWord) ? ' NOT ' : ' ';
        },
        newValue = getValueInSpaceString(value),
        isInOperator =  value?.type === 'IN',
        isNotInOperator = value?.type === 'NOT_IN',
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
            !isUsedSetOperatorFuncForField && !isJsonObjectInWhereCondition,
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


class BaseSQL {


    from;

    datum;

    column;

    $group;

    $order;

    $limit;

    $offset;

    /**
     * Used when need implement multi and or together
     */
    conditions;

    expressions;

    hasGetObject;

    databaseName;

    injector = [];

    hasFromObject;

    queryRes = [];

    sqlConfig = {};

    whereSqlKeyword;

    hasOptionKeyword;

    hasWhereCondition;

    operationStatement;

    optionObjectWithoutValidKey;


    constructor(command, sqlConfig, databaseName) {
        this.sqlConfig = sqlConfig;
        this.databaseName = databaseName;

        this.validateObject(command[0], command[1]);

        this.index = 0;
    }


    initVariables() {
        this.index = 0;
        this.queryRes = [];
        this.injector = [];
        haveWhereNot = false;
    }


    validateObject(command, option) {
        this.from = command.from;
        this.column = command?.get;

        this.hasGetObject = !!this.column;
        this.hasFromObject = !!this.from;

        this.setSqlExpression(this.column);

        this.where = Util.objectSeparator(command?.where, ['$let']);

        if (!this.where)
            haveWhereNot = true;

        this.where = !this.where ? Util.objectSeparator(command?.whereNot, ['$let']) : this.where;
        this.conditions = !this.where?.$let ? command?.whereNot?.$let : this.where?.$let;
        this.whereSqlKeyword = !this.where && command?.whereNot ? 'WHERE NOT' : this.where ? 'WHERE' : '';
        this.hasWhereCondition = !!this.where;

        this.union = command?.union;
        this.datum = command?.data;
        this.$group = option?.$group;
        this.$order = option?.$order;
        this.$limit = option?.$limit;
        this.$offset = option?.$offset;

        this.optionObjectWithoutValidKey = Util.objectSeparator(option?.option, ['$group', '$order', '$limit', '$offset']);
        this.hasOptionKeyword = !!this.optionObjectWithoutValidKey;
    }


    setSqlExpression(column) {
        if (column)
            this.expressions = DEV.toSQL(column);
    }


    /**
     * @type any
     * @param data
     * @type string
     * @param type
     */
    pushQuery(data, type) {
        if (!type) {
            this.queryRes.push(data);
            return void 0;
        }

        this.queryRes.push(toObject(data, type));
    }


    /**
     * @type any
     * @param data
     * @type string
     * @param type
     */
    pushInject(data, type) {
        this.injector.push(toObject(data, type));
    }


    /**
     * @param unionType
     * @type string
     */
    addUnionKeyword(unionType) {
        let query = [unionType, 'SELECT', this.expressions, 'FROM', '??'].join(' ');

        if (!this.hasWhereCondition)
            return this.pushQuery(query);


        this.pushQuery(`${query} ${this.whereSqlKeyword} ??`, ['TABLE', 'COLUMN']);
    }


    /**
     * @type {object}
     * @param isUnion => Verify union for composing multi query
     */
    queryHandler(isUnion) {

        if (!this.hasWhereCondition && !this.hasOptionKeyword && !this.hasFromObject && !this.hasGetObject) {
            initializationIndexWhenExistMultiSqlQuery();
            return {toSQL: this.queryRes, injection: this.injector};
        }


        // TODO for not:{ like or something else}
        if (this.hasWhereCondition)

            for (let key in this.where) {
                let value = this.where[key],
                    needAttach = value?.type === 'ATTACH',
                    arrayOfComparisonOperatorWithObject = this.conditions,
                    isFirstIndex = indexForWhereJsonObject === 0,
                    hasLetObject = Array.isArray(value) && key === '$let',
                    arrayOfSpecialQueryUtilitiesOperator = [],
                    newArrayForOperatorAndValue2d = [],
                    cop = !value?.comparisonOperator ? '=' : value?.comparisonOperator,
                    initPlaceHolder = `?? ${cop} ?`;


                if (needAttach && !isFirstIndex)
                    this.pushQuery(value.comparisonOperator);


                if (needAttach) {
                    value.value.forEach(item => {
                        valueValidationForWhereJsonObject(key, item, {
                            isJsonObjectInWhereCondition: true
                        });
                    });
                    indexForWhereJsonObject++;
                }


                if (!isJsonObjectOfAttachMultiConditions(value))
                    valueValidationForWhereJsonObject(key, value);

                if (!hasLetObject)
                    continue;


                arrayOfComparisonOperatorWithObject.forEach(item2d => {

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


        if (hasWhereCondition) {
            initializationIndexWhenExistMultiSqlQuery();
            return `${whereKey()} ${DOUBLE_QUESTION_MARK} ` +
                `${arrayOfEqualAndQuestionMarks.join(' ').trim()}`;
        }

        initializationIndexWhenExistMultiSqlQuery();
        return arrayOfEqualAndQuestionMarks.join(' ').trim();

    }

}

module.exports = BaseSQL;