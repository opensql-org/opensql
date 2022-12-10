let SqlParser = require('../../');

describe('Delete operation', () => {

    it('should be return string equal to DELETE FROM users WHERE username = "root" AND password = 123', () => {

        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'delete'
        }, {
            from: 'users',
            where: {
                username: 'root',
                password: 123
            }
        });
        expect(sql.toSQL()).toBe('DELETE FROM users WHERE username = "root" AND password = 123');

        try {
            sql.injection()
        } catch (e) {
            expect(e.toString()).toBe('Error: The injection() function hasn\'t support for this database; Use toSQL() function');
        }

    });

    it('should be return string equal to DELETE FROM users', () => {

        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'delete'
        }, {
            from: 'users'
        });
        expect(sql.toSQL()).toBe('DELETE FROM users');

    });

});