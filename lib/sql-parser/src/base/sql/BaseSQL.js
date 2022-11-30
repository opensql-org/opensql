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
            str += ' , __$OPTION_COLUMN$__';
        }

        if (!lastIndex) {
            str += '__$OPTION_COLUMN$__';
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
        comparisonOperator = !data?.comparisonOperator ? '=' : data?.comparisonOperator,
        conjunctionOperator = !data?.conjunctionType ? 'AND' : data?.conjunctionType,
        initPlaceHolder = `__$COLUMN_NAME$__ ${comparisonOperator} __$VALUE$__`,
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


class BaseSQL {


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
     * @param unionType
     * @type string
     */
    addUnionKeyword(unionType) {

        this.setSqlExpression(this.column);

        let query = [unionType, 'SELECT', this.expressions, 'FROM', '__$TABLE_NAME$__'].join(' ');

        if (!this.hasWhereCondition)
            return pushQuery(query);


        pushQuery(`${query} ${this.whereSqlKeyword} __$COLUMN_NAME$__`);
    }


    /**
     * @return {{toSQL: string, injection: *[]}}
     */
    queryHandler() {

        let Result = () => {
            let data = {
                toSQL: queryRes?.join(' '),
                injection: injector
            };

            /**
             * push table injection in first of array
             */
            data.injection.unshift({value: this.from, type: 'TABLE'});

            if (this.hasWhereCondition)
                data.toSQL = !!this.union ? `${this.whereSqlKeyword} __$COLUMN_NAME$__ ${data.toSQL}` : data.toSQL;


            initializationIndexWhenExistMultiSqlQuery();
            return data;
        };

        if (!this.hasWhereCondition && !this.hasOptionKeyword && !this.hasFromObject && !this.hasGetObject)
            return Result();


        if (this.hasWhereCondition)

            for (let key in this.where) {
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


        if (!this.option)
            return Result();

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
                pushQueryAndInjection(`, __$OPTION_COLUMN$__`, key);


            isPreviousWordEqualDesc = value === 'DESC';
            isPreviousWordEqualAsc = value === 'ASC';

            if (isOrderByKey && !isValueOfOrderByWordArray)
                pushQueryAndInjection('ORDER BY __$OPTION_COLUMN$__');


            if (isOrderByKey && isValueOfOrderByWordArray && !isArrayIndexZeroFromOrderBy) {
                pushQuery(`ORDER BY ${getDoubleQuestionMarkAndCommaForOrderBy(value)}`);
                injector = injector.concat(value);
            }

            if (isOrderByKey && isValueOfOrderByWordArray && isArrayIndexZeroFromOrderBy) {
                pushQuery(`ORDER BY ${getDoubleQuestionMarkAndCommaForOrderBy(value[0])} ${getIndexOneFromOrderBy} , __$OPTION_COLUMN$__`);
                injector = injector.concat(value[0]);
            }

            if (isUsedAscWord || isUsedDescWord)
                pushQueryAndInjection(value, key);


            if (isLimitKey && isValueOfLimitWordArray) {
                pushQuery('LIMIT __$OPTION_VALUE$__ , __$OPTION_VALUE$__');
                injector = injector.concat(value);
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