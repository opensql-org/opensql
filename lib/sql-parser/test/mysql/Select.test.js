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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT id FROM ?? UNION SELECT * FROM ??');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT id FROM ?? UNION SELECT * FROM ?? WHERE ?? = ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT id FROM ?? UNION SELECT * FROM ?? WHERE ?? = ? UNION ALL SELECT * FROM ??');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? WHERE ?? < ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? WHERE ?? IN ( ? )');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? WHERE ?? LIKE ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? WHERE ?? IS NOT NULL');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ? DESC');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ? DESC LIMIT ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ? DESC , ? ASC LIMIT ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ? DESC , ? ASC');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? LIMIT ? OFFSET ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? LIMIT ? , ? OFFSET ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? GROUP BY ? , ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ? , ?');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ? , ? ASC');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ? ASC');
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
        expect(sql.sqlWithPlaceHolder()).toBe('SELECT * FROM ?? ORDER BY ? ASC , ? DESC');
    });

});