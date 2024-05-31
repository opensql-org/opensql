const SqlParser = require('../../');

describe('Delete operation', () => {
  it('should be return string equal to DELETE FROM ?? WHERE ?? = ? AND ?? = ?', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'delete',
      },
      {
        from: 'users',
        where: {
          username: 'root',
          password: 123,
        },
      },
    );
    expect(sql.toSQL()).toBe('DELETE FROM ?? WHERE ?? = ? AND ?? = ?');
    expect(sql.injection()).toEqual([
      'users',
      'username',
      'root',
      'password',
      123,
    ]);
  });

  it('should be return string equal to DELETE FROM ??', () => {
    const sql = new SqlParser(
      {
        type: 'mysql',
        operationType: 'delete',
      },
      {
        from: 'users',
      },
    );
    expect(sql.toSQL()).toBe('DELETE FROM ??');
    expect(sql.injection()).toEqual(['users']);
  });
});
