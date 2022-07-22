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
        getIdentifier,
        removeSqlQuery,
        validateIdentifiers,
        generateValueWithComma,
        getCreateTableSqlQuery,
        getFindSqlQuery,
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
    VariableDataType = require('./src/util/VariableDataType'),
    QueryHelper = require('./src/util/QueryHelper'),
    util = require('./src/util/Utilites');


let realSql,
    connectJsonObject,
    userInputDatabaseName,
    databaseName = '';

function getUseDatabaseName() {
    return (connectJsonObject['database'] !== undefined) ?
        '' : 'USE ' + databaseName + '; ';
}

function getDatabaseName() {
    return (userInputDatabaseName !== undefined) ?
        userInputDatabaseName : databaseName;
}

module.exports = {


    fieldHelper: FieldHelper,

    dataType: DataType,

    keywordHelper: KeywordHelper,

    variableDataType: VariableDataType,

    queryHelper: QueryHelper,


    connect(jsonObject) {
        connectJsonObject = jsonObject;
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

        realSql = getUseDatabaseName() +
            ` CREATE TABLE ${IF_NOT_EXISTS} ` + '`' + jsonObject.table + '`' +
            `(${util.sqlQuery})`;

        query(realSql, null);

        removeSqlQuery();

        return this;
    },


    dropTable(data) {

        generateValueWithComma(data);

        realSql = getUseDatabaseName() + 'DROP TABLE IF EXISTS ' + util.stringOfValueWithComma;

        query(realSql, null);

        removeStringOfValueWithComma();

        return this;
    },


    addForeignKey(jsonObject) {

        realSql = getUseDatabaseName() + ' ALTER TABLE ' + '`' + jsonObject.table + '`' +
            ` ADD FOREIGN KEY (` + '`' + jsonObject.foreignKey + '`' + `) ` +
            `REFERENCES ` + '`' + jsonObject.referenceTable + '`' +
            `(` + '`' + jsonObject.field + '`' + `) ON DELETE ` +
            `${jsonObject.onDelete} ON UPDATE ${jsonObject.onUpdate}`;

        query(realSql, null);

        return this;
    },


    remove(jsonObject) {

        generateDeleteSqlQueryWithData(jsonObject);

        realSql = getUseDatabaseName() + ' DELETE FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        query(realSql, util.arrayOfDataForUpdateOrDeleteQuery);

        removeSqlQuery();
        removeStringOfDataForForSet();
        removeArrayOfDataForUpdateOrDeleteQuery();

        return this;
    },


    update(jsonObject) {

        generateUpdateSqlQueryWithData(jsonObject);

        realSql = getUseDatabaseName() + ' UPDATE ' + DOUBLE_QUESTION_MARK +
            `SET ${util.stringOfDataForForSet} ` + util.sqlQuery;

        query(realSql, util.arrayOfDataForUpdateOrDeleteQuery);

        removeSqlQuery();
        removeStringOfDataForForSet();
        removeArrayOfDataForUpdateOrDeleteQuery();

        return this;
    },


    addMultiValue(jsonObject) {

        realSql = getUseDatabaseName() + ' INSERT INTO ' + jsonObject.table + ' (' +
            getGeneratedColumns(jsonObject) + ') VALUES ' + QUESTION_MARK;

        query(realSql, util.dataForInsertSqlQuery);

        removeDataForInsertSqlQuery();

        return this;
    },


    addOne(jsonObject) {

        realSql = getUseDatabaseName() + ' INSERT INTO ' + jsonObject.table + ' SET ' + QUESTION_MARK;

        query(realSql, jsonObject.data);

        return this;
    },


    addWithFind(jsonObject) {

        getFindSqlQuery(jsonObject);

        validateIdentifiers((jsonObject.optKey !== undefined) ? jsonObject.optKey[0] : null);

        let selectSqlQuery = ' SELECT ' + getIdentifier() +
            ' FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        realSql = getUseDatabaseName() + ' INSERT INTO ' + jsonObject.table +
            ` (${getStringOfColumnWithComma(jsonObject.data[0])}) ` + selectSqlQuery;

        query(realSql, jsonObject.data);

        removeSqlQuery();

        return this;
    },


    customQuery(sqlQuery) {

        realSql = getUseDatabaseName() + ` ${sqlQuery}`;

        query(realSql, null);

        return this;
    },


    dropDatabase(databaseName) {
        if (databaseName !== undefined)
            userInputDatabaseName = databaseName;

        query("DROP DATABASE " + "`" + getDatabaseName() + "`", null);

        return this;
    },


    find(jsonObject) {

        getFindSqlQuery(jsonObject);

        validateIdentifiers((jsonObject.optKey !== undefined) ? jsonObject.optKey[0] : null);

        realSql = getUseDatabaseName() + ' SELECT ' + getIdentifier() +
            ' FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        query(realSql, jsonObject.data);

        removeSqlQuery();

        return this;
    },


    findTable(tableName, databaseName) {
        if (databaseName !== undefined)
            userInputDatabaseName = databaseName;

        realSql = 'SELECT TABLE_NAME ' +
            'FROM INFORMATION_SCHEMA.TABLES ' +
            'WHERE TABLE_NAME = ' + "'" + tableName + "' " +
            'AND TABLE_SCHEMA = ' + "'" + getDatabaseName() + "'";

        query(realSql, null);

        return this;
    },


    result(callBackResult) {
        if (typeof callBackResult === 'function')
            sqlQueryResult(result => {
                callBackResult(result);
            });
    },


    getSqlQuery() {
        return realSql;
    }

}