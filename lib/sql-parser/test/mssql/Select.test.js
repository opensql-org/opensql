let SqlParser = require('../../');

describe('Union Sql Query', () => {

    it('should be return string equal to SELECT id FROM users UNION SELECT * FROM book', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            get: 'id',
            from: 'users',
            union: [
                {
                    type: 'UNION',
                    value: {
                        from: 'book'
                    }
                }
            ]
        });
        expect(sql.toSQL()).toBe('SELECT id FROM users UNION SELECT * FROM book');
    });

    it('should be return string equal to SELECT id FROM users UNION SELECT * FROM book WHERE id = 65', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            get: 'id',
            from: 'users',
            union: [
                {
                    type: 'UNION',
                    value: {
                        from: 'book',
                        where: {
                            id: 65
                        }
                    }
                }
            ]
        });
        expect(sql.toSQL()).toBe('SELECT id FROM users UNION SELECT * FROM book WHERE id = 65');
    });

    it('should be return string equal to SELECT id FROM users UNION SELECT * FROM book WHERE id = 65 UNION ALL SELECT * FROM book', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            get: 'id',
            from: 'users',
            union: [
                {
                    type: 'UNION',
                    value: {
                        from: 'book',
                        where: {
                            id: 65
                        }
                    }
                },
                {
                    type: 'UNION ALL',
                    value: {
                        from: 'book'
                    }
                }
            ]
        });
        expect(sql.toSQL()).toBe('SELECT id FROM users UNION SELECT * FROM book WHERE id = 65 UNION ALL SELECT * FROM book');
    });

});

describe('Where object', () => {

    it('should be return string equal to SELECT * FROM users WHERE password < 1234', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                password: {
                    value: 1234,
                    conjunctionType: 'AND',
                    comparisonOperator: '<',
                    type: 'qCheck'
                }
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users WHERE password < 1234');
    });

    it('should be return string equal to SELECT * FROM users WHERE id BETWEEN 1 AND 10 AND password < 1234', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                id: {
                    value: {
                        first: 1,
                        second: 10
                    },
                    conjunctionType: 'AND',
                    type: 'BETWEEN'
                },
                password: {
                    value: 1234,
                    conjunctionType: 'AND',
                    comparisonOperator: '<',
                    type: 'qCheck'
                }
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users WHERE id BETWEEN 1 AND 10 AND password < 1234');
    });

    it('should be return string equal to SELECT * FROM users WHERE password < 1234 OR id BETWEEN 1 AND 10', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                password: {
                    value: 1234,
                    conjunctionType: 'AND',
                    comparisonOperator: '<',
                    type: 'qCheck'
                },
                id: {
                    value: {
                        first: 1,
                        second: 10
                    },
                    conjunctionType: 'OR',
                    type: 'BETWEEN'
                }
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users WHERE password < 1234 OR id BETWEEN 1 AND 10');
    });

    it('should be return string equal to SELECT * FROM users WHERE id BETWEEN 1 AND 10 AND id < 8', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                id: {
                    value: [
                        {
                            conjunctionType: 'AND',
                            type: 'BETWEEN',
                            value: {
                                first: 1,
                                second: 10
                            }
                        },
                        {
                            conjunctionType: 'AND',
                            type: 'qCheck',
                            value: 8,
                            comparisonOperator: '<',
                        }
                    ],
                    conjunctionType: 'AND',
                    type: 'ATTACH'
                }
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users WHERE id BETWEEN 1 AND 10 AND id < 8');
    });

    it('should be return string equal to SELECT * FROM users WHERE id < 8 OR id BETWEEN 1 AND 10', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                id: {
                    value: [
                        {
                            conjunctionType: 'AND',
                            type: 'qCheck',
                            value: 8,
                            comparisonOperator: '<',
                        },
                        {
                            conjunctionType: 'OR',
                            type: 'BETWEEN',
                            value: {
                                first: 1,
                                second: 10
                            }
                        }

                    ],
                    conjunctionType: 'AND',
                    type: 'ATTACH'
                }
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users WHERE id < 8 OR id BETWEEN 1 AND 10');
    });

    it('should be return string equal to SELECT * FROM users WHERE id IN ( 1,5 )', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                id: {
                    conjunctionType: 'OR',
                    type: 'IN',
                    value: [1, 5]
                }
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users WHERE id IN ( 1,5 )');
    });

    it('should be return string equal to SELECT * FROM users WHERE id LIKE "%simple"', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                id: {
                    conjunctionType: 'OR',
                    type: 'LIKE',
                    value: '%simple'
                }
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users WHERE id LIKE "%simple"');
    });

    it('should be return string equal to SELECT * FROM users WHERE title IS NOT NULL', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                title: 'IS NOT NULL'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users WHERE title IS NOT NULL');
    });

});


describe('Option object', () => {

    it('should be return string equal to SELECT * FROM users ORDER BY id', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users ORDER BY id');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY id DESC', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users ORDER BY id DESC');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY id DESC LIMIT 5', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC',
                $limit: 5
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users ORDER BY id DESC LIMIT 5');
    });

    it('should be return string equal toSELECT * FROM users ORDER BY id DESC , name ASC LIMIT 5', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC',
                name: 'ASC',
                $limit: 5
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users ORDER BY id DESC , name ASC LIMIT 5');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY id DESC , name ASC', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC',
                name: 'ASC'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users ORDER BY id DESC , name ASC');
    });

    it('should be return string equal to SELECT * FROM users LIMIT 5 OFFSET 10', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $limit: 5,
                $offset: 10
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users LIMIT 5 OFFSET 10');
    });

    it('should be return string equal to SELECT * FROM users LIMIT 1 , 5 OFFSET 10', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $limit: [1, 5],
                $offset: 10
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users LIMIT 1 , 5 OFFSET 10');
    });

    it('should be return string equal to SELECT * FROM users GROUP BY id , name', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $group: ['id','name']
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users GROUP BY id , name');
    });

    it('should be return string equal to SELECT * FROM users GROUP BY id , name ASC', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $group: ['id','name'],
                id:'ASC'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users GROUP BY id , name ASC');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY id , name', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: ['id','name']
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users ORDER BY id , name');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY id ASC , id DESC', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: [['id'], 'ASC'],
                id: 'DESC'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM users ORDER BY id ASC , id DESC');
    });

});