let SqlParser = require('../../');

describe('Update operation', () => {

    it('should be return string equal to UPDATE users SET bio = $1', () => {
        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'update'
        }, {
            from: 'users',
            data: {
                bio: 'This is simple test'
            }
        });
        expect(sql.toSQL()).toBe('UPDATE users SET bio = $1');
        expect(sql.injection()).toEqual(['This is simple test']);
    });

    it('should be return string equal to UPDATE users SET bio = $1 WHERE username = $2', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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
        expect(sql.toSQL()).toBe('UPDATE users SET bio = $1 WHERE username = $2');
        expect(sql.injection()).toEqual(['This is simple test', 'root']);
    });

    it('should be return string equal to UPDATE users SET bio = $1 , status = $2 WHERE username = $3', () => {
        let sql = new SqlParser({
            type: 'postgresql',
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

        expect(sql.toSQL()).toBe('UPDATE users SET bio = $1 , status = $2 WHERE username = $3');
        expect(sql.injection()).toEqual([ 'This is simple test', 'Ban', 'root']);
    });

});