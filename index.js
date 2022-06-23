require('app-module-path').addPath(__dirname);
const {
        query,
        sqlQueryResult
    } = require('src/DatabaseConnection'),
    {
        WHERE,
        QUESTION_MARK,
        IF_NOT_EXISTS,
        DOUBLE_QUESTION_MARK
    } = require('src/util/SqlKeyword'),
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
        generateDoubleQuestionMarkAndComma,
        removeArrayOfDataForUpdateOrDeleteQuery
    } = require('src/util/Utilites'),
    {
        connect
    } = require('src/DatabaseConnection'),
    DataType = require('src/util/DataType'),
    SqlKeyword = require('src/util/SqlKeyword'),
    FieldUtilities = require('src/util/FieldUtilities'),
    util = require('src/util/Utilites');


let realSql,
    useDatabase = '',
    databaseName = '';


module.exports = {


    fieldUtilities: FieldUtilities,

    dataType: DataType,

    sqlKeyword: SqlKeyword,


    connect(object) {
        connect(object);
        return this;
    },


    createDatabase(name) {
        databaseName = name;
        useDatabase = `USE ${databaseName};`;
        query(`CREATE DATABASE IF NOT EXISTS ${name}`
            + ` CHARACTER SET utf8 COLLATE utf8_unicode_ci`,
            null);
        return this;
    },


    createTable(jsonArray) {

        getCreateTableSqlQuery(jsonArray);

        realSql = useDatabase +
            ` CREATE TABLE ${IF_NOT_EXISTS} ` + '`' + jsonArray.table + '`' +
            `(${util.sqlQuery})`;

        query(realSql, null);

        removeSqlQuery();

        return this;
    },


    dropTable(data) {

        generateValueWithComma(data);

        realSql = useDatabase + 'Drop Table IF EXISTS ' + util.stringOfValueWithComma;

        query(realSql, {});

        removeStringOfValueWithComma();

        return this;
    },


    addForeignKey(jsonObject) {

        realSql = useDatabase + ' ALTER TABLE ' + '`' + jsonObject.table + '`' +
            ` ADD FOREIGN KEY (` + '`' + jsonObject.foreignKey + '`' + `) ` +
            `REFERENCES ` + '`' + jsonObject.referenceTable + '`' +
            `(` + '`' + jsonObject.field + '`' + `) ON DELETE ` +
            `${jsonObject.onDelete} ON UPDATE ${jsonObject.onUpdate}`;

        query(realSql, null);

        return this;
    },


    remove(jsonObject) {

        generateDeleteSqlQueryWithData(jsonObject);

        realSql = useDatabase + 'DELETE FROM ' + DOUBLE_QUESTION_MARK + ' WHERE ' +
            DOUBLE_QUESTION_MARK + util.sqlQuery;

        query(realSql, util.arrayOfDataForUpdateOrDeleteQuery);

        removeSqlQuery();
        removeStringOfDataForForSet();
        removeArrayOfDataForUpdateOrDeleteQuery();

        return this;
    },


    update(jsonObject) {

        generateUpdateSqlQueryWithData(jsonObject);

        realSql = useDatabase + ' UPDATE ' + DOUBLE_QUESTION_MARK +
            `SET ${util.stringOfDataForForSet} ${WHERE} ${DOUBLE_QUESTION_MARK} ` + util.sqlQuery;

        query(realSql, util.arrayOfDataForUpdateOrDeleteQuery);

        removeSqlQuery();
        removeStringOfDataForForSet();
        removeArrayOfDataForUpdateOrDeleteQuery();

        return this;
    },


    addMultiValue(jsonArray) {

        realSql = useDatabase + ' INSERT INTO ' + jsonArray.table + ' (' +
            generateDoubleQuestionMarkAndComma(jsonArray.data) + ') VALUES ' + QUESTION_MARK;

        query(realSql, util.dataForInsertSqlQuery);

        removeDataForInsertSqlQuery();

        return this;
    },


    addOne(jsonArray) {

        realSql = useDatabase + ' INSERT INTO ' + jsonArray.table + ' SET ' + QUESTION_MARK;

        query(realSql, jsonArray.data);

        return this;

    },


    addWithFind(jsonArray) {

        getOptionKeywordSqlQuery(jsonArray);

        let selectSqlQuery = ' SELECT ' + DOUBLE_QUESTION_MARK +
            ' FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        realSql = useDatabase + ' INSERT INTO ' + jsonArray.table +
            ` (${getStringOfColumnWithComma(jsonArray.data[0])}) ` + selectSqlQuery;

        query(realSql, jsonArray.data);

        removeSqlQuery();

        return this;
    },


    customQuery(sqlQuery) {

        realSql = useDatabase + ` ${sqlQuery}`;

        query(realSql, null);

        return this;
    },


    find(jsonArray) {

        getOptionKeywordSqlQuery(jsonArray);

        removeFieldDataInSelect(jsonArray);

        realSql = useDatabase + ' SELECT ' + getData() +
            ' FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        query(realSql, jsonArray.data);

        removeSqlQuery();

        return this;
    },


    findTable(tableName) {

        realSql = 'SELECT TABLE_NAME ' +
            'FROM INFORMATION_SCHEMA.TABLES ' +
            'WHERE TABLE_NAME = ' + "'" + tableName + "' " +
            'and TABLE_SCHEMA = ' + "'" + databaseName + "'";

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