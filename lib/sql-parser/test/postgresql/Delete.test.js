let SqlParser = require('../../');

describe('Delete operation', () => {

    it('should be return string equal to DELETE FROM users WHERE username = $1 AND password = $2', () => {

        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'delete'
        }, {
            from: 'users',
            where: {
                username: 'root',
                password: 123
            }
        });
        expect(sql.toSQL()).toBe('DELETE FROM users WHERE username = $1 AND password = $2');
        expect(sql.injection()).toEqual(['root', 123]);

    });

    it('should be return string equal to DELETE FROM users', () => {

        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'delete'
        }, {
            from: 'users'
        });
        expect(sql.toSQL()).toBe('DELETE FROM users');
        expect(sql.injection()).toEqual([]);

    });

});