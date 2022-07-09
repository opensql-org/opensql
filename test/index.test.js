let openSql = require('../index'),
    {
        INT,
        ENUM,
        POINT,
        BOOLEAN,
        VARCHAR
    } = openSql.dataType,
    {
        CASCADE,
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


    it('should be return create table sql query', async () => {
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

    it('should be return create table sql query', async () => {
        openSql.createTable({
            table: 'SavedMessages',
            field: {
                type: ENUM(['Image', 'Location']),
                isReply: BOOLEAN(),
                location: POINT(),
                user_id: INT()
            }
        });
        expect(openSql.getSqlQuery()).toBe("USE test_open_Sql_database;  CREATE TABLE IF NOT EXISTS `SavedMessages`(type enum('Image', 'Location'), isReply boolean, location point, user_id int)");
    });


    it('should be return add foreign key for SavedMessages table sql query', async () => {

        openSql.addForeignKey({
            table: 'SavedMessages',
            foreignKey: 'user_id',
            referenceTable: 'users',
            field: 'id',
            onDelete: CASCADE,
            onUpdate: CASCADE
        });

        expect(openSql.getSqlQuery()).toBe("USE test_open_Sql_database;  ALTER TABLE `SavedMessages` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    });


});


describe('Drop Table', () => {

    it('should be return drop table sql query', async () => {
        openSql.dropTable('users');
        expect(openSql.getSqlQuery()).toBe("USE test_open_Sql_database; DROP TABLE IF EXISTS users");
    });

    it('should be return sql query for drop two tables', async () => {
        openSql.dropTable(['users', 'SavedMessages']);
        expect(openSql.getSqlQuery()).toBe("USE test_open_Sql_database; DROP TABLE IF EXISTS users , SavedMessages");
    });

});

afterAll(() => {

    openSql.dropDatabase();

});