let DEV = require('../../base/sql/DatabaseExpressionValidator');

let index = 0,
    queryRes = [],
    injector = [],
    haveWhereNot = false;

function initializationIndexWhenExistMultiSqlQuery() {
    return index = 0;
}


/**
 * To detect data and apply injections related to the desired database
 * @param {any} value can be @type any for example "username" , "ali" , ...
 * @param {String} type for example "column" , "table" , "value" ...
 * @return {Object}
 */
function toObject(value, type) {
    return {
        value: value,
        type: type
    };
}


/**
 * @param {any} data
 * @return {void}
 */
function pushQuery(data) {
    queryRes.push(data);
}


/**
 * @param {any} data
 * @param {String} type
 * @return {void}
 */
function pushInject(data, type) {
    injector.push(toObject(data, type));
}


function getColumnPlaceHolder(arr) {
    arr.forEach((item, index, array) => {
        let isLastIndex = array.length === index + 1;

        pushInject(item, 'OPTION_COLUMN');

        pushQuery('__$OPTION_COLUMN$__');

        if (!isLastIndex)
            pushQuery(',');

    });
}

function havingHandler(arr) {
    pushQuery('HAVING');

    arr.forEach((item, index) => {

        let conjunctionType = item.conjunctionType,
            leftStatement = item.value.leftStatement,
            rightStatement = item.value.rightStatement,
            comparisonOperator = item.comparisonOperator;

        if (index > 0)
            pushQuery(conjunctionType)

        pushQuery(`${leftStatement} ${comparisonOperator} __$OPTION_VALUE$__`);

        pushInject(rightStatement, 'VALUE');
    });

}

function valueValidationForWhereJsonObject(key, data, optionData) {

    let isJsonCheckerFn = data?.value?.type === 'JsonChecker';


    key = isJsonCheckerFn ? key + data?.value?.key : key;


    let isFirstIndex = index === 0,
        isBetweenOperator = data?.type === 'BETWEEN',
        isNotBetweenOperator = data?.type === 'NOT_BETWEEN',
        isLikeOperator = data?.type === 'LIKE',
        isNotLikeOperator = data?.type === 'NOT_LIKE',
        haveNot = !!data?.value?.haveNot,
        getNotFromComparisonOperator = haveNot ? ' NOT ' : ' ',
        qCheckValue = data?.value?.data ?? data?.value,
        isInOperator = data?.type === 'IN',
        isNotInOperator = data?.type === 'NOT_IN',
        getInOperator = isInOperator ? 'IN ( __$VALUE$__ )' : 'NOT IN ( __$VALUE$__ )',
        getValueForInOperator = isInOperator || isNotInOperator ? data?.value : [],
        getBetweenOperator = isBetweenOperator ? 'BETWEEN' : 'NOT BETWEEN',
        isAccessToCheckOtherCondition = false,
        isUsedIsNotNullWord = data === 'IS NOT NULL',
        isUsedIsNullWord = data === 'IS NULL',
        isWhereCondition = optionData?.isWhere === true,
        isQCheckFunction = data?.type === 'qCheck',
        comparisonOperator = !data?.comparisonOperator ? '=' : data?.comparisonOperator,
        conjunctionOperator = !data?.conjunctionType ? 'AND' : data?.conjunctionType,

        isNotOperator = !isInOperator && !isNotInOperator && !isBetweenOperator && !isNotBetweenOperator &&
            !isUsedIsNotNullWord && !isUsedIsNullWord && !isLikeOperator && !isNotLikeOperator && !haveNot &&
            !isQCheckFunction && !isWhereCondition,

        initPlaceHolder = isJsonCheckerFn ?
            `${data?.value?.key?.indexOf('JSON_EXTRACT', 0) === 0
                ? data?.value?.key : key} ${comparisonOperator} __$VALUE$__` :
            `__$COLUMN_NAME$__ ${comparisonOperator} __$VALUE$__`,

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
        pushQCheckData = query => pushAll(qCheckValue, query),
        pushLikeData = query => pushAll(data.value, query),
        pushNotOperatorData = query => pushAll(data, query),
        pushInOperatorData = query => pushAll(getValueForInOperator, query),
        pushBetweenOperatorData = query => pushQueryAndInjection(query),
        pushIsNullOperatorData = query => pushQueryAndInjection(query),
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
        },
        pushJsonCheckerSqlAndInjection = query => {
            pushQuery(query);
            pushInject(data?.value?.has, 'VALUE');
            index++;
        };


    if (isJsonCheckerFn && isFirstIndex)
        pushJsonCheckerSqlAndInjection(initPlaceHolder);


    if (isJsonCheckerFn && !isFirstIndex)
        pushJsonCheckerSqlAndInjection(`${conjunctionOperator} ${initPlaceHolder}`);


    if (!isJsonCheckerFn && isFirstIndex)
        pushQuery('__$COLUMN_NAME$__');

    if (isQCheckFunction && !isJsonCheckerFn && !isFirstIndex)
        pushQCheckData(`${conjunctionOperator}${getNotFromComparisonOperator}${initPlaceHolder}`);


    if (isQCheckFunction && !isJsonCheckerFn && isFirstIndex)
        pushQCheckData(`${comparisonOperator} __$VALUE$__`);


    if (!isAccessToCheckOtherCondition && isFirstIndex && isNotOperator)
        pushNotOperatorData(`${comparisonOperator} __$VALUE$__`);


    if (!isAccessToCheckOtherCondition && !isFirstIndex && isNotOperator)
        pushNotOperatorData(`${conjunctionOperator}${getNotFromComparisonOperator}${initPlaceHolder}`, 'COLUMN,VALUE');


    if ((isInOperator || isNotInOperator) && isFirstIndex)
        pushInOperatorData(getInOperator);


    if ((isInOperator || isNotInOperator) && !isFirstIndex)
        pushCOPForInOperator(`__$COLUMN_NAME$__ ${getInOperator}`);


    if ((isBetweenOperator || isNotBetweenOperator) && !isFirstIndex)
        pushCOPForBetweenOperator(`__$COLUMN_NAME$__ ${getBetweenOperator} __$VALUE$__ AND __$VALUE$__`);


    if ((isBetweenOperator || isNotBetweenOperator) && isFirstIndex)
        pushBetweenOperatorData(`${getBetweenOperator} __$VALUE$__ AND __$VALUE$__`);


    if (isBetweenOperator || isNotBetweenOperator)
        injector = injector.concat([toObject(data.value.first, 'VALUE'), toObject(data.value.second, 'VALUE')]);


    if (isLikeOperator && !isFirstIndex)
        pushCOPForLikeOperator('__$COLUMN_NAME$__ LIKE __$VALUE$__');


    if (isLikeOperator && isFirstIndex)
        pushLikeData('LIKE __$VALUE$__');


    if ((isUsedIsNotNullWord || isUsedIsNullWord) && !isFirstIndex)
        pushCOPForIsNullOperator(`__$COLUMN_NAME$__ ${data}`);


    if ((isUsedIsNotNullWord || isUsedIsNullWord) && isFirstIndex)
        pushIsNullOperatorData(`${data}`);

}


function joinHandler(arr) {

    arr.forEach(item => {

        let type = item.type,
            from = item.value.from,
            leftStatement = item.value.lsm,
            rightStatement = item.value.rsm;

        pushQuery(`${type} ${from} ON ${leftStatement} = ${rightStatement}`);

    });
}

class BaseSQL {

    join;

    from;

    datum;

    union;

    column;

    option;

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

        this.validateObject(command);

        index = 0;
    }


    initVariables() {
        index = 0;
        queryRes = [];
        injector = [];
        haveWhereNot = false;
    }


    validateObject(command) {
        this.initVariables();
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

        this.join = command?.join;
        this.union = command?.union;
        this.datum = command?.data;

        this.option = command?.option;
        this.hasOptionKeyword = !!this.option;
    }


    setSqlExpression(column) {
        if (column) {
            this.expressions = DEV.toSQL(column);
            return;
        }

        this.expressions = '*';
    }


    /**
     * @param {String} unionType
     * @return {void}
     */
    addUnionKeyword(unionType) {

        this.setSqlExpression(this.column);

        let query = [unionType, 'SELECT', this.expressions, 'FROM', '__$TABLE_NAME$__'].join(' ');

        pushQuery(query);

    }


    /**
     * @return {{toSQL: string, injection: any[]}}
     */
    queryWhereHandler() {

        let Result = () => {
            let data = {
                toSQL: queryRes?.join(' '),
                injection: injector
            };

            /**
             * push table injection in first of array
             */
            data.injection.unshift({value: this.from, type: 'TABLE'});

            initializationIndexWhenExistMultiSqlQuery();
            return data;
        };

        if (!this.hasWhereCondition && !this.hasOptionKeyword && !this.hasFromObject && !this.hasGetObject)
            return Result();

        if (this.join)
            joinHandler(Array.isArray(this.join) ? this.join : [this.join]);

        if (this.hasWhereCondition) {

            pushQuery(this.whereSqlKeyword);

            for (let key in this.where) {
                /**
                 * In Valid json object we can use dot between TABLE NAME and TABLE COLUMN NAME
                 * Example:
                 *    SELECT * FROM users,books WHERE users.id = books.userId
                 *    The sql code above is the result of this json object
                 *    @example
                 *    {
                 *        from: ['users', 'books'],
                 *        where: {
                 *            users$id: books$userId
                 *        }
                 *    }
                 */
                key = key.replace('$', '.');
                let value = this.where[key],
                    needAttach = value?.type === 'ATTACH',
                    isFirstIndex = index === 0;


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

            }
        }


        if (!this.option)
            return Result();

        let isPreviousWordEqualDesc,
            haveGroupBy,
            isPreviousArrayFromIndexOneHaveDescOrAsc,
            isPreviousWordEqualAsc;


        for (let key in this.option) {
            key = key.indexOf('$', 0) === 0 ? key : key.replace('$', '.');
            let value = this.option[key],
                isLimitKey = key === '$limit',
                isOffsetKey = key === '$offset',
                isUsedAscWord = value === 'ASC',
                isOrderByKey = key === '$order',
                isHavingKey = key === '$having',
                isGroupByKey = key === '$group',
                isUsedDescWord = value === 'DESC',
                pushQueryAndInjection = (query, v) => {
                    if (!v)
                        pushInject(value, 'OPTION_VALUE');

                    if ((isUsedAscWord && isPreviousWordEqualDesc) || (isUsedDescWord && isPreviousWordEqualAsc))
                        pushInject(key, 'OPTION_COLUMN');

                    pushQuery(query);
                },
                pushColumnPlaceHolder = (query, value) => {
                    pushQuery(query);
                    getColumnPlaceHolder(value);
                },
                getIndexOneFromOrderBy = value?.[1],
                isValueOfLimitWordArray = Array.isArray(value),
                isValueOfOrderByWordArray = Array.isArray(value),
                isArrayIndexZeroFromOrderBy = Array.isArray(value?.[0]);

            if (isGroupByKey) {
                if (Array.isArray(value))
                    pushColumnPlaceHolder('GROUP BY', value);
                else {
                    pushQuery('GROUP BY __$OPTION_COLUMN$__');
                    pushInject(value, 'OPTION_COLUMN');
                }
                haveGroupBy = true;
            }

            if (haveGroupBy && isHavingKey) {
                havingHandler(Array.isArray(value) ? value : [value]);
                haveGroupBy = false;
            }

            if ((isUsedAscWord && isPreviousWordEqualDesc) || (isUsedDescWord && isPreviousWordEqualAsc))
                pushQueryAndInjection(', __$OPTION_COLUMN$__', key);


            isPreviousWordEqualDesc = value === 'DESC';
            isPreviousWordEqualAsc = value === 'ASC';

            if (isOrderByKey && !isValueOfOrderByWordArray)
                pushQueryAndInjection('ORDER BY __$OPTION_COLUMN$__');


            if (isOrderByKey && isValueOfOrderByWordArray && !isArrayIndexZeroFromOrderBy)
                pushColumnPlaceHolder('ORDER BY', value);


            if (isOrderByKey && isValueOfOrderByWordArray && isArrayIndexZeroFromOrderBy) {
                pushColumnPlaceHolder('ORDER BY', value[0]);
                pushQuery(getIndexOneFromOrderBy);
                isPreviousArrayFromIndexOneHaveDescOrAsc = true;
            }

            if (isUsedAscWord || isUsedDescWord) {
                if (isPreviousArrayFromIndexOneHaveDescOrAsc) {
                    pushInject(key, 'OPTION_COLUMN');
                    pushQuery(`, __$OPTION_COLUMN$__ ${value}`);
                } else
                    pushQueryAndInjection(value, key);
                isPreviousArrayFromIndexOneHaveDescOrAsc = false;
            }


            if (isLimitKey && isValueOfLimitWordArray) {
                pushQuery('LIMIT __$OPTION_VALUE$__ , __$OPTION_VALUE$__');
                pushInject(value[0], 'OPTION_VALUE');
                pushInject(value[1], 'OPTION_VALUE');
            }


            if (isLimitKey && !isValueOfLimitWordArray)
                pushQueryAndInjection('LIMIT __$OPTION_VALUE$__');


            if (isOffsetKey)
                pushQueryAndInjection('OFFSET __$OPTION_VALUE$__');


        }

        return Result();

    }

}

module.exports = BaseSQL;