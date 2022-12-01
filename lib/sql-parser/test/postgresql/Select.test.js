let SqlParser = require('../../');

describe('Union Sql Query', () => {

    it('should be return string equal to SELECT id FROM users UNION SELECT * FROM book', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT id FROM users UNION SELECT * FROM book');
    });

    it('should be return string equal to SELECT id FROM users UNION SELECT * FROM book WHERE id = $1', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT id FROM users UNION SELECT * FROM book WHERE id = $1');
    });

    it('should be return string equal to SELECT id FROM users UNION SELECT * FROM book WHERE id = $1 UNION ALL SELECT * FROM book', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT id FROM users UNION SELECT * FROM book WHERE id = $1 UNION ALL SELECT * FROM book');
    });

});

describe('Where object', () => {

    it('should be return string equal to SELECT * FROM users WHERE password < $1', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users WHERE password < $1');
    });

    it('should be return string equal to SELECT * FROM users WHERE id BETWEEN $1 AND $2 AND password < $3', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users WHERE id BETWEEN $1 AND $2 AND password < $3');
    });

    it('should be return string equal to SELECT * FROM users WHERE password < $1 OR id BETWEEN $2 AND $3', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users WHERE password < $1 OR id BETWEEN $2 AND $3');
    });

    it('should be return string equal to SELECT * FROM users WHERE id BETWEEN $1 AND $2 AND id < $3', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users WHERE id BETWEEN $1 AND $2 AND id < $3');
    });

    it('should be return string equal to SELECT * FROM users WHERE id < $1 OR id BETWEEN $2 AND $3', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users WHERE id < $1 OR id BETWEEN $2 AND $3');
    });

    it('should be return string equal to SELECT * FROM users WHERE id IN ( $1 )', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users WHERE id IN ( $1 )');
    });

    it('should be return string equal to SELECT * FROM users WHERE id LIKE $1', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                id: {
                    conjunctionType: 'OR',
                    type: 'LIKE',
                    value: '"%simple"'
                }
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users WHERE id LIKE $1');
    });

    it('should be return string equal to SELECT * FROM users WHERE title IS NOT NULL', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                title: 'IS NOT NULL'
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users WHERE title IS NOT NULL');
    });

});


describe('Option object', () => {

    it('should be return string equal to SELECT * FROM users ORDER BY $1', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id'
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users ORDER BY $1');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY $1 DESC', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC'
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users ORDER BY $1 DESC');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY $1 DESC LIMIT $2', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC',
                $limit: 5
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users ORDER BY $1 DESC LIMIT $2');
    });

    it('should be return string equal toSELECT * FROM users ORDER BY $1 DESC , $2 ASC LIMIT $3', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users ORDER BY $1 DESC , $2 ASC LIMIT $3');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY $1 DESC , $2 ASC', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC',
                name: 'ASC'
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users ORDER BY $1 DESC , $2 ASC');
    });

    it('should be return string equal to SELECT * FROM users LIMIT $1 OFFSET $2', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $limit: 5,
                $offset: 10
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users LIMIT $1 OFFSET $2');
    });

    it('should be return string equal to SELECT * FROM users LIMIT $1 , $2 OFFSET $3', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $limit: [1, 5],
                $offset: 10
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users LIMIT $1 , $2 OFFSET $3');
    });

    it('should be return string equal to SELECT * FROM users GROUP BY $1 , $2', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $group: ['id','name']
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users GROUP BY $1 , $2');
    });

    it('should be return string equal to SELECT * FROM users GROUP BY $1 , $2 ASC', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $group: ['id','name'],
                id:'ASC'
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users GROUP BY $1 , $2 ASC');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY $1 , $2', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: ['id','name']
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users ORDER BY $1 , $2');
    });

    it('should be return string equal to SELECT * FROM users ORDER BY $1 ASC , $2 DESC', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: [['id'], 'ASC'],
                id: 'DESC'
            }
        });
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM users ORDER BY $1 ASC , $2 DESC');
    });

});