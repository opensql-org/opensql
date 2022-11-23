let Util = require('../util/Util');
let DEV = require('../../base/sql/DatabaseExpressionValidator');

let indexForWhereJsonObject = 0;

function initializationIndexWhenExistMultiSqlQuery() {
    return indexForWhereJsonObject = 0;
}

class BaseSQL {


    from;

    column;

    datum;

    $group;

    $order;

    $limit;

    $offset;

    injector;

    /**
     * Used when need implement multi and or together
     */
    conditions;

    expressions;

    hasGetObject;

    databaseName;

    command = [];

    hasFromObject;

    queryRes = [];

    sqlConfig = {};

    whereSqlKeyword;

    hasOptionKeyword;

    hasWhereCondition;

    operationStatement;

    optionObjectWithoutValidKey;


    constructor(command, sqlConfig, databaseName) {
        this.command = command;
        this.sqlConfig = sqlConfig;
        this.databaseName = databaseName;
        this.from = this.command[0].from;
        this.column = this.command[0]?.get;

        this.hasGetObject = !!this.column;
        this.hasFromObject = !!this.from;

        this.setSqlExpression(this.column);

        this.conditions = !this.command[0]?.where?.$let ? this.command[0]?.whereNot?.$let : this.command[0]?.where?.$let;

        this.where = Util.objectSeparator(this.command[0]?.where, ['$let']);
        this.where = !this.where ? Util.objectSeparator(this.command[0]?.whereNot, ['$let']) : this.where;
        this.whereSqlKeyword = !this.where ? 'WHERE NOT' : 'WHERE';
        this.hasWhereCondition = !!this.where;

        this.union = this.command[0]?.union;
        this.datum = this.command[0]?.data;
        this.$group = this.command[1]?.$group;
        this.$order = this.command[1]?.$order;
        this.$limit = this.command[1]?.$limit;
        this.$offset = this.command[1]?.$offset;

        this.optionObjectWithoutValidKey = Util.objectSeparator(this.command[1]?.option, ['$group', '$order', '$limit', '$offset']);
        this.hasOptionKeyword = !!this.optionObjectWithoutValidKey;
    }

    setSqlExpression(column) {
        if (column)
            this.expressions = DEV.toSQL(column, this.databaseName);
    }

    /**
     * @param unionType
     * @param string
     */
    addUnionKeyword(unionType) {
        let query = [unionType, 'SELECT', this.expressions, 'FROM', '??'].join(' ');

        if (!this.hasWhereCondition)
            return this.queryRes.push(query);


        this.queryRes.push(`${query} ${this.whereSqlKeyword} ??`);
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


        if (this.hasFromObject)
            this.injector.push(this.from);

        //TODO
        // if (this.hasWhereCondition)
        //
        //     for (let key in this.where) {
        //         let value = this.where[key],
        //             arrayOfOperatorAndValue2d = this.conditions,
        //             isFirstIndex = (indexForWhereJsonObject === 0),
        //             isOpDefined = Array.isArray(value) && key === '$let',
        //             arrayOfSpecialQueryUtilitiesOperator = [],
        //             newArrayForOperatorAndValue2d = [],
        //             getAttachOpType = () => {
        //                 try {
        //                     let type = value['$let'];
        //                     if (type)
        //                         return type;
        //                     return 'AND';
        //                 } catch (e) {
        //                 }
        //             },
        //             operator = getOperatorInSpaceString(value),
        //             initPlaceHolder = `${DOUBLE_QUESTION_MARK} ${operator} ${QUESTION_MARK}`;
        //
        //
        //         if (isJsonObjectOfAttachMultiConditions(value) && !isFirstIndex) {
        //             arrayOfEqualAndQuestionMarks.push(getAttachOpType());
        //         }
        //
        //         if (isJsonObjectOfAttachMultiConditions(value)) {
        //             value['data'].forEach(item => {
        //                 valueValidationForWhereJsonObject(key, item, {
        //                     isJsonObjectInWhereCondition: true
        //                 });
        //             });
        //             indexForWhereJsonObject++;
        //         }
        //
        //
        //         if (!isJsonObjectOfAttachMultiConditions(value))
        //             valueValidationForWhereJsonObject(key, value);
        //
        //         if (!isOpDefined)
        //             continue;
        //
        //
        //         arrayOfOperatorAndValue2d.forEach(item2d => {
        //
        //             item2d.forEach((item, index) => {
        //
        //                 let isAndOperator = item === AND;
        //                 let isOrOperator = item === OR;
        //
        //                 if (isAndOperator || isOrOperator) {
        //                     arrayOfSpecialQueryUtilitiesOperator.push(item);
        //                     item2d.splice(index, 1);
        //                 }
        //
        //             });
        //
        //             arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(item2d);
        //             newArrayForOperatorAndValue2d = newArrayForOperatorAndValue2d.concat(item2d);
        //
        //         });
        //         delete where['op'];
        //         let isArrayFor2dHaveOneKeyAndValue = (newArrayForOperatorAndValue2d.length === 2),
        //             isArrayFor2dHaveMoreThanOneKeyAndValue = (newArrayForOperatorAndValue2d.length > 2);
        //
        //
        //         if (isFirstIndex && (isArrayFor2dHaveOneKeyAndValue || isArrayFor2dHaveMoreThanOneKeyAndValue)) {
        //             arrayOfEqualAndQuestionMarks.push(`${operator} ${QUESTION_MARK}`);
        //             indexForWhereJsonObject++;
        //         }
        //
        //
        //         if (isArrayFor2dHaveOneKeyAndValue || isArrayFor2dHaveMoreThanOneKeyAndValue) {
        //
        //             arrayOfSpecialQueryUtilitiesOperator.forEach(item => {
        //
        //                 arrayOfEqualAndQuestionMarks.push(`${item}`);
        //                 arrayOfEqualAndQuestionMarks.push(`${initPlaceHolder}`);
        //
        //             });
        //
        //             indexForWhereJsonObject++;
        //         }
        //
        //
        //     }
        //
        //
        // let isPreviousWordEqualDesc,
        //     isPreviousWordEqualAsc;
        //
        // for (let key in option) {
        //     let value = option[key],
        //         isUsedOrderByWord = key === 'order',
        //         isUsedGroupByWord = key === 'group',
        //         getIndexOneFromOrderBy = value[1],
        //         isArrayIndexZeroFromOrderBy = Array.isArray(value[0]),
        //         isValueOfOrderByWordArray = Array.isArray(value),
        //         isValueOfLimitWordArray = Array.isArray(value),
        //         isUsedAscWord = value === ASC,
        //         isUsedDescWord = value === DESC,
        //         isUsedOffsetWord = key === OFFSET.toLowerCase(),
        //         isUsedLimitWord = key === LIMIT.toLowerCase();
        //
        //
        //     if (isUsedGroupByWord) {
        //         if (Array.isArray(value))
        //             return value.forEach(item => {
        //                 arrayOfEqualAndQuestionMarks.push(item);
        //             });
        //         arrayOfEqualAndQuestionMarks.push(value);
        //     }
        //
        //
        //     if ((isUsedAscWord && isPreviousWordEqualDesc) || (isUsedDescWord && isPreviousWordEqualAsc)) {
        //         arrayOfEqualAndQuestionMarks.push(`${COMMA} ${QUESTION_MARK}`);
        //         arrayOfKeyAndValueDataForQuery.push(key);
        //     }
        //
        //     isPreviousWordEqualDesc = value === DESC;
        //     isPreviousWordEqualAsc = value === ASC;
        //
        //
        //     if (isUsedOrderByWord && !isValueOfOrderByWordArray) {
        //         arrayOfEqualAndQuestionMarks.push(`${ORDER_BY} ${QUESTION_MARK}`);
        //         arrayOfKeyAndValueDataForQuery.push(value);
        //     }
        //
        //
        //     if (isUsedOrderByWord && isValueOfOrderByWordArray && !isArrayIndexZeroFromOrderBy) {
        //         arrayOfEqualAndQuestionMarks.push(`${ORDER_BY} ${getDoubleQuestionMarkAndCommaForOrderBy(value)}`);
        //         arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(value);
        //     }
        //
        //     if (isUsedOrderByWord && isValueOfOrderByWordArray && isArrayIndexZeroFromOrderBy) {
        //         arrayOfEqualAndQuestionMarks.push(`${ORDER_BY} ${getDoubleQuestionMarkAndCommaForOrderBy(value[0])} ${getIndexOneFromOrderBy} ${COMMA} ${QUESTION_MARK}`);
        //         arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(value[0]);
        //     }
        //
        //
        //     if (isUsedAscWord || isUsedDescWord) {
        //         arrayOfEqualAndQuestionMarks.push(`${value}`);
        //         arrayOfKeyAndValueDataForQuery.push(key);
        //     }
        //
        //
        //     if (isUsedLimitWord && isValueOfLimitWordArray) {
        //         arrayOfEqualAndQuestionMarks.push(`${LIMIT} ${QUESTION_MARK} ${COMMA} ${QUESTION_MARK}`);
        //         arrayOfKeyAndValueDataForQuery = arrayOfKeyAndValueDataForQuery.concat(value);
        //     }
        //
        //
        //     if (isUsedLimitWord && !isValueOfLimitWordArray) {
        //         arrayOfEqualAndQuestionMarks.push(`${LIMIT} ${QUESTION_MARK}`);
        //         arrayOfKeyAndValueDataForQuery.push(value);
        //     }
        //
        //
        //     if (isUsedOffsetWord) {
        //         arrayOfEqualAndQuestionMarks.push(`${OFFSET} ${QUESTION_MARK}`);
        //         arrayOfKeyAndValueDataForQuery.push(value);
        //     }
        //
        //
        // }
        //
        //
        // if (hasWhereCondition) {
        //     InitializationIndexWhenExistMultiSqlQuery();
        //     return `${whereKey()} ${DOUBLE_QUESTION_MARK} ` +
        //         `${arrayOfEqualAndQuestionMarks.join(' ').trim()}`;
        // }
        //
        // InitializationIndexWhenExistMultiSqlQuery();
        // return arrayOfEqualAndQuestionMarks.join(' ').trim();

    }

}

module.exports = BaseSQL;