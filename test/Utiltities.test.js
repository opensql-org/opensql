const {
        removeSqlQuery,
        getCreateTableSqlQuery
    } = require('../src/util/Utilites'),
    {
        AUTO_INCREMENT
    } = require('../src/util/KeywordHelper'),
    util = require('../src/util/Utilites'),
    {
        DEFAULT
    } = require('../src/util/FieldHelper'),
    {
        INT,
        SET,
        ENUM,
        DECIMAL,
        VARCHAR
    } = require('../src/util/DataType'),
    {
        NOT_NULL
    } = require('../src/util/QueryHelper');


describe('getCreateTableSqlQuery', () => {

    it('should be return string equal to id int AUTO_INCREMENT', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT');
    });

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL');
    });

    it('should be return string equal to id int DEFAULT \'Low\'', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([DEFAULT('$Low')])
            }
        });
        expect(util.sqlQuery).toBe("id int DEFAULT 'Low'");
    });

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name varchar', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: VARCHAR()
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name varchar');
    });

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name varchar(10)', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: VARCHAR(10)
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name varchar(10)');
    });


    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name varchar(10) NOT NULL', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: VARCHAR([10, NOT_NULL])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name varchar(10) NOT NULL');
    });

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name enum(\'Love\', \'High\')', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: ENUM(['Love', 'High'])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name enum(\'Love\', \'High\')');
    });

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name set(\'Love\', \'High\')', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: SET(['Love', 'High'])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name set(\'Love\', \'High\')');
    });

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name set(\'Love\', \'High\') NOT NULL', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: SET([NOT_NULL, 'Love', 'High'])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name set(\'Love\', \'High\') NOT NULL');
    });

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name decimal(9,5) NOT NULL', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: DECIMAL([NOT_NULL, 9, 5])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name decimal(9,5) NOT NULL');
    });

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name decimal(9,5)', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: DECIMAL([9, 5])
            }
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name decimal(9,5)');
    });

    it('should be return null', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: DECIMAL([9, 5])
            }
        });
        removeSqlQuery();
        expect(util.sqlQuery).toBe('');
    });

});