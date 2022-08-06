let {
        QUESTION_MARK,
        IF_NOT_EXISTS,
        DOUBLE_QUESTION_MARK
    } = require('../util/KeywordHelper'),
    {
        getIdentifier,
        getFindSqlQuery,
        validateUnionQuery,
        validateIdentifiers,
        getGeneratedColumns,
        generateValueWithComma,
        getCreateTableSqlQuery,
        getStringOfColumnWithComma,
        generateDeleteSqlQueryWithData,
        generateUpdateSqlQueryWithData
    } = require('../util/Utilites'),
    util = require('../util/Utilites'),
    {
        connect
    } = require('../DatabaseConnection'),
    {
        run
    } = require('../execute/run');


let connectJsonObject,
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


    connect(jsonObject) {
        connectJsonObject = jsonObject;
        connect(jsonObject);
    },


    createDatabase(name) {
        databaseName = name;
        run(`CREATE DATABASE IF NOT EXISTS ${name}`
            + ` CHARACTER SET utf8 COLLATE utf8_unicode_ci`);
    },


    createTable(jsonObject) {
        getCreateTableSqlQuery(jsonObject);

        run(getUseDatabaseName() +
            ` CREATE TABLE ${IF_NOT_EXISTS} ` + '`' + jsonObject.table + '`' +
            `(${util.sqlQuery})`);
    },


    dropTable(data) {
        generateValueWithComma(data);

        run(getUseDatabaseName() + 'DROP TABLE IF EXISTS ' + util.stringOfValueWithComma);
    },


    addForeignKey(jsonObject) {
        run(getUseDatabaseName() + ' ALTER TABLE ' + '`' + jsonObject.table + '`' +
            ` ADD FOREIGN KEY (` + '`' + jsonObject.foreignKey + '`' + `) ` +
            `REFERENCES ` + '`' + jsonObject.referenceTable + '`' +
            `(` + '`' + jsonObject.field + '`' + `) ON DELETE ` +
            `${jsonObject.onDelete} ON UPDATE ${jsonObject.onUpdate}`);
    },


    remove(jsonObject) {
        generateDeleteSqlQueryWithData(jsonObject);

        run(getUseDatabaseName() + ' DELETE FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery, util.arrayOfDataForSqlInjection);
    },


    update(jsonObject) {
        generateUpdateSqlQueryWithData(jsonObject);

        run(getUseDatabaseName() + ' UPDATE ' + DOUBLE_QUESTION_MARK +
            `SET ${util.stringOfDataForForSet} ` + util.sqlQuery
            , util.arrayOfDataForSqlInjection);
    },


    addMultiValue(jsonObject) {
        run(getUseDatabaseName() + ' INSERT INTO ' + jsonObject.table + ' (' +
            getGeneratedColumns(jsonObject) + ') VALUES ' + QUESTION_MARK
            , util.dataForInsertSqlQuery);
    },


    addOne(jsonObject) {
        run(getUseDatabaseName() + ' INSERT INTO ' + jsonObject.table + ' SET ' + QUESTION_MARK, jsonObject.data);
    },


    addWithFind(jsonObject) {
        getFindSqlQuery(jsonObject);

        let selectSqlQuery = ' SELECT ' + getIdentifier() +
            ' FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery;

        run(getUseDatabaseName() + ' INSERT INTO ' + jsonObject.table +
            ` (${getStringOfColumnWithComma(jsonObject.get)}) ` + selectSqlQuery
            , util.arrayOfDataForSqlInjection);
    },


    customQuery(sqlQuery, inject = null) {
        run(getUseDatabaseName() + ` ${sqlQuery}`, inject);
    },


    dropDatabase(databaseName) {
        if (databaseName !== undefined)
            userInputDatabaseName = databaseName;

        run("DROP DATABASE " + "`" + getDatabaseName() + "`", null);
    },


    find(jsonObject) {
        getFindSqlQuery(jsonObject);

        validateUnionQuery((jsonObject.union !== undefined) ? jsonObject.union : null);

        run(getUseDatabaseName() + ' SELECT ' + getIdentifier() +
            ' FROM ' + DOUBLE_QUESTION_MARK + ' ' + util.sqlQuery
            , util.arrayOfDataForSqlInjection);
    },


    findTable(tableName, databaseName) {
        if (databaseName !== undefined)
            userInputDatabaseName = databaseName;

        run('SELECT TABLE_NAME ' +
            'FROM INFORMATION_SCHEMA.TABLES ' +
            'WHERE TABLE_NAME = ' + "'" + tableName + "' " +
            'AND TABLE_SCHEMA = ' + "'" + getDatabaseName() + "'");
    }

}