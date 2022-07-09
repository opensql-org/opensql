let openSql = require('../index');

beforeAll(() => {

    openSql.connect({
        host: 'localhost',
        user: 'TREER00T',
        password: 'TREER00T'
    });

    openSql.createDatabase('test_open_Sql_database');

});

describe('Index Module', () => {


    it('should ', function () {
        expect(1).toBe(1);
    });


});

afterAll(() => {

     openSql.dropDatabase();

});