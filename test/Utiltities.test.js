const {
        getCreateTableSqlQuery
    } = require('../src/util/Utilites'),
    {
        AUTO_INCREMENT
    } = require('../src/util/KeywordHelper'),
    util = require('../src/util/Utilites'),
    {
        INT
    } = require('../src/util/DataType');
const {NOT_NULL} = require("../src/util/QueryHelper");


describe('getCreateTableSqlQuery', () => {

    it('should be return string equal to ', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT');
    });

});