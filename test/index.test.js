let openSql = require('../index'),
    exe = require('../src/execute/run'),
    {
        INT,
        ENUM,
        POINT,
        BOOLEAN,
        VARCHAR
    } = openSql.dataType,
    {
        OR,
        STAR,
        CASCADE,
        AUTO_INCREMENT
    } = openSql.keywordHelper,
    {
        NOT,
        UNION,
        NOT_NULL,
        LESS_THAN,
        UNION_ALL,
        setOperator
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
        expect(exe.getSqlQuery()).toBe("USE test_open_Sql_database;  CREATE TABLE IF NOT EXISTS `users`(id int NOT NULL AUTO_INCREMENT, email varchar(255) NOT NULL, phone varchar(20) , PRIMARY KEY (id))");
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
        expect(exe.getSqlQuery()).toBe("USE test_open_Sql_database;  CREATE TABLE IF NOT EXISTS `SavedMessages`(type enum('Image', 'Location'), isReply boolean, location point, user_id int)");
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

        expect(exe.getSqlQuery()).toBe("USE test_open_Sql_database;  ALTER TABLE `SavedMessages` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    });


});


describe('Union Sql Query', () => {

    it('should be return string equal to USE test_open_Sql_database;  SELECT * FROM ?? UNION SELECT ?? FROM ??', async () => {
        openSql.find({
            get: 'id',
            from: 'users',
            union: [
                UNION({
                    get: STAR,
                    from: 'book'
                })
            ]
        });
        expect(exe.getSqlQuery()).toBe('USE test_open_Sql_database;  SELECT * FROM ?? UNION SELECT * FROM ??');
    });


    it('should be return string equal to USE test_open_Sql_database;  SELECT * FROM ?? UNION SELECT ?? FROM ?? WHERE ?? = ?', async () => {
        openSql.find({
            get: 'id',
            from: 'users',
            union: [
                UNION({
                    get: STAR,
                    from: 'book',
                    where: {
                        id: 65
                    }
                })
            ]
        });
        expect(exe.getSqlQuery()).toBe('USE test_open_Sql_database;  SELECT * FROM ?? UNION SELECT * FROM ?? WHERE ?? = ?');
    });


    it('should be return string equal to USE test_open_Sql_database;  SELECT * FROM ?? UNION SELECT ?? FROM ?? WHERE ?? = ? UNION ALL SELECT * FROM ?? WHERE ?? = ?', async () => {
        openSql.find({
            get: 'id',
            from: 'users',
            union: [
                UNION({
                    get: STAR,
                    from: 'book',
                    where: {
                        id: 65
                    }
                }),
                UNION_ALL({
                    get: STAR,
                    from: 'book',
                    where: {
                        id: 65
                    }
                })
            ]
        });
        expect(exe.getSqlQuery()).toBe('USE test_open_Sql_database;  SELECT * FROM ?? UNION SELECT * FROM ?? WHERE ?? = ? UNION ALL SELECT * FROM ?? WHERE ?? = ?');
    });

    it('should be return string equal to USE test_open_Sql_database;  SELECT ?? FROM ?? UNION SELECT ?? FROM ?? WHERE NOT ?? = ?', async () => {
        openSql.find({
            get: 'id',
            from: 'users',
            union: [
                UNION({
                    table: 'users',
                    whereNot: {
                        username: 'root'
                    }
                })
            ]
        });
        expect(exe.getSqlQuery()).toBe('USE test_open_Sql_database;  SELECT ?? FROM ?? UNION SELECT ?? FROM ?? WHERE NOT ?? = ?');
    });

    it('should be return string equal to USE test_open_Sql_database;  SELECT ?? FROM ?? UNION SELECT ?? FROM ?? WHERE NOT ?? = ? AND NOT ?? < ?', async () => {
        openSql.find({
            get: 'id',
            from: 'users',
            union: [
                UNION({
                    table: 'users',
                    whereNot: {
                        username: 'root',
                        id: NOT(setOperator(LESS_THAN, 5))
                    }
                })
            ]
        });
        expect(exe.getSqlQuery()).toBe('USE test_open_Sql_database;  SELECT ?? FROM ?? UNION SELECT ?? FROM ?? WHERE NOT ?? = ? AND NOT ?? < ?');
    });

    it('should be return string equal to USE test_open_Sql_database;  SELECT ?? FROM ?? UNION SELECT ?? FROM ?? WHERE NOT ?? = ? OR NOT ?? < ?', async () => {
        openSql.find({
            get: 'id',
            from: 'users',
            union: [
                UNION({
                    table: 'users',
                    whereNot: {
                        username: 'root',
                        id: NOT(setOperator(LESS_THAN, 5), OR)
                    }
                })
            ]
        });
        expect(exe.getSqlQuery()).toBe('USE test_open_Sql_database;  SELECT ?? FROM ?? UNION SELECT ?? FROM ?? WHERE NOT ?? = ? OR NOT ?? < ?');
    });

});


describe('Drop Table', () => {

    it('should be return drop table sql query', async () => {
        openSql.dropTable('users');
        expect(exe.getSqlQuery()).toBe("USE test_open_Sql_database; DROP TABLE IF EXISTS users");
    });

    it('should be return sql query for drop two tables', async () => {
        openSql.dropTable(['users', 'SavedMessages']);
        expect(exe.getSqlQuery()).toBe("USE test_open_Sql_database; DROP TABLE IF EXISTS users , SavedMessages");
    });

});

afterAll(() => {

    openSql.dropDatabase();

});