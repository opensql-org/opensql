const {
        query,
        sqlQueryResult
    } = require('./src/DatabaseConnection'),
    {
        QUESTION_MARK,
        IF_NOT_EXISTS,
        DOUBLE_QUESTION_MARK
    } = require('./src/util/KeywordHelper'),
    {
        getData,
        removeSqlQuery,
        removeFieldDataInSelect,
        generateValueWithComma,
        getCreateTableSqlQuery,
        getOptionKeywordSqlQuery,
        getStringOfColumnWithComma,
        removeStringOfDataForForSet,
        removeDataForInsertSqlQuery,
        removeStringOfValueWithComma,
        generateDeleteSqlQueryWithData,
        generateUpdateSqlQueryWithData,
        getGeneratedColumns,
        removeArrayOfDataForUpdateOrDeleteQuery
    } = require('./src/util/Utilites'),
    {
        connect
    } = require('./src/DatabaseConnection'),
    DataType = require('./src/util/DataType'),
    KeywordHelper = require('./src/util/KeywordHelper'),
    FieldHelper = require('./src/util/FieldHelper'),
    QueryHelper = require('./src/util/QueryHelper'),
    util = require('./src/util/Utilites');


let realSql,
    databaseName = '';

const POINTER_FOR_USE_DB = 'USE_DB_?';

module.exports = {


    fieldHelper: FieldHelper,

    dataType: DataType,

    keywordHelper: KeywordHelper,

    queryHelper: QueryHelper,


    connect(jsonObject) {
        connect(jsonObject);
        return this;
    },


    createDatabase(name) {
        databaseName = name;
        query(`CREATE DATABASE IF NOT EXISTS ${name}`
            + ` CHARACTER SET utf8 COLLATE utf8_unicode_ci`,
            null);
        return this;
    },


    createTable(jsonObject) {

        getCreateTableSqlQuery(jsonObject);

        realSql = POINTER_FOR_USE_DB +
            ` CREATE TABLE ${IF_NOT_EXISTS} ` + '`' + jsonObject.table + '`' +
            `(${util.sqlQuery})`;

        query(realSql, null);

        removeSqlQuery();

        return this;
    },


    dropTable(data) {

        generateValueWithComma(data);

        realSql = POINTER_FOR_USE_DB + 'DROP TABLE IF EXISTS ' + util.stringOfValueWithComma;

        query(realSql, null);

        removeStringOfValueWithComma();

        return this;
    },


    addForeignKey(jsonObject) {

        realSql = POINTER_FOR_USE_DB + ' ALTER TABLE ' + '`' + jsonObject.table + '`' +
            ` ADD FOREIGN KEY (` + '`' + jsonObject.foreignKey + '`' + `) ` +
            `REFERENCES ` + '`' + jsonObject.referenceTable + '`' +
            `(` + '`' + jsonObject.field + '`' + `) ON DELETE ` +
            `${jsonObject.onDelete} ON UPDATE ${jsonObject.onUpdate}`;

        query(realSql, null);

        return this;
    },


    remove(jsonObject) {

        generateDeleteSqlQueryWithData(jsonObject);

        realSql = POINTER_FOR_USE_DB + ' DELETE FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        query(realSql, util.arrayOfDataForUpdateOrDeleteQuery);

        removeSqlQuery();
        removeStringOfDataForForSet();
        removeArrayOfDataForUpdateOrDeleteQuery();

        return this;
    },


    update(jsonObject) {

        generateUpdateSqlQueryWithData(jsonObject);

        realSql = POINTER_FOR_USE_DB + ' UPDATE ' + DOUBLE_QUESTION_MARK +
            `SET ${util.stringOfDataForForSet} ` + util.sqlQuery;

        query(realSql, util.arrayOfDataForUpdateOrDeleteQuery);

        removeSqlQuery();
        removeStringOfDataForForSet();
        removeArrayOfDataForUpdateOrDeleteQuery();

        return this;
    },


    addMultiValue(jsonObject) {

        realSql = POINTER_FOR_USE_DB + ' INSERT INTO ' + jsonObject.table + ' (' +
            getGeneratedColumns(jsonObject) + ') VALUES ' + QUESTION_MARK;

        query(realSql, util.dataForInsertSqlQuery);

        removeDataForInsertSqlQuery();

        return this;
    },


    addOne(jsonObject) {

        realSql = POINTER_FOR_USE_DB + ' INSERT INTO ' + jsonObject.table + ' SET ' + QUESTION_MARK;

        query(realSql, jsonObject.data);

        return this;
    },


    addWithFind(jsonObject) {

        getOptionKeywordSqlQuery(jsonObject);

        let selectSqlQuery = ' SELECT ' + DOUBLE_QUESTION_MARK +
            ' FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        realSql = POINTER_FOR_USE_DB + ' INSERT INTO ' + jsonObject.table +
            ` (${getStringOfColumnWithComma(jsonObject.data[0])}) ` + selectSqlQuery;

        query(realSql, jsonObject.data);

        removeSqlQuery();

        return this;
    },


    customQuery(sqlQuery) {

        realSql = POINTER_FOR_USE_DB + ` ${sqlQuery}`;

        query(realSql, null);

        return this;
    },


    find(jsonObject) {

        getOptionKeywordSqlQuery(jsonObject);

        removeFieldDataInSelect(jsonObject);

        realSql = POINTER_FOR_USE_DB + ' SELECT ' + getData() +
            ' FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        query(realSql, jsonObject.data);

        removeSqlQuery();

        return this;
    },


    findTable(tableName) {

        realSql = 'SELECT TABLE_NAME ' +
            'FROM INFORMATION_SCHEMA.TABLES ' +
            'WHERE TABLE_NAME = ' + "'" + tableName + "' " +
            'AND TABLE_SCHEMA = ' + "'" + databaseName + "'";

        query(realSql, null);

        return this;
    },


    result(callBackResult) {
        if (typeof callBackResult === 'function')
            sqlQueryResult(result => {
                callBackResult(result);
            });
    }


}