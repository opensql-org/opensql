const {
        getIdentifier,
        getFindSqlQuery,
        setNullValueInRam,
        getGeneratedColumns,
        validateIdentifiers,
        getCreateTableSqlQuery,
        generateValueWithComma,
        getStringOfColumnWithComma,
        generateUpdateSqlQueryWithData
    } = require('../src/util/Utilites'),
    {
        DISTINCT,
        AUTO_INCREMENT
    } = require('../src/util/KeywordHelper'),
    util = require('../src/util/Utilites'),
    keyHelper = require('../src/util/KeywordHelper'),
    variableDataType = require('../src/util/VariableDataType'),
    {
        DEFAULT,
        fieldPoint
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
        MIN,
        MAX,
        SUM,
        AVG,
        LIKE,
        CAST,
        COUNT,
        GROUP,
        ATTACH,
        NOT_IN,
        SOURCE,
        BETWEEN,
        IS_NULL,
        NOT_NULL,
        LESS_THAN,
        setOperator,
        NOT_BETWEEN,
        IS_NOT_NULL, CONCAT_WS
    } = require('../src/util/QueryHelper');


describe('getCreateTableSqlQuery', () => {

    beforeEach(async () => {
        setNullValueInRam();
    });

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
        setNullValueInRam();
        expect(util.sqlQuery).toBe('');
    });

});


describe('generateValueWithComma', () => {

    beforeEach(async () => {
        setNullValueInRam();
    });


    it('should be return string equal to users', async () => {
        generateValueWithComma('users');
        expect(util.stringOfValueWithComma).toBe('users');
    });

    it('should be return empty string', async () => {
        generateValueWithComma('users');
        setNullValueInRam();
        expect(util.stringOfValueWithComma).toBe('');
    });

    it('should be return string equal to book , users', async () => {
        generateValueWithComma(['book', 'users']);
        expect(util.stringOfValueWithComma).toBe('book , users');
    });

});


describe('generateUpdateSqlQueryWithData', () => {

    beforeEach(async () => {
        setNullValueInRam();
    });


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

    it("should be return array equal to ['users', 'status', '1']", async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            edit: {
                status: 1
            }
        });
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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
        expect(util.arrayOfDataForSqlInjection).toEqual(
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

    it('should be return string equal to WHERE ?? = ? AND ?? NOT IN (?)', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: NOT_IN([0, 15]),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? AND ?? NOT IN (?)');
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

    it('should be return string equal to WHERE ?? = ? OR ?? NOT BETWEEN ? AND ?', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: NOT_BETWEEN(0, 15, keyHelper.OR),
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? OR ?? NOT BETWEEN ? AND ?');
    });

    it('should be return array', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root',
                id: NOT_BETWEEN(0, 15, keyHelper.OR),
            }
        });
        expect(util.arrayOfDataForSqlInjection).toEqual([
            'users',
            'username',
            'root',
            'id',
            '0',
            '15',
        ]);
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
        setNullValueInRam();
        expect(util.sqlQuery).toBe('');
    });

    it('should be return empty string', async () => {
        generateUpdateSqlQueryWithData({
            where: {
                username: 'root',
                id: LIKE(50, keyHelper.OR),
            }
        });
        expect(util.stringOfDataForForSet).toBe('');
    });

    it('should be return empty array', async () => {
        generateUpdateSqlQueryWithData({});
        expect(util.arrayOfDataForSqlInjection).toEqual([]);
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

    it('should be return string equal to WHERE ?? = ? GROUP BY id', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                group: GROUP('id')
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? GROUP BY id');
    });

    it('should be return string equal to WHERE ?? = ? GROUP BY id,name', async () => {
        generateUpdateSqlQueryWithData({
            table: 'users',
            where: {
                username: 'root'
            },
            option: {
                group: GROUP(['id','name'])
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? = ? GROUP BY id,name');
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

    beforeEach(async () => {
        setNullValueInRam();
    });


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
        setNullValueInRam();
        expect(util.dataForInsertSqlQuery).toEqual([]);
    });

});


describe('getStringOfColumnWithComma', () => {

    beforeEach(async () => {
        setNullValueInRam();
    });


    it('should be return string equal to username,status', async () => {
        expect(getStringOfColumnWithComma(['username', 'status'])).toBe('username,status');
    });

});


describe('getOptionKeywordSqlQuery', () => {

    beforeEach(async () => {
        setNullValueInRam();
    });

    it('should be return empty string', async () => {
        getFindSqlQuery({});
        expect(util.sqlQuery).toBe('');
    });

    it('should be return string equal to WHERE ?? < ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                password: setOperator(LESS_THAN, 8)
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ?');
    });

    it('should be return string equal to WHERE ?? BETWEEN ? AND ? AND ?? < ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: BETWEEN(1, 10),
                password: setOperator(LESS_THAN, 8)
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? BETWEEN ? AND ? AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? BETWEEN ? AND ? AND ?? < ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: ATTACH([BETWEEN(1, 10), setOperator(LESS_THAN, 8)])
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? BETWEEN ? AND ? AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? BETWEEN ? AND ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                password: setOperator(LESS_THAN, 8),
                id: BETWEEN(1, 10)
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? BETWEEN ? AND ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? IN (?)', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                password: setOperator(LESS_THAN, 8),
                id: IN([1, 80])
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? IN (?)');
    });

    it('should be return string equal to WHERE ?? IN (?) AND ?? < ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: IN([1, 80]),
                password: setOperator(LESS_THAN, 8)
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? IN (?) AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? LIKE ? AND ?? < ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                name: LIKE('%l'),
                id: setOperator(LESS_THAN, 8)
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? LIKE ? AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? LIKE ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 8),
                name: LIKE('%l')
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? LIKE ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? IS NOT NULL', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 8),
                name: IS_NOT_NULL
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? IS NOT NULL');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? IS NULL', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 8),
                name: IS_NULL
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? IS NULL');
    });

    it('should be return string equal to WHERE ?? IS NOT NULL AND ?? < ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                name: IS_NOT_NULL,
                id: setOperator(LESS_THAN, 8)
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? IS NOT NULL AND ?? < ?');
    });

    it('should be return string equal to WHERE ?? < ? AND ?? LIKE ? AND ?? IN (?)', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 5),
                name: LIKE('%pub'),
                type: IN([1, 5])
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? AND ?? LIKE ? AND ?? IN (?)');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 5)
            },
            option: {
                order: 'id'
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ?');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ? DESC', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 5)
            },
            option: {
                order: 'id',
                name: keyHelper.DESC
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ? DESC');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ? DESC LIMIT ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 5)
            },
            option: {
                order: 'id',
                name: keyHelper.DESC,
                limit: 2
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ? DESC LIMIT ?');
    });

    it('should be return string equal to WHERE ?? < ? ORDER BY ? DESC , ? ASC LIMIT ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 5)
            },
            option: {
                order: 'id',
                name: keyHelper.DESC,
                id: keyHelper.ASC,
                limit: 5
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ? DESC , ? ASC LIMIT ?');
    });


    it('should be return string equal to WHERE ?? < ? ORDER BY ? DESC , ? ASC', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 5)
            },
            option: {
                order: [['id'], keyHelper.DESC],
                id: keyHelper.ASC
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? ORDER BY ? DESC , ? ASC');
    });

    it('should be return string equal to WHERE ?? < ? LIMIT ? OFFSET ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 5)
            },
            option: {
                limit: 5,
                offset: 5
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? LIMIT ? OFFSET ?');
    });

    it('should be return string equal to WHERE ?? < ? LIMIT ? , ? OFFSET ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            where: {
                id: setOperator(LESS_THAN, 5)
            },
            option: {
                limit: [1, 8],
                offset: 5
            }
        });
        expect(util.sqlQuery).toBe('WHERE ?? < ? LIMIT ? , ? OFFSET ?');
    });

    it('should be return string equal to LIMIT ? , ? OFFSET ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            option: {
                limit: [10, 60],
                offset: 1
            }
        });
        expect(util.sqlQuery).toBe('LIMIT ? , ? OFFSET ?');
    });

    it('should be return string equal to LIMIT ? , ?', async () => {
        getFindSqlQuery({
            get: ['id'],
            from: 'users',
            option: {
                limit: [1, 2]
            }
        });
        expect(util.sqlQuery).toBe('LIMIT ? , ?');
    });


});


describe('removeFieldDataInSelect', () => {

    beforeEach(async () => {
        setNullValueInRam();
    });


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

    it('should be return string equal to MIN(price)', async () => {
        validateIdentifiers(
            MIN('price')
        );
        expect(getIdentifier()).toBe('MIN(price)');
    });

    it('should be return string equal to MAX(price)', async () => {
        validateIdentifiers(
            MAX('price')
        );
        expect(getIdentifier()).toBe('MAX(price)');
    });

    it('should be return string equal to CONCAT_WS(" ", id,name) AS like', async () => {
        validateIdentifiers(
            CONCAT_WS(' ', ['id', 'name'], 'like')
        );
        expect(getIdentifier()).toBe('CONCAT_WS(" ", id,name) AS like');
    });

    it('should be return string equal to AVG(price)', async () => {
        validateIdentifiers(
            AVG('price')
        );
        expect(getIdentifier()).toBe('AVG(price)');
    });

    it('should be return string equal to SUM(price)', async () => {
        validateIdentifiers(
            SUM('price')
        );
        expect(getIdentifier()).toBe('SUM(price)');
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

    it("should be return string equal to i AS id , 'name' AS Source", async () => {
        validateIdentifiers(
            [AS('i', 'id'), SOURCE('name')]
        );
        expect(getIdentifier()).toBe("i AS id , 'name' AS Source");
    });

    it("should be return string equal to 'name' AS Source", async () => {
        validateIdentifiers(
            SOURCE('name')
        );
        expect(getIdentifier()).toBe("'name' AS Source");
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
            fieldPoint('location')
        );
        expect(getIdentifier()).toBe('X(location) AS Lat , Y(location) AS Lon');
    });

    it('should be return string equal to ??', async () => {
        validateIdentifiers(
            'id'
        );
        expect(getIdentifier()).toBe('??');
    });

    it('should be return string equal to ??', async () => {
        validateIdentifiers(
            [
                'id'
            ]
        );
        expect(getIdentifier()).toBe('??');
    });

    it('should be return string equal to DISTINCT  ??', async () => {
        validateIdentifiers(
            [DISTINCT, 'id']
        );
        expect(getIdentifier()).toBe('DISTINCT  ??');
    });

    it('should be return string equal to DISTINCT ?? , ??', async () => {
        validateIdentifiers(
            [DISTINCT, 'id', 'name']
        );
        expect(getIdentifier()).toBe('DISTINCT  ?? , ??');
    });

});