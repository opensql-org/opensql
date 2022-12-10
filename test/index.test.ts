import Builder from '../src/common/query/Builder';
import {DataType, AUTO_INCREMENT, NOT_NULL, DEFAULT} from '../index';

let BuilderFactory = new Builder();

describe('Builder class', () => {

    describe('Create Database', () => {

        test('createDatabase and dropDatabase', () => {

            BuilderFactory.setDriverName('mssql');

            expect(BuilderFactory.createDatabase('simpleDB')).toBe('CREATE DATABASE IF NOT EXISTS simpleDB CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI');

            expect(BuilderFactory.dropDatabase('simpleDB')).toBe('DROP DATABASE simpleDB');

        });

    });

    describe('Drop Or Clear Table', () => {

        test('dropTable', () => {

            expect(BuilderFactory.dropTable('users')).toBe('DROP TABLE IF EXISTS users');

        });

        test('truncateTable', () => {

            expect(BuilderFactory.truncateTable('users')).toBe('TRUNCATE TABLE users');

        });

    });


    describe('Create Table', () => {

        it('should be return CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, phone VARCHAR(20) )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    id: DataType.INT([NOT_NULL, AUTO_INCREMENT]),
                    email: DataType.VARCHAR([NOT_NULL, 255]),
                    phone: DataType.VARCHAR(20)
                }
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, phone VARCHAR(20) )');

        });

        it('should be return CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, phone VARCHAR(20) , PRIMARY KEY (id) )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    id: DataType.INT([NOT_NULL, AUTO_INCREMENT]),
                    email: DataType.VARCHAR([NOT_NULL, 255]),
                    phone: DataType.VARCHAR(20)
                },
                primaryKey: 'id'
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, phone VARCHAR(20) , PRIMARY KEY (id) )');

        });

        it('should be return CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL AUTO_INCREMENT , FOREIGN KEY (id) REFERENCES books(user_id) , email VARCHAR(255) NOT NULL, phone VARCHAR(20) )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    id: DataType.INT([NOT_NULL, AUTO_INCREMENT]),
                    email: DataType.VARCHAR([NOT_NULL, 255]),
                    phone: DataType.VARCHAR(20)
                },
                foreignKey: {
                    id: {
                        get: 'id',
                        to: 'books',
                        column: 'user_id'
                    }
                }
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( id INT NOT NULL AUTO_INCREMENT , FOREIGN KEY (id) REFERENCES books(user_id) , email VARCHAR(255) NOT NULL, phone VARCHAR(20) )');

        });

        it('should be return CREATE TABLE IF NOT EXISTS users ( type VARCHAR, CHECK(type=\'Image\' OR type= \'Location\'), isReply BOOLEAN, location POINT )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    type: DataType.ENUM(['Image', 'Location']),
                    isReply: DataType.BOOLEAN(),
                    location: DataType.POINT()
                }
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( type VARCHAR, CHECK(type=\'Image\' OR type= \'Location\'), isReply BOOLEAN, location POINT )');

        });


        it('should be return CREATE TABLE IF NOT EXISTS users ( id INT DEFAULT \'Low\' )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    id: DataType.INT([DEFAULT('$Low')])
                }
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( id INT DEFAULT \'Low\' )');

        });

        it('should be return CREATE TABLE IF NOT EXISTS users ( id INT(10) NOT NULL )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    id: DataType.INT([10, NOT_NULL])
                }
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( id INT(10) NOT NULL )');

        });

        it('should be return CREATE TABLE IF NOT EXISTS users ( type VARCHAR NOT NULL, CHECK(type=\'Image\' OR type= \'Location\') )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    type: DataType.ENUM([NOT_NULL, 'Image', 'Location'])
                }
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( type VARCHAR NOT NULL, CHECK(type=\'Image\' OR type= \'Location\') )');

        });

        it('should be return CREATE TABLE IF NOT EXISTS users ( price DECIMAL(9, 5) NOT NULL )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    price: DataType.DECIMAL([NOT_NULL, 9,5])
                }
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( price DECIMAL(9, 5) NOT NULL )');

        });

        it('should be return CREATE TABLE IF NOT EXISTS users ( price DECIMAL(9, 5) NOT NULL AUTO_INCREMENT )', () => {

            expect(BuilderFactory.createTable({
                table: 'users',
                column: {
                    price: DataType.DECIMAL([NOT_NULL, AUTO_INCREMENT, 9,5])
                }
            }, 'mssql')).toBe('CREATE TABLE IF NOT EXISTS users ( price DECIMAL(9, 5) NOT NULL AUTO_INCREMENT )');

        });

    });

});