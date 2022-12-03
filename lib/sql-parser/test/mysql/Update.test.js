let SqlParser = require('../../');

describe('Update operation', () => {

    it('should be return string equal to UPDATE ?? SET ?? = ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'update'
        }, {
            from: 'users',
            data: {
                bio: 'This is simple test'
            }
        });
        expect(sql.toSQL()).toBe('UPDATE ?? SET ?? = ?');
        expect(sql.injection()).toEqual(['users', 'bio', 'This is simple test']);
    });

    it('should be return string equal to UPDATE ?? SET ?? = ? WHERE ?? = ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('UPDATE ?? SET ?? = ? WHERE ?? = ?');
        expect(sql.injection()).toEqual(['users', 'bio', 'This is simple test', 'username', 'root']);
    });

    it('should be return string equal to UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?', () => {
        let sql = new SqlParser({
            type: 'mysql',
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
        expect(sql.toSQL()).toBe('UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?');
        expect(sql.injection()).toEqual(['users', 'bio', 'This is simple test', 'status', 'Ban', 'username', 'root']);
    });

});