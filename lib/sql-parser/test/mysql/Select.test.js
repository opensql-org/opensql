const SqlParser = require('../../');

describe('Union Sql Query', () => {
  it('should be return string equal to SELECT id FROM ?? UNION SELECT * FROM ??', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        get: 'id',
        from: 'users',
        union: [
          {
            type: 'UNION',
            value: {
              from: 'book',
            },
          },
        ],
      },
    );
    expect(sql.toSQL()).toBe('SELECT id FROM ?? UNION SELECT * FROM ??');
    expect(sql.injection()).toEqual(['users', 'book']);
  });

  it('should be return string equal to SELECT id FROM ?? UNION SELECT * FROM ?? WHERE ?? = ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        get: 'id',
        from: 'users',
        union: [
          {
            type: 'UNION',
            value: {
              from: 'book',
              where: {
                id: 65,
              },
            },
          },
        ],
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT id FROM ?? UNION SELECT * FROM ?? WHERE ?? = ?',
    );
    expect(sql.injection()).toEqual(['users', 'book', 'id', 65]);
  });

  it('should be return string equal to SELECT id FROM ?? UNION SELECT ?? FROM ?? WHERE ?? = ? UNION ALL SELECT * FROM ??', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        get: 'id',
        from: 'users',
        union: [
          {
            type: 'UNION',
            value: {
              from: 'book',
              where: {
                id: 65,
              },
            },
          },
          {
            type: 'UNION ALL',
            value: {
              from: 'book',
            },
          },
        ],
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT id FROM ?? UNION SELECT * FROM ?? WHERE ?? = ? UNION ALL SELECT * FROM ??',
    );
    expect(sql.injection()).toEqual(['users', 'book', 'id', 65, 'book']);
  });
});

describe('Where object', () => {
  it('should be return string equal to SELECT * FROM ?? WHERE ?? < ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          password: {
            value: 1234,
            conjunctionType: 'AND',
            comparisonOperator: '<',
            type: 'qCheck',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? < ?');
    expect(sql.injection()).toEqual(['users', 'password', 1234]);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE password->"$.id" < ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          password: {
            value: {
              key: '->"$.id"',
              has: '1',
              type: 'JsonChecker',
            },
            conjunctionType: 'AND',
            comparisonOperator: '<',
            type: 'qCheck',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE password->"$.id" < ?');
    expect(sql.injection()).toEqual(['users', '1']);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE JSON_EXTRACT(password, "$.id") < ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          password: {
            value: {
              key: 'JSON_EXTRACT(password, "$.id")',
              has: '1',
              type: 'JsonChecker',
            },
            conjunctionType: 'AND',
            comparisonOperator: '<',
            type: 'qCheck',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? WHERE JSON_EXTRACT(password, "$.id") < ?',
    );
    expect(sql.injection()).toEqual(['users', '1']);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE password->"$.id" < ? AND data->"$.id" = ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          password: {
            value: {
              key: '->"$.id"',
              has: '1',
              type: 'JsonChecker',
            },
            conjunctionType: 'AND',
            comparisonOperator: '<',
            type: 'qCheck',
          },
          data: {
            value: {
              key: '->"$.id"',
              has: 'root',
              type: 'JsonChecker',
            },
            conjunctionType: 'AND',
            comparisonOperator: '=',
            type: 'qCheck',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? WHERE password->"$.id" < ? AND data->"$.id" = ?',
    );
    expect(sql.injection()).toEqual(['users', '1', 'root']);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          id: {
            value: {
              first: 1,
              second: 10,
            },
            conjunctionType: 'AND',
            type: 'BETWEEN',
          },
          password: {
            value: 1234,
            conjunctionType: 'AND',
            comparisonOperator: '<',
            type: 'qCheck',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?',
    );
    expect(sql.injection()).toEqual(['users', 'id', 1, 10, 'password', 1234]);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          password: {
            value: 1234,
            conjunctionType: 'AND',
            comparisonOperator: '<',
            type: 'qCheck',
          },
          id: {
            value: {
              first: 1,
              second: 10,
            },
            conjunctionType: 'OR',
            type: 'BETWEEN',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?',
    );
    expect(sql.injection()).toEqual(['users', 'password', 1234, 'id', 1, 10]);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          id: {
            value: [
              {
                conjunctionType: 'AND',
                type: 'BETWEEN',
                value: {
                  first: 1,
                  second: 10,
                },
              },
              {
                conjunctionType: 'AND',
                type: 'qCheck',
                value: 8,
                comparisonOperator: '<',
              },
            ],
            conjunctionType: 'AND',
            type: 'ATTACH',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? WHERE ?? BETWEEN ? AND ? AND ?? < ?',
    );
    expect(sql.injection()).toEqual(['users', 'id', 1, 10, 'id', 8]);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
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
                  second: 10,
                },
              },
            ],
            conjunctionType: 'AND',
            type: 'ATTACH',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? WHERE ?? < ? OR ?? BETWEEN ? AND ?',
    );
    expect(sql.injection()).toEqual(['users', 'id', 8, 'id', 1, 10]);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE ?? IN ( ? )', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          id: {
            conjunctionType: 'OR',
            type: 'IN',
            value: [1, 5],
          },
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? IN ( ? )');
    expect(sql.injection()).toEqual(['users', 'id', [1, 5]]);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE ?? LIKE ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          id: {
            conjunctionType: 'OR',
            type: 'LIKE',
            value: '%simple',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? LIKE ?');
    expect(sql.injection()).toEqual(['users', 'id', '%simple']);
  });

  it('should be return string equal to SELECT * FROM ?? WHERE ?? IS NOT NULL', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        where: {
          title: 'IS NOT NULL',
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? WHERE ?? IS NOT NULL');
    expect(sql.injection()).toEqual(['users', 'title']);
  });
});

describe('Option object', () => {
  it('should be return string equal to SELECT * FROM ?? ORDER BY ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: 'id',
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ?');
    expect(sql.injection()).toEqual(['users', 'id']);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? DESC', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: 'id',
          id: 'DESC',
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? DESC');
    expect(sql.injection()).toEqual(['users', 'id']);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? DESC LIMIT ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: 'id',
          id: 'DESC',
          $limit: 5,
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? DESC LIMIT ?');
    expect(sql.injection()).toEqual(['users', 'id', 5]);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? DESC , ? ASC LIMIT ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: 'id',
          id: 'DESC',
          name: 'ASC',
          $limit: 5,
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? ORDER BY ? DESC , ? ASC LIMIT ?',
    );
    expect(sql.injection()).toEqual(['users', 'id', 'name', 5]);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? DESC , ? ASC', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: 'id',
          id: 'DESC',
          name: 'ASC',
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? DESC , ? ASC');
    expect(sql.injection()).toEqual(['users', 'id', 'name']);
  });

  it('should be return string equal to SELECT * FROM ?? LIMIT ? OFFSET ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $limit: 5,
          $offset: 10,
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? LIMIT ? OFFSET ?');
    expect(sql.injection()).toEqual(['users', 5, 10]);
  });

  it('should be return string equal to SELECT * FROM ?? LIMIT ? , ? OFFSET ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $limit: [1, 5],
          $offset: 10,
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? LIMIT ? , ? OFFSET ?');
    expect(sql.injection()).toEqual(['users', 1, 5, 10]);
  });

  it('should be return string equal to SELECT * FROM ?? GROUP BY ? , ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $group: ['id', 'name'],
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? GROUP BY ? , ?');
    expect(sql.injection()).toEqual(['users', 'id', 'name']);
  });

  it('should be return string equal to SELECT * FROM ?? GROUP BY ? , ? HAVING COUNT(userId) = ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $group: ['id', 'name'],
          $having: {
            value: {
              leftStatement: 'COUNT(userId)',
              rightStatement: 14,
            },
            conjunctionType: 'AND',
            comparisonOperator: '=',
            type: 'Condition',
          },
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? GROUP BY ? , ? HAVING COUNT(userId) = ?',
    );
    expect(sql.injection()).toEqual(['users', 'id', 'name', 14]);
  });

  it('should be return string equal to SELECT * FROM ?? GROUP BY ? , ? HAVING COUNT(password) = ? OR COUNT(userId) > ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $group: ['id', 'name'],
          $having: [
            {
              value: {
                leftStatement: 'COUNT(password)',
                rightStatement: '1234',
              },
              conjunctionType: 'OR',
              comparisonOperator: '=',
              type: 'Condition',
            },
            {
              value: {
                leftStatement: 'COUNT(userId)',
                rightStatement: 14,
              },
              conjunctionType: 'OR',
              comparisonOperator: '>',
              type: 'Condition',
            },
          ],
        },
      },
    );
    expect(sql.toSQL()).toBe(
      'SELECT * FROM ?? GROUP BY ? , ? HAVING COUNT(password) = ? OR COUNT(userId) > ?',
    );
    expect(sql.injection()).toEqual(['users', 'id', 'name', '1234', 14]);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? , ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: ['id', 'name'],
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? , ?');
    expect(sql.injection()).toEqual(['users', 'id', 'name']);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? , ? ASC', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: ['id', 'name'],
          id: 'ASC',
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? , ? ASC');
    expect(sql.injection()).toEqual(['users', 'id', 'name']);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? ASC', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: [['id'], 'ASC'],
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? ASC');
    expect(sql.injection()).toEqual(['users', 'id']);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? ASC , ? DESC', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: [['id'], 'ASC'],
          id: 'DESC',
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? ASC , ? DESC');
    expect(sql.injection()).toEqual(['users', 'id', 'id']);
  });

  it('should be return string equal to SELECT * FROM ?? ORDER BY ? ASC LIMIT ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'select',
      },
      {
        from: 'users',
        option: {
          $order: [['id'], 'ASC'],
          $limit: 5,
        },
      },
    );
    expect(sql.toSQL()).toBe('SELECT * FROM ?? ORDER BY ? ASC LIMIT ?');
    expect(sql.injection()).toEqual(['users', 'id', 5]);
  });
});
