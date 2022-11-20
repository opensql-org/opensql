let SqlParser = require('../../');

describe('Insert operation', () => {

    test('When user input expect set operation', () => {

        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'insert'
        }, {
            from: 'users',
            data: {
                username: 'root',
                password: 123
            }
        });
        expect(sql.toSQL()).toBe('INSERT INTO users (username, password) VALUES ("root", 123)');
        expect(sql.injection()).toMatchObject(['root', 123]);
        expect(sql.sqlWithPlaceHolder()).toBe('INSERT INTO users (username, password) VALUES ($1, $2)');

    });

    test('When user input expect multi values', () => {

        let sql = new SqlParser({
            type: 'postgresql',
            operation: {
                insert: 'multi'
            },
            operationType: 'insert'
        }, {
            from: 'users',
            data: [
                'root', 123,
                'reza', 'pass123'
            ],
            get: ['username', 'password']
        });
        expect(sql.toSQL()).toBe('INSERT INTO users (username, password) VALUES ("root",123), ("reza","pass123")');
        expect(sql.injection()).toEqual([
            'root', 123,
            'reza', 'pass123'
        ]);
        expect(sql.sqlWithPlaceHolder()).toBe('INSERT INTO users (username, password) VALUES ($1, $2), ($3, $4)');

    });

});