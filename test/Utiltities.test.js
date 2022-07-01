const {
        removeSqlQuery,
        getCreateTableSqlQuery,
        generateValueWithComma,
        removeDataForInsertSqlQuery,
        removeStringOfDataForForSet,
        removeStringOfValueWithComma,
        generateUpdateSqlQueryWithData,
        getGeneratedColumns,
        removeArrayOfDataForUpdateOrDeleteQuery
    } = require('../src/util/Utilites'),
    {
        AUTO_INCREMENT
    } = require('../src/util/KeywordHelper'),
    util = require('../src/util/Utilites'),
    keyHelper = require('../src/util/KeywordHelper'),
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
        OR,
        IN,
        AND,
        LIKE,
        BETWEEN,
        NOT_NULL,
        LESS_THAN,
        setOperator
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

    it('should be return string equal to id int AUTO_INCREMENT NOT NULL, name decimal(9,5) , PRIMARY KEY (id)', async () => {
        getCreateTableSqlQuery({
            field: {
                id: INT([AUTO_INCREMENT, NOT_NULL]),
                name: DECIMAL([9, 5])
            },
            primaryKey: 'id'
        });
        expect(util.sqlQuery).toBe('id int AUTO_INCREMENT NOT NULL, name decimal(9,5) , PRIMARY KEY (id)');
    });

    it('should be return empty string', async () => {
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


describe('generateValueWithComma', () => {

    it('should be return string equal to users', async () => {
        generateValueWithComma('users');
        expect(util.stringOfValueWithComma).toBe('users');
    });

    it('should be return empty string', async () => {
        generateValueWithComma('users');
        removeStringOfValueWithComma();
        expect(util.stringOfValueWithComma).toBe('');
    });

    it('should be return string equal to book , users', async () => {
        generateValueWithComma(['book', 'users']);
        expect(util.stringOfValueWithComma).toBe('book , users');
    });

});


describe('generateUpdateSqlQueryWithData', () => {

    it('should be return string equal to ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            edit: {
                status: 1
            }
        });
        expect(util.stringOfDataForForSet).toBe('?? = ?');
    });

    it('should be return string equal to ?? = ? , ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            edit: {
                status: 1,
                username: 'treegex'
            }
        });
        expect(util.stringOfDataForForSet).toBe('?? = ? , ?? = ?');
    });

    it("should be return array equal to ['users', 'status','1']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            edit: {
                status: 1
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'status', '1']
        );
    });

    it("should be return array equal to ['users', 'status','1', 'username', 'treegex']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            edit: {
                status: 1,
                username: 'treegex'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'status', '1', 'username', 'treegex']
        );
    });

    it("should be return array equal to ['users', 'id', 12]", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: 12
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', 12]
        );
    });

    it("should be return array equal to ['users', 'id', 12, 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: 12,
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', 12, 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', '12', 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: setOperator(LESS_THAN, 12),
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', '12', 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', '12', 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: setOperator(LESS_THAN, 12, keyHelper.AND),
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', '12', 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', ['10', '15'], 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: IN([10, 15]),
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', ['10', '15'], 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', ['10', '15'], 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: IN([10, 15], keyHelper.OR),
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', ['10', '15'], 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', '10', '15', 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: BETWEEN(10, 15),
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', '10', '15', 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', '10', '15', 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: BETWEEN(10, 15, keyHelper.OR),
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', '10', '15', 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', '10', 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: LIKE(10),
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', '10', 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', '10', 'username', 'root']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: LIKE(10, keyHelper.OR),
                username: 'root'
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', '10', 'username', 'root']
        );
    });

    it("should be return array equal to ['users', 'id', '10', 'username', 'root', 'id', '1', 'status', 'true']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                id: LIKE(10, keyHelper.OR),
                username: 'root',
                op: [
                    OR({
                        id: 1
                    }, AND({
                        status: true
                    }))
                ]
            }
        });
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual(
            ['users', 'id', '10', 'username', 'root', 'id', '1', 'status', 'true']
        );
    });

    it('should be return string equal to = ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: 12,
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('= ? AND ?? = ?');
    });

    it('should be return string equal to < ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: setOperator(LESS_THAN, 15),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('< ? AND ?? = ?');
    });

    it('should be return string equal to < ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: setOperator(LESS_THAN, 15, keyHelper.OR),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('< ? AND ?? = ?');
    });

    it('should be return string equal to < ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: setOperator(LESS_THAN, 15),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('< ? AND ?? = ?');
    });

    it('should be return string equal to = ? AND ?? < ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: setOperator(LESS_THAN, 15),
            }
        });
        expect(util.sqlQuery).toBe('= ? AND ?? < ?');
    });

    it('should be return string equal to = ? OR ?? < ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: setOperator(LESS_THAN, 15, keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('= ? OR ?? < ?');
    });

    it('should be return string equal to = ? AND ?? IN (?)', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: IN([0, 15]),
            }
        });
        expect(util.sqlQuery).toBe('= ? AND ?? IN (?)');
    });

    it('should be return string equal to IN (?) AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: IN([0, 15]),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('IN (?) AND ?? = ?');
    });

    it('should be return string equal to IN (?) AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: IN([0, 15], keyHelper.OR),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('IN (?) AND ?? = ?');
    });

    it('should be return string equal to = ? OR ?? IN (?)', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: IN([0, 15], keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('= ? OR ?? IN (?)');
    });

    it('should be return string equal to = ? OR ?? BETWEEN ? AND ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: BETWEEN(0, 15, keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('= ? OR ?? BETWEEN ? AND ?');
    });

    it('should be return string equal to = ? AND ?? BETWEEN ? AND ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: BETWEEN(0, 15),
            }
        });
        expect(util.sqlQuery).toBe('= ? AND ?? BETWEEN ? AND ?');
    });

    it('should be return string equal to BETWEEN ? AND ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: BETWEEN(0, 15),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('BETWEEN ? AND ? AND ?? = ?');
    });

    it('should be return string equal to BETWEEN ? AND ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: BETWEEN(0, 15, keyHelper.OR),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('BETWEEN ? AND ? AND ?? = ?');
    });

    it('should be return string equal to LIKE ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: LIKE(0, keyHelper.OR),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('LIKE ? AND ?? = ?');
    });

    it('should be return string equal to LIKE ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: LIKE(50),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('LIKE ? AND ?? = ?');
    });

    it('should be return string equal to = ? AND ?? LIKE ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: LIKE(50),
            }
        });
        expect(util.sqlQuery).toBe('= ? AND ?? LIKE ?');
    });

    it('should be return string equal to = ? OR ?? LIKE ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: LIKE(50, keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('= ? OR ?? LIKE ?');
    });

    it('should be return empty string', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: LIKE(50, keyHelper.OR),
            }
        });
        removeSqlQuery();
        expect(util.sqlQuery).toBe('');
    });

    it('should be return empty string', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: LIKE(50, keyHelper.OR),
            }
        });
        removeStringOfDataForForSet();
        expect(util.stringOfDataForForSet).toBe('');
    });

    it('should be return empty array', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: LIKE(50, keyHelper.OR),
            }
        });
        removeArrayOfDataForUpdateOrDeleteQuery();
        expect(util.arrayOfDataForUpdateOrDeleteQuery).toEqual([]);
    });

});


describe('generateDoubleQuestionMarkAndComma', () => {

    it("should be return array of arrays wrapped in an array", async () => {
        getGeneratedColumns({
            data: [
                'clean code', 'Robert C Martin',
                'javascript ES6', 'Mozilla',
                'object oriented programing software engineer', 'Ivar Jacobson'
            ],
            column: ['name', 'author']
        });
        expect(util.dataForInsertSqlQuery).toEqual([
            [
                ['clean code',
                    'Robert C Martin'],
                ['javascript ES6',
                    'Mozilla'],
                ['object oriented programing software engineer',
                    'Ivar Jacobson']
            ]
        ]);
    });

    it('should be return empty array', async () => {
        getGeneratedColumns({
            data: [
                'clean code', 'Robert C Martin',
                'object oriented programing software engineer', 'Ivar Jacobson'
            ],
            column: ['name', 'author']
        });
        removeDataForInsertSqlQuery();
        expect(util.dataForInsertSqlQuery).toEqual([]);
    });

});