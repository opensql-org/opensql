let api = require('./src/api/api'),
    DataType = require('./src/util/DataType'),
    KeywordHelper = require('./src/util/KeywordHelper'),
    FieldHelper = require('./src/util/FieldHelper'),
    VariableDataType = require('./src/util/VariableDataType'),
    QueryHelper = require('./src/util/QueryHelper'),
    {
        sqlQueryResult
    } = require('./src/DatabaseConnection');

module.exports = {


    fieldHelper: FieldHelper,

    dataType: DataType,

    keywordHelper: KeywordHelper,

    variableDataType: VariableDataType,

    queryHelper: QueryHelper,


    connect(jsonObject) {

        api.connect(jsonObject);

        return this;
    },


    createDatabase(name) {

        api.createDatabase(name);

        return this;
    },


    createTable(jsonObject) {

        api.createTable(jsonObject);

        return this;
    },


    dropTable(data) {

        api.dropTable(data);

        return this;
    },


    addForeignKey(jsonObject) {

        api.addForeignKey(jsonObject);

        return this;
    },


    remove(jsonObject) {

        api.remove(jsonObject);

        return this;
    },


    update(jsonObject) {

        api.update(jsonObject);

        return this;
    },


    addMultiValue(jsonObject) {

        api.addMultiValue(jsonObject);

        return this;
    },


    addOne(jsonObject) {

        api.addOne(jsonObject);

        return this;
    },


    addWithFind(jsonObject) {

        api.addWithFind(jsonObject);

        return this;
    },


    customQuery(sqlQuery, inject) {

        api.customQuery(sqlQuery, inject);

        return this;
    },


    dropDatabase(databaseName) {

        api.dropDatabase(databaseName);

        return this;
    },


    find(jsonObject) {

        api.find(jsonObject);

        return this;
    },


    findTable(tableName, databaseName) {

        api.findTable(tableName, databaseName);

        return this;
    },


    result(callBackResult) {
        if (typeof callBackResult === 'function')
            sqlQueryResult(result => {
                callBackResult(result);
            });
    }

}