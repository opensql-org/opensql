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
        expect(sql.toSQL()).toBe('INSERT INTO users (username, password) VALUES ($1, $2)');
        expect(sql.injection()).toMatchObject(['root', 123]);

    });

    test('When user input expect set operation', () => {

        let sql = new SqlParser({
            type: 'postgresql',
            operationType: 'insertWithSelect'
        }, {
            from: 'users',
            get: ['username' , 'password']
        });
        expect(sql.toSQL()).toBe('INSERT INTO users (username, password) ');

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
        expect(sql.toSQL()).toBe('INSERT INTO users (username, password) VALUES ($1, $2), ($3, $4)');
        expect(sql.injection()).toEqual([
            'root', 123,
            'reza', 'pass123'
        ]);

    });

});