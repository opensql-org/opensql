import {CreateTable, FilterWithId, FnResult, Query, TargetTable} from './package/type/db/Query';
import {Cnj, COP, Operator, RefState} from './package/enum/helper';
import {NULL, NOT_NULL, AUTO_INCREMENT} from './package/sql/PubStr';
import {JoinObject, JsonChecker, JSONObject, QCheckValueInObject} from './package/typing';


declare module 'opensql' {

    export class OpenSql {

        constructor(url: string, option?: object)

        /**
         * Find all or specifce rows
         * @param {Query} query
         * @return {Promise<any>}
         */
        find(query: Query): Promise<any>;

        /**
         * Find one row
         * @param {Query} query
         * @return {Promise<any>}
         */
        findOne(query: Query): Promise<any>;

        /**
         * Find one by id
         * @param {Number} id
         * @param {FilterWithId} filter
         * @return {Promise<any>}
         */
        findById(id: number, filter: FilterWithId): Promise<any>;

        /**
         * FindMany method It is the same as the find method, with the difference that you don't need to write limit, you can only enter your desired limitation in the second parameter.
         * @param {Query} query
         * @param {Number} limit
         * @return {Promise<any>}
         */
        findMany(query: Query, limit?: number): Promise<any>;

        /**
         * Update all or specifce rows
         * @param {Query} query
         * @return {Promise<any>}
         */
        update(query: Query): Promise<any>;

        /**
         * Remove all or specifce rows
         * @param {Query} query
         * @return {Promise<any>}
         */
        remove(query: Query): Promise<any>;

        /**
         * AddOne row
         * @param {Query} query
         * @return {Promise<any>}
         */
        addOne(query: Query): Promise<any>;

        /**
         * Add row with find row
         * @param {String|TargetTable} targetTableName
         * @param {Query} query
         * @return {Promise<any>}
         */
        addWithFind(targetTableName: string | TargetTable, query: Query): Promise<any>;

        /**
         * Add many rows
         * @param {Query} query
         * @return {Promise<any>}
         */
        addMany(query: Query): Promise<any>;

        /**
         * Create database
         * @param {String} name
         * @param {String} set
         * @param {String} collate
         * @return {Promise<any>}
         */
        createDatabase(name: string, set?: string, collate?: string): Promise<any>;

        /**
         * Drop database
         * @param {String} name
         * @return {Promise<any>}
         */
        dropDatabase(name: string): Promise<any>;

        /**
         * Create table
         * @param {CreateTable} ct
         * @return {Promise<any>}
         */
        createTable(ct: CreateTable): Promise<any>;

        /**
         * Drop table
         * @param {String|String[]} tableName
         * @return {Promise<any>}
         */
        dropTable(tableName: string | string[]): Promise<any>;

        /**
         * Truncate table
         * @param {String} tableName
         * @return {Promise<any>}
         */
        truncateTable(tableName: string): Promise<any>;

        /**
         * Custom query
         * @param {String} sql
         * @param {any} injection
         * @return {Promise<any>}
         */
        query(sql: string, injection?: any): Promise<any>;

        /**
         * Disconnect
         * @return {void}
         */
        disconnect(): void;

    }

    const Cnj: Cnj

    const COP: COP

    const Operator: Operator

    const RefState: RefState

    const NULL: string;

    const NOT_NULL: string;

    const AUTO_INCREMENT: string;

    interface DataType {

        VARCHAR(data?: number | any[]): string;

        INT(data?: number | any[]): string;

        CHAR(data?: number | any[]): string;

        DATE(data?: any[]): string;

        DATETIME(data?: any[]): string;

        ENUM(data?: number | any[]): string;

        BOOLEAN(data?: number | any[]): string;

        POINT(data?: number | any[]): string;

        TINYINT(data?: number | any[]): string;

        SMALLINT(data?: number | any[]): string;

        MEDIUMINT(data?: number | any[]): string;

        BIGINT(data?: number | any[]): string;

        DECIMAL(data?: number | any[]): string;

        FLOAT(data?: number | any[]): string;

        DOUBLE(data?: number | any[]): string;

        REAL(data?: number | any[]): string;

        BIT(data?: number | any[]): string;

        SERIAL(data?: number | any[]): string;

        TIMESTAMP(data?: number | any[]): string;

        TIME(data?: number | any[]): string;

        YEAR(data?: number | any[]): string;

        TINYTEXT(data?: number | any[]): string;

        TEXT(data?: number | any[]): string;

        MEDIUMTEXT(data?: number | any[]): string;

        LONGTEXT(data?: number | any[]): string;

        BINARY(data?: number | any[]): string;

        VARBINARY(data?: number | any[]): string;

        TINYBLOB(data?: number | any[]): string;

        BLOB(data?: number | any[]): string;

        MEDIUMBLOB(data?: number | any[]): string;

        LONGBLOB(data?: number | any[]): string;

        SET(data?: number | any[]): string;

        MONEY(data: number | any[]): string;

        SMALLMONEY(data: number | any[]): string;

        SMALLDATETIME(data: number | any[]): string;

        DATETIME2(data: number | any[]): string;

        VARCHARMAX(data: number | any[]): string;

        NVARCHAR(data: number | any[]): string;

        NVARCHARMAX(data: number | any[]): string;

        NCHAR(data: number | any[]): string;

        NTEXT(data: number | any[]): string;

        VARBINARYMAX(data: number | any[]): string;

        XML(data: number | any[]): string;

        SMALLSERIAL(data: number | any[]): string;

        CHARACTERVARYING(data: number | any[]): string;

        BYTEA(data: number | any[]): string;

        CIDR(data: number | any[]): string;

        INET(data: number | any[]): string;

        MACADDR(data: number | any[]): string;

        MACADDR8(data: number | any[]): string;

        TSVECTOR(data: number | any[]): string;

        TSQUERY(data: number | any[]): string;

        JSON(data: number | any[]): string;

        UUID(data: number | any[]): string;

        POLYGON(data: number | any[]): string;

        GEOMETRY(data: number | any[]): string;

        LINESTRING(data: number | any[]): string;

    }

    export function AS(data: string, columnName: string): string;

    export function IN(arr: (string | number)[], conjunction?: Cnj): FnResult;

    export function NOW(): string;

    export function DAY(date: string): string;

    export function MAX(column: string): string;

    export function MIN(column: string): string;

    export function SUM(column: string): string;

    export function AVG(column: string): string;

    export function LEFT(query: Query): FnResult;

    export function UUID(): string;

    export function BLOB(buf: Buffer): string;

    export function JSON(data: number[] | string[] | JSONObject | JSONObject[]): string;

    export function LIKE(str: string, conjunction?: Cnj): FnResult;

    export function CAST(data: number | string, type: string): string;

    export function FULL(query: Query): FnResult;

    export function RIGHT(query: Query): FnResult;

    export function COUNT(column?: string | string[]): string;

    export function UPPER(string: string): string;

    export function LOWER(string: string): string;

    export function INNER(query: Query): FnResult;

    export function ASCII(char: string | number): string;

    export function POINT(x: number, y: number): string;

    export function UNION(query: Query): FnResult;

    export function qCheck(value: QCheckValueInObject | string | number, comparisonOperator?: COP, conjunction?: Cnj): FnResult;

    export function BINARY(data: number): string;

    export function ATTACH(arr: JSONObject | string[], conjunction?: Cnj): FnResult;

    export function NOT_IN(arr: (string | number)[], conjunction?: Cnj): FnResult;

    export function SOURCE(name: string, typeName?: string): string;

    export function POLYGON(str: string): string;

    export function DAYNAME(date: string): string;

    export function COMMENT(description: string): string;

    export function REVERSE(string: string): string;

    export function DEFAULT(value: string | number | boolean): string;

    export function BETWEEN(first: string | number, second: string | number, conjunction?: Cnj): FnResult;

    export function UTC_DATE(): string;

    export function NOT_LIKE(str: string, conjunction?: Cnj): FnResult;

    export function UTC_TIME(): string;

    export function XML(data: string): string;

    export function UNQUOTE(extract: string): string;

    export function CONTAINS(target: JSONObject | string, candidate: JSONObject | string, path?: string): string;

    export function EXTRACT(data: JSONObject | number[] | string, ...path: string[]): string;

    export function jsonChecker(key: string, has: string): JsonChecker;

    export function TINYBLOB(buf: Buffer): string;

    export function LONGBLOB(buf: Buffer): string;

    export function CONCAT_WS(str: string, arr: string[], column?: string): string;

    export function Condition(leftStatement: string, rightStatement: string | number, comparisonOperator?: COP, conjunction?: Cnj): FnResult;

    export function UNION_ALL(query: Query): FnResult;

    export function VARBINARY(data: number): string;

    export function DAYOFWEEK(date: string): string;

    export function DAYOFYEAR(date: string): string;

    export function QueryPoint(field: string): string;

    export function DAYOFMONTH(date: string): string;

    export function LINESTRING(str: string | string[]): string;

    export function UUID_SHORT(): string;

    export function MEDIUMBLOB(buf: Buffer): string;

    export function CHAR_LENGTH(data: string | number): string;

    export function NOT_BETWEEN(first: string | number, second: string | number, conjunction?: Cnj): FnResult;

    export function CURRENT_USER(): string;

    export function CURRENT_DATE(): string;

    export function CURRENT_TIME(): string;

    export function UTC_TIMESTAMP(): string;

    export function ST_GeomFromText(string: string): string;

}