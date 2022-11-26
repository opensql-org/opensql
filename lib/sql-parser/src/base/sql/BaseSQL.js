let keyword = require('../../Keyword'),
    DEV = require('../../base/sql/DatabaseExpressionValidator');

let index = 0,
    queryRes = [],
    injector = [],
    haveWhereNot = false;

function initializationIndexWhenExistMultiSqlQuery() {
    return index = 0;
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

/**
 * @type any
 * @param data
 */
function pushQuery(data) {
    queryRes.push(data);
}


/**
 * @type any
 * @param data
 * @type string
 * @param type
 */
function pushInject(data, type) {
    injector.push(toObject(data, type));
}


function getDoubleQuestionMarkAndCommaForOrderBy(arr) {
    let str = '';
    arr.forEach((item, index, arr) => {

        let lastIndex = arr.lastIndexOf(item);

        if (lastIndex) {
            str += ` , ?`;
        }

        if (!lastIndex) {
            str += `?`;
        }

    });
    return str;
}

function valueValidationForWhereJsonObject(key, data, optionData) {
    let isFirstIndex = index === 0,
        isBetweenOperator = data?.type === 'BETWEEN',
        isNotBetweenOperator = data?.type === 'NOT_BETWEEN',
        isLikeOperator = data?.type === 'LIKE',  // should be implement
        isNotLikeOperator = data?.type === 'NOT_LIKE',
        haveNot = !!data?.value?.haveNot,
        getNotFromComparisonOperator = haveNot ? ' NOT ' : ' ',
        qCheckValue = data?.value?.data,
        isInOperator = data?.type === 'IN',
        isNotInOperator = data?.type === 'NOT_IN',
        getInOperator = isInOperator ? 'IN' : 'NOT IN',
        getValueForInOperator = isInOperator || isNotInOperator ? data?.value : '',
        getBetweenOperator = isBetweenOperator ? 'BETWEEN' : 'NOT BETWEEN',
        isAccessToCheckOtherCondition = false,
        isUsedIsNotNullWord = data === keyword.IS_NOT_NULL,
        isUsedIsNullWord = data === keyword.IS_NULL,
        isQCheckFunction = data?.type === 'qCheck',
        isWhereCondition = optionData?.isWhere === true,
        isNotOperator = !isInOperator && !isNotInOperator && !isBetweenOperator && !isNotBetweenOperator &&
            !isUsedIsNotNullWord && !isUsedIsNullWord && !isLikeOperator && !isNotLikeOperator && !haveNot &&
            !isQCheckFunction && !isWhereCondition,
        comparisonOperator = data?.comparisonOperator,
        conjunctionOperator = data?.conjunctionType,
        initPlaceHolder = `?? ${comparisonOperator} ?`,
        pushQueryAndIncreaseIndex = (query) => {
            pushQuery(query);
            index++;
        },
        pushAll = (data, query) => {
            pushInject(key, 'COLUMN');
            pushInject(data, 'VALUE');
            pushQueryAndIncreaseIndex(query);
        },
        pushQueryAndInjection = (query) => {
            pushInject(key, 'COLUMN');
            pushQueryAndIncreaseIndex(query);
        },
        pushQCheckData = query => {
            pushAll(qCheckValue, query);
        },
        pushLikeData = query => {
            pushAll(data.value, query);
        },
        pushNotOperatorData = query => {
            pushAll(data, query);
        },
        pushInOperatorData = query => {
            pushAll(getValueForInOperator, query);
        },
        pushBetweenOperatorData = query => {
            pushQueryAndInjection(query);
        },
        pushIsNullOperatorData = query => {
            pushQueryAndInjection(query);
        },
        pushConjunctionOperator = () => {
            if (conjunctionOperator)
                pushQuery(conjunctionOperator);
        },
        pushCOPForInOperator = query => {
            pushConjunctionOperator();
            pushInOperatorData(query);
        },
        pushCOPForBetweenOperator = query => {
            pushConjunctionOperator();
            pushBetweenOperatorData(query);
        },
        pushCOPForLikeOperator = query => {
            pushConjunctionOperator();
            pushLikeData(query);
        },
        pushCOPForIsNullOperator = query => {
            pushConjunctionOperator();
            pushIsNullOperatorData(query);
        };


    if (isQCheckFunction && !isFirstIndex)
        pushQCheckData(`${conjunctionOperator}${getNotFromComparisonOperator}${initPlaceHolder}`);


    if (isQCheckFunction && isFirstIndex)
        pushQCheckData(`${comparisonOperator} ?`);


    if (!isAccessToCheckOtherCondition && isFirstIndex && isNotOperator)
        pushNotOperatorData(`${comparisonOperator} ?`);


    if (!isAccessToCheckOtherCondition && !isFirstIndex && isNotOperator)
        pushNotOperatorData(`${conjunctionOperator}${getNotFromComparisonOperator}${initPlaceHolder}`, 'COLUMN,VALUE');


    if ((isInOperator || isNotInOperator) && isFirstIndex)
        pushInOperatorData(getInOperator);


    if ((isInOperator || isNotInOperator) && !isFirstIndex)
        pushCOPForInOperator(`?? ${getInOperator}`);


    if ((isBetweenOperator || isNotBetweenOperator) && !isFirstIndex)
        pushCOPForBetweenOperator(`?? ${getBetweenOperator} ? AND ?`);


    if ((isBetweenOperator || isNotBetweenOperator) && isFirstIndex)
        pushBetweenOperatorData(`${getBetweenOperator} ? AND ?`);


    if (isBetweenOperator || isNotBetweenOperator)
        injector = injector.concat([toObject(data.value.first, 'VALUE'), toObject(data.value.second, 'VALUE')]);


    if (isLikeOperator && !isFirstIndex)
        pushCOPForLikeOperator('?? LIKE ?');


    if (isLikeOperator && isFirstIndex)
        pushLikeData('LIKE ?');


    if ((isUsedIsNotNullWord || isUsedIsNullWord) && !isFirstIndex)
        pushCOPForIsNullOperator(`?? ${data}`);


    if ((isUsedIsNotNullWord || isUsedIsNullWord) && isFirstIndex)
        pushIsNullOperatorData(`${data}`);

}


class BaseSQL {


    from;

    datum;

    column;

    option;

    /**
     * Used when need implement multi and or together
     */
    hasLetObject;

    expressions;

    hasGetObject;

    databaseName;

    hasFromObject;

    sqlConfig = {};

    whereSqlKeyword;

    hasOptionKeyword;

    hasWhereCondition;

    operationStatement;


    constructor(command, sqlConfig, databaseName) {
        this.sqlConfig = sqlConfig;
        this.databaseName = databaseName;

        this.validateObject(command[0], command[1]);

        index = 0;
    }


    initVariables() {
        index = 0;
        queryRes = [];
        injector = [];
        haveWhereNot = false;
    }


    validateObject(command, option) {
        this.from = command.from;
        this.column = command?.get;

        this.hasGetObject = !!this.column;
        this.hasFromObject = !!this.from;

        this.setSqlExpression(this.column);

        this.where = command?.where;

        if (!this.where)
            haveWhereNot = true;

        this.where = !this.where ? command?.whereNot : this.where;
        this.whereSqlKeyword = !this.where && command?.whereNot ? 'WHERE NOT' : this.where ? 'WHERE' : '';
        this.hasWhereCondition = !!this.where;

        this.union = command?.union;
        this.datum = command?.data;

        this.option = option?.option;
        this.hasOptionKeyword = !!this.option;
    }


    setSqlExpression(column) {
        if (column)
            this.expressions = DEV.toSQL(column);
    }


    /**
     * @param unionType
     * @type string
     */
    addUnionKeyword(unionType) {
        let query = [unionType, 'SELECT', this.expressions, 'FROM', '??'].join(' ');

        if (!this.hasWhereCondition)
            return pushQuery(query);


        pushQuery(`${query} ${this.whereSqlKeyword} ??`, ['TABLE', 'COLUMN']);
    }


    /**
     * @type {object}
     * @param isUnion => Verify union for composing multi query
     */
    queryHandler(isUnion) {

        let Result = () => {
            let data = {
                toSQL: queryRes?.join(' ').trim(),
                injection: injector
            };
            if (this.hasWhereCondition)
                data.toSQL = `${this.whereSqlKeyword} ?? ${data.toSQL}`;
            initializationIndexWhenExistMultiSqlQuery();
            return data;
        };

        if (!this.hasWhereCondition && !this.hasOptionKeyword && !this.hasFromObject && !this.hasGetObject)
            return Result();


        if (this.hasWhereCondition)

            for (let key in this.where) {
                let value = this.where[key],
                    needAttach = value?.type === 'ATTACH',
                    isFirstIndex = index === 0,
                    newArrayForOperatorAndValue2d = [],
                    comparisonOperator = !value?.comparisonOperator ? '=' : value?.comparisonOperator,
                    initPlaceHolder = `?? ${comparisonOperator} ?`;


                if (needAttach && !isFirstIndex)
                    pushQuery(value.comparisonOperator);


                if (needAttach) {
                    value.value.forEach(item => {
                        valueValidationForWhereJsonObject(key, item, {
                            isWhere: true
                        });
                    });
                    index++;
                }


                if (!needAttach)
                    valueValidationForWhereJsonObject(key, value);


                // Value hasn't multi and, or
                if (!Array.isArray(value) && key === '$let')
                    continue;

                let arrayOfComparisonOperator = [];

                this.hasLetObject.forEach(item2d => {

                    item2d.forEach((item, index) => {

                        let isAndOperator = item === 'AND';
                        let isOrOperator = item === 'OR';

                        if (isAndOperator || isOrOperator) {
                            arrayOfComparisonOperator.push(item);
                            item2d.splice(index, 1);
                        }

                    });

                    injector = injector.concat(item2d);
                    newArrayForOperatorAndValue2d = newArrayForOperatorAndValue2d.concat(item2d);

                });

                let isArrayFor2dHaveOneKeyAndValue = newArrayForOperatorAndValue2d.length === 2,
                    isArrayFor2dHaveMoreThanOneKeyAndValue = newArrayForOperatorAndValue2d.length > 2;


                if (isFirstIndex && (isArrayFor2dHaveOneKeyAndValue || isArrayFor2dHaveMoreThanOneKeyAndValue)) {
                    pushQuery(`${comparisonOperator} ?`);
                    index++;
                }


                if (isArrayFor2dHaveOneKeyAndValue || isArrayFor2dHaveMoreThanOneKeyAndValue) {

                    arrayOfComparisonOperator.forEach(item => {

                        pushQuery(`${item}`);
                        pushQuery(`${initPlaceHolder}`);

                    });

                    index++;
                }


            }


        let isPreviousWordEqualDesc,
            isPreviousWordEqualAsc;

        for (let key in this.option) {
            let value = this.option[key],
                isLimitKey = key === '$limit',
                pushQueryAndInjection = (query, value) => {
                    if (!value)
                        pushInject(value, 'VALUE');
                    else
                        pushInject(value, 'COLUMN');
                    pushQuery(query);
                },
                isOffsetKey = key === '$offset',
                isUsedAscWord = value === 'ASC',
                isOrderByKey = key === '$order',
                isGroupByKey = key === '$group',
                isUsedDescWord = value === 'DESC',
                getIndexOneFromOrderBy = value?.[1],
                isValueOfLimitWordArray = Array.isArray(value),
                isValueOfOrderByWordArray = Array.isArray(value),
                isArrayIndexZeroFromOrderBy = Array.isArray(value?.[0]);

            if (isGroupByKey) {
                if (Array.isArray(value))
                    value.forEach(item => {
                        pushQuery(item);
                    });
                else
                    pushQuery(value);
            }

            if ((isUsedAscWord && isPreviousWordEqualDesc) || (isUsedDescWord && isPreviousWordEqualAsc))
                pushQueryAndInjection(`, ?`, key);


            isPreviousWordEqualDesc = value === 'DESC';
            isPreviousWordEqualAsc = value === 'ASC';

            if (isOrderByKey && !isValueOfOrderByWordArray)
                pushQueryAndInjection('ORDER BY ?');


            if (isOrderByKey && isValueOfOrderByWordArray && !isArrayIndexZeroFromOrderBy) {
                pushQuery(`ORDER BY ${getDoubleQuestionMarkAndCommaForOrderBy(value)}`);
                injector = injector.concat(value);
            }

            if (isOrderByKey && isValueOfOrderByWordArray && isArrayIndexZeroFromOrderBy) {
                pushQuery(`ORDER BY ${getDoubleQuestionMarkAndCommaForOrderBy(value[0])} ${getIndexOneFromOrderBy} , ?`);
                injector = injector.concat(value[0]);
            }

            if (isUsedAscWord || isUsedDescWord)
                pushQueryAndInjection(value, key);


            if (isLimitKey && isValueOfLimitWordArray) {
                pushQuery('LIMIT ? , ?');
                injector = injector.concat(value);
            }


            if (isLimitKey && !isValueOfLimitWordArray)
                pushQueryAndInjection('LIMIT ?');


            if (isOffsetKey)
                pushQueryAndInjection('OFFSET ?');

        }

        return Result();

    }

}

module.exports = BaseSQL;