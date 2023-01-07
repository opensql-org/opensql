let SqlParser = require('../../');

describe('Insert operation', () => {

    test('When user input expect set operation', () => {

        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'insert'
        }, {
            from: 'users',
            data: {
                username: 'root',
                password: 123
            }
        });
        expect(sql.toSQL()).toBe('INSERT INTO ?? SET ?');
        expect(sql.injection()).toEqual(['users', {
            username: 'root',
            password: 123
        }]);

    });

    test('When user input expect set operation', () => {

        let sql = new SqlParser({
            type: 'mysql',
            operationType: 'insertWithSelect'
        }, {
            from: 'users',
            get: ['username', 'password']
        });
        expect(sql.toSQL()).toBe('INSERT INTO users (username, password) ');

    });

    test('When user input expect multi values', () => {

        let sql = new SqlParser({
            type: 'mysql',
            operation: {
                insert: 'multi'
            },
            operationType: 'insert'
        }, {
            from: 'users',
            data: [
                'clean code', 'Robert C Martin',
                'javascript ES6', 'Mozilla',
                'object oriented programing software engineer', 'Ivar Jacobson'
            ],
            get: ['name', 'author']
        });
        expect(sql.toSQL()).toBe('INSERT INTO users (name,author) VALUES ("clean code","Robert C Martin"), ("javascript ES6","Mozilla"), ("object oriented programing software engineer","Ivar Jacobson")');
        expect(sql.injection()).toEqual([]);

    });

});