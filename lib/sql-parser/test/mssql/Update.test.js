let SqlParser = require('../../');

describe('Update operation', () => {

    it('should be return string equal to UPDATE users SET bio = "This is simple test"', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'update'
        }, {
            from: 'users',
            data: {
                bio: 'This is simple test'
            }
        });
        expect(sql.toSQL()).toBe('UPDATE users SET bio = "This is simple test"');
    });

    it('should be return string equal to UPDATE users SET bio = "This is simple test" WHERE username = "root"', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'update'
        }, {
            from: 'users',
            data: {
                bio: 'This is simple test'
            },
            where: {
                username: 'root'
            }
        });
        expect(sql.toSQL()).toBe('UPDATE users SET bio = "This is simple test" WHERE username = "root"');
    });

    it('should be return string equal to UPDATE users SET bio = "This is simple test" , status = "Ban" WHERE username = "root"', () => {
        let sql = new SqlParser({
            type: 'mssql',
            operationType: 'update'
        }, {
            from: 'users',
            data: {
                bio: 'This is simple test',
                status: 'Ban'
            },
            where: {
                username: 'root'
            }
        });
        expect(sql.toSQL()).toBe('UPDATE users SET bio = "This is simple test" , status = "Ban" WHERE username = "root"');
    });

});