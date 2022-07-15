const {
        getIdentifier,
        removeSqlQuery,
        getGeneratedColumns,
        getCreateTableSqlQuery,
        generateValueWithComma,
        validateIdentifiers,
        getOptionKeywordSqlQuery,
        getStringOfColumnWithComma,
        removeDataForInsertSqlQuery,
        removeStringOfDataForForSet,
        removeStringOfValueWithComma,
        generateUpdateSqlQueryWithData,
        removeArrayOfDataForUpdateOrDeleteQuery
    } = require('../src/util/Utilites'),
    {
        AUTO_INCREMENT
    } = require('../src/util/KeywordHelper'),
    util = require('../src/util/Utilites'),
    keyHelper = require('../src/util/KeywordHelper'),
    variableDataType = require('../src/util/VariableDataType'),
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
        AS,
        AND,
        LIKE,
        CAST,
        COUNT,
        ORDER,
        SOURCE,
        BETWEEN,
        NOT_NULL,
        LESS_THAN,
        setOperator,
        IS_NOT_NULL
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

    it('should be return string equal to WHERE ?? = ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: 12,
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: setOperator(LESS_THAN, 15),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: setOperator(LESS_THAN, 15, keyHelper.OR),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: setOperator(LESS_THAN, 15),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? = ? AND ?? < ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: setOperator(LESS_THAN, 15),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? = ? OR ?? < ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: setOperator(LESS_THAN, 15, keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? OR ?? < ?');
    });

    it('should be return string equal to WHERE ?? = ? AND ?? IN (?)', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: IN([0, 15]),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? AND ?? IN (?)');
    });

    it('should be return string equal to WHERE ?? IN (?) AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: IN([0, 15]),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? IN (?) AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? IN (?) AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: IN([0, 15], keyHelper.OR),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? IN (?) AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? = ? OR ?? IN (?)', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: IN([0, 15], keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? OR ?? IN (?)');
    });

    it('should be return string equal to WHERE ?? = ? OR ?? BETWEEN ? AND ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: BETWEEN(0, 15, keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? OR ?? BETWEEN ? AND ?');
    });

    it('should be return string equal to WHERE ?? = ? AND ?? BETWEEN ? AND ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: BETWEEN(0, 15),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? AND ?? BETWEEN ? AND ?');
    });

    it('should be return string equal to WHERE ?? BETWEEN ? AND ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: BETWEEN(0, 15),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? BETWEEN ? AND ? AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? BETWEEN ? AND ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: BETWEEN(0, 15, keyHelper.OR),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? BETWEEN ? AND ? AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? LIKE ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: LIKE(0, keyHelper.OR),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? LIKE ? AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? LIKE ? AND ?? = ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                id: LIKE(50),
                username: 'root',
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? LIKE ? AND ?? = ?');
    });

    it('should be return string equal to WHERE ?? = ? AND ?? LIKE ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: LIKE(50),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? AND ?? LIKE ?');
    });

    it('should be return string equal to WHERE ?? = ? OR ?? LIKE ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: LIKE(50, keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? OR ?? LIKE ?');
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

    it('should be return string equal to WHERE ?? = ? ORDER BY ?', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                order: 'id'
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? ORDER BY ?');
    });

    it('should be return string equal to WHERE ?? = ? ORDER BY ? , ?', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                order: ['id', 'name']
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? ORDER BY ? , ?');
    });

    it('should be return string equal to WHERE ?? = ? LIMIT ?', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                limit: 10
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? LIMIT ?');
    });

    it('should be return string equal to WHERE ?? = ? LIMIT ? , ?', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                limit: [10, 50]
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? LIMIT ? , ?');
    });

    it('should be return string equal to WHERE ?? = ? OFFSET ?', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                offset: 0
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? OFFSET ?');
    });

    it('should be return string equal to WHERE ?? = ? ORDER BY ? DESC', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                order: 'id',
                name: keyHelper.DESC
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? ORDER BY ? DESC');
    });

    it('should be return string equal to WHERE ?? = ? ORDER BY ? ASC', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                order: 'id',
                name: keyHelper.ASC
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? ORDER BY ? ASC');
    });

    it('should be return string equal to WHERE ?? = ? ORDER BY ? ASC LIMIT ?', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                order: 'id',
                name: keyHelper.ASC,
                limit: 10
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? ORDER BY ? ASC LIMIT ?');
    });

    it('should be return string equal to WHERE ?? = ? ORDER BY ? ASC LIMIT ? OFFSET ?', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                order: 'id',
                name: keyHelper.ASC,
                limit: 10,
                offset: 5
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? ORDER BY ? ASC LIMIT ? OFFSET ?');
    });


    it('should be return string equal to WHERE ?? = ? ORDER BY ? ASC , ? DESC', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                order: 'id',
                name: keyHelper.ASC,
                id: keyHelper.DESC
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? ORDER BY ? ASC , ? DESC');
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


describe('getStringOfColumnWithComma', () => {

    it('should be return string equal to username,status', async () => {
        expect(getStringOfColumnWithComma(['username', 'status'])).toBe('username,status');
    });

});


describe('getOptionKeywordSqlQuery', () => {

    it('should be return empty string', async () => {
        getOptionKeywordSqlQuery({
            where: true
        });
        expect(util.sqlQuery).toBe('');
    });

    it('should be return string equal to WHERE ?? < ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ?');
    });

    it('should be return string equal to WHERE ?? BETWEEN ? AND ? AND ?? < ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                keyHelper.BETWEEN,
                keyHelper.AND,
                LESS_THAN
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? BETWEEN ? AND ? AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? BETWEEN ? AND ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.AND,
                keyHelper.BETWEEN
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? BETWEEN ? AND ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? IN (?)', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.AND,
                keyHelper.IN
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? IN (?)');
    });

    it('should be return string equal to WHERE ?? IN (?) AND ?? < ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                keyHelper.IN,
                keyHelper.AND,
                LESS_THAN
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? IN (?) AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? LIKE ? AND ?? < ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                keyHelper.LIKE,
                keyHelper.AND,
                LESS_THAN
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? LIKE ? AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? LIKE ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.AND,
                keyHelper.LIKE
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? LIKE ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? IS NOT NULL', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.AND,
                IS_NOT_NULL
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? IS NOT NULL');
    });

    it('should be return string equal to WHERE ?? IS NOT NULL AND ?? < ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                IS_NOT_NULL,
                keyHelper.AND,
                LESS_THAN
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? IS NOT NULL AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? LIKE ? AND ?? IN (?)', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.AND,
                keyHelper.LIKE,
                keyHelper.AND,
                keyHelper.IN
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? LIKE ? AND ?? IN (?)');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.ORDER_BY
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ?');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ? DESC', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.ORDER_BY,
                keyHelper.DESC
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ? DESC');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ? DESC LIMIT ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.ORDER_BY,
                keyHelper.DESC,
                keyHelper.LIMIT
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ? DESC LIMIT ?');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ? DESC , ? ASC LIMIT ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.ORDER_BY,
                keyHelper.DESC,
                keyHelper.ASC,
                keyHelper.LIMIT
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ? DESC , ? ASC LIMIT ?');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ? DESC , ? ASC', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.ORDER_BY,
                keyHelper.DESC,
                keyHelper.ASC
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ? DESC , ? ASC');
    });

    it('should be return string equal to WHERE ?? < ? LIMIT ? OFFSET ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            optKey: [
                LESS_THAN,
                keyHelper.LIMIT,
                keyHelper.OFFSET
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? LIMIT ? OFFSET ?');
    });

    it('should be return string equal to WHERE ?? < ? LIMIT ? , ? OFFSET ?', async () => {
        getOptionKeywordSqlQuery({
            where: true,
            limit: true,
            optKey: [
                LESS_THAN,
                keyHelper.LIMIT,
                keyHelper.OFFSET
            ]
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? LIMIT ? , ? OFFSET ?');
    });

    it('should be return string equal to LIMIT ? , ? OFFSET ?', async () => {
        getOptionKeywordSqlQuery({
            limit: true,
            optKey: [
                keyHelper.LIMIT,
                keyHelper.OFFSET
            ]
        });
        expect(util.sqlQuery).toBe('LIMIT ? , ? OFFSET ?');
    });

    it('should be return string equal to LIMIT ? , ?', async () => {
        getOptionKeywordSqlQuery({
            limit: true,
            optKey: [
                keyHelper.LIMIT
            ]
        });
        expect(util.sqlQuery).toBe('LIMIT ? , ?');
    });

    it('should be return string equal to ORDER BY ? , ?', async () => {
        getOptionKeywordSqlQuery({
            limit: true,
            optKey: [
                ORDER(['id', 'name'])
            ]
        });
        expect(util.sqlQuery).toBe('ORDER BY ? , ?');
    });

    it('should be return string equal to ORDER BY ? , ? LIMIT ?', async () => {
        getOptionKeywordSqlQuery({
            optKey: [
                ORDER(['id', 'name']),
                keyHelper.LIMIT
            ]
        });
        expect(util.sqlQuery).toBe('ORDER BY ? , ? LIMIT ?');
    });

    it('should be return string equal to UNION SELECT ?? FROM ??', async () => {
        getOptionKeywordSqlQuery({
            optKey: [
                keyHelper.UNION
            ]
        });
        expect(util.sqlQuery).toBe('UNION SELECT ?? FROM ??');
    });

    it('should be return string equal to UNION SELECT ?? FROM ??', async () => {
        getOptionKeywordSqlQuery({
            optKey: [
                keyHelper.STAR, keyHelper.UNION
            ]
        });
        expect(util.sqlQuery).toBe('UNION SELECT ?? FROM ??');
    });

    it('should be return string equal to UNION SELECT ?? FROM ??', async () => {
        getOptionKeywordSqlQuery({
            optKey: [
                keyHelper.STAR, keyHelper.UNION, keyHelper.STAR
            ]
        });
        expect(util.sqlQuery).toBe('UNION SELECT * FROM ??');
    });


});


describe('removeFieldDataInSelect', () => {

    it('should be return * char', async () => {
        validateIdentifiers(
            keyHelper.STAR
        );
        expect(getIdentifier()).toBe('*');
    });

    it('should be return string equal to COUNT(*) AS size', async () => {
        validateIdentifiers(
            COUNT()
        );
        expect(getIdentifier()).toBe('COUNT(*) AS size');
    });

    it('should be return string equal to i AS id', async () => {
        validateIdentifiers(
            AS('i', 'id')
        );
        expect(getIdentifier()).toBe('i AS id');
    });

    it('should be return string equal to i AS id , n AS name', async () => {
        validateIdentifiers(
            [AS('i', 'id'), AS('n', 'name')]
        );
        expect(getIdentifier()).toBe('i AS id , n AS name');
    });

    it('should be return string equal to i AS id , name AS SOURCE', async () => {
        validateIdentifiers(
            [AS('i', 'id'), SOURCE('name')]
        );
        expect(getIdentifier()).toBe('i AS id , name AS SOURCE');
    });

    it('should be return string equal to name AS SOURCE', async () => {
        validateIdentifiers(
             SOURCE('name')
        );
        expect(getIdentifier()).toBe('name AS SOURCE');
    });

    it("should be return string equal to CAST('group' AS varchar)", async () => {
        validateIdentifiers(
            CAST('group', variableDataType.varchar)
        );
        expect(getIdentifier()).toBe("CAST('group' AS varchar)");
    });

    it("should be return string equal to CAST(13 AS int)", async () => {
        validateIdentifiers(
            CAST(13, variableDataType.int)
        );
        expect(getIdentifier()).toBe("CAST(13 AS int)");
    });

    it('should be return string equal to X(location) AS Lat , Y(location) AS Lon', async () => {
        validateIdentifiers(
            'X(location) AS Lat , Y(location) AS Lon'
        );
        expect(getIdentifier()).toBe('X(location) AS Lat , Y(location) AS Lon');
    });

    it('should be return string equal to ??', async () => {
        validateIdentifiers({
            optKey: [
                'users'
            ]
        });
        expect(getIdentifier()).toBe('??');
    });

});