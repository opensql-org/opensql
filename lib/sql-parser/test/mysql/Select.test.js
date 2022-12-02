let SqlParser = require('../../');

describe('Union Sql Query', () => {

    it('should be return string equal to SELECT id FROM ?? UNION SELECT * FROM ??', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT id FROM ?? UNION SELECT * FROM ??');
        expect(sql.injection()).toEqual([
            'users',
            'book'
        ]);
    });

    it('should be return string equal to SELECT id FROM ?? UNION SELECT * FROM ?? WHERE ?? = ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT id FROM ?? UNION SELECT * FROM ?? WHERE ?? = ?');
        expect(sql.injection()).toEqual([
            'users',
            'book',
            'id',
            65
        ]);
    });

    it('should be return string equal to SELECT id FROM ?? UNION SELECT ?? FROM ?? WHERE ?? = ? UNION ALL SELECT * FROM ??', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT id FROM ?? UNION SELECT * FROM ?? WHERE ?? = ? UNION ALL SELECT * FROM ??');
        expect(sql.injection()).toEqual([
            'users',
            'book',
            'id',
            65,
            'book'
        ]);
    });

});

describe('Where object', () => {

    it('should be return string equal to SELECT * FROM ?? WHERE ?? < ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? < ?');
        expect(sql.injection()).toEqual([
            'users',
            'password',
            1234
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            1,
            10,
            'password',
            1234
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?');
        expect(sql.injection()).toEqual([
            'users',
            'password',
            1234,
            'id',
            1,
            10
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            1,
            10,
            'id',
            8
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            8,
            'id',
            1,
            10
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? WHERE ?? IN ( ? )', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? IN ( ? )');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            [1, 5]
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? WHERE ?? LIKE ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? LIKE ?');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            '%simple'
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? WHERE ?? IS NOT NULL', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            where: {
                title: 'IS NOT NULL'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? IS NOT NULL');
        expect(sql.injection()).toEqual([
            'users',
            'title'
        ]);
    });

});


describe('Option object', () => {

    it('should be return string equal to SELECT * FROM ?? ORDER BY ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ?');
        expect(sql.injection()).toEqual([
            'users',
            'id'
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? ORDER BY ? DESC', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? DESC');
        expect(sql.injection()).toEqual([
            'users',
            'id'
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? ORDER BY ? DESC LIMIT ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC',
                $limit: 5
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? DESC LIMIT ?');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            5
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? ORDER BY ? DESC , ? ASC LIMIT ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? DESC , ? ASC LIMIT ?');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            'name',
            5
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? ORDER BY ? DESC , ? ASC', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: 'id',
                id: 'DESC',
                name: 'ASC'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? DESC , ? ASC');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            'name'
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? LIMIT ? OFFSET ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $limit: 5,
                $offset: 10
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? LIMIT ? OFFSET ?');
        expect(sql.injection()).toEqual([
            'users',
            5,
            10
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? LIMIT ? , ? OFFSET ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $limit: [1, 5],
                $offset: 10
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? LIMIT ? , ? OFFSET ?');
        expect(sql.injection()).toEqual([
            'users',
            1,
            5,
            10
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? GROUP BY ? , ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $group: ['id', 'name']
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? GROUP BY ? , ?');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            'name'
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? ORDER BY ? , ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: ['id', 'name']
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? , ?');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            'name'
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? ORDER BY ? , ? ASC', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: ['id', 'name'],
                id: 'ASC'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? , ? ASC');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            'name'
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? ORDER BY ? ASC', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: [['id'], 'ASC']
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? ASC');
        expect(sql.injection()).toEqual([
            'users',
            'id'
        ]);
    });

    it('should be return string equal to SELECT * FROM ?? ORDER BY ? ASC , ? DESC', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'select'
        }, {
            from: 'users',
            option: {
                $order: [['id'], 'ASC'],
                id: 'DESC'
            }
        });
        expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? ASC , ? DESC');
        expect(sql.injection()).toEqual([
            'users',
            'id',
            'id'
        ]);
    });

});