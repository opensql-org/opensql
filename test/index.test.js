let openSql = require('../index'),
    {
        INT,
        ENUM,
        POINT,
        BOOLEAN,
        VARCHAR
    } = openSql.dataType,
    {
        AUTO_INCREMENT
    } = openSql.keywordHelper,
    {
        NOT_NULL
    } = openSql.queryHelper;

beforeAll(() => {

    openSql.connect({
        host: 'localhost',
        user: 'TREER00T',
        password: 'TREER00T'
    });

    openSql.createDatabase('test_open_Sql_database');

});

describe('create table', () => {


    it('should be return create table sql query', function () {
        openSql.createTable({
            table: 'users',
            field: {
                id: INT([NOT_NULL, AUTO_INCREMENT]),
                email: VARCHAR([NOT_NULL, 255]),
                phone: VARCHAR(20)
            },
            primaryKey: 'id'
        });
        expect(openSql.getSqlQuery()).toBe("USE test_open_Sql_database;  CREATE TABLE IF NOT EXISTS `users`(id int NOT NULL AUTO_INCREMENT, email varchar(255) NOT NULL, phone varchar(20) , PRIMARY KEY (id))");
    });

    it('should be return create table sql query', function () {
        openSql.createTable({
            table: 'SavedMessages',
            field: {
                type: ENUM(['Image', 'Location']),
                isReply: BOOLEAN(),
                location: POINT(),
            }
        });
        expect(openSql.getSqlQuery()).toBe("USE test_open_Sql_database;  CREATE TABLE IF NOT EXISTS `SavedMessages`(type enum('Image', 'Location'), isReply boolean, location point)");
    });


});

afterAll(() => {

     openSql.dropDatabase();

});