import keyword from '../../sql/Keyword';
import Buffer from '../../fs/Buffer';
import {COP, Cnj} from '../../enum/helper';
import {FnResult, JSONObject, QCheckValueInObject} from '../../typing';
import {Query} from '../../type/db/Query';


function COMMENT(description: string): string {
    return `${keyword.COMMENT} '${description}'`;
}

function ASCII(char: string): string {
    return `ASCII(${char})`;
}

function CHAR_LENGTH(string: string | number): string {
    let str = `CHAR_LENGTH(${string})`;

    if (typeof string === 'string')
        str = `CHAR_LENGTH("${string}")`;

    return str;
}

function DAYNAME(string: string): string {
    return `DAYNAME("${string}")`;
}

function DAYOFMONTH(string: string): string {
    return `DAYOFMONTH("${string}")`;
}

function DAYOFWEEK(string: string): string {
    return `DAYOFWEEK("${string}")`;
}

function DAYOFYEAR(string: string): string {
    return `DAYOFYEAR("${string}")`;
}

function DAY(string: string): string {
    return `DAY("${string}")`;
}

function REVERSE(string: string): string {
    return `REVERSE("${string}")`;
}

function LOWER(string: string): string {
    return `LOWER("${string}")`;
}

function UPPER(string: string): string {
    return `UPPER("${string}")`;
}

function ST_GeomFromText(string: string): string {
    return `ST_GeomFromText('${string}')`;
}

function UUID(): string {
    return 'UUID()';
}

function UUID_SHORT(): string {
    return 'UUID_SHORT()';
}

function UTC_DATE(): string {
    return 'UTC_DATE()';
}

function UTC_TIME(): string {
    return 'UTC_TIME()';
}

function UTC_TIMESTAMP(): string {
    return 'UTC_TIME()';
}


function CURRENT_DATE(): string {
    return keyword.CURRENT_DATE;
}

function CURRENT_TIME(): string {
    return keyword.CURRENT_TIME;
}

function CURRENT_USER(): string {
    return keyword.CURRENT_USER;
}

function AS(data: string, columnName?: string): string {

    let haveASKeyword = / AS /g.test(data);

    if (haveASKeyword)
        data = `, ${data}`;

    if (!columnName)
        return data;

    return `${data} AS ${columnName}`;
}

function BINARY(data: number) {
    return `0x${data}`;
}

function VARBINARY(data: number) {
    return `0x${data}`;
}


/**
 * @mixes 256 B
 */
function TINYBLOB(buf: Buffer): string {
    return Buffer.toHex(buf);
}

/**
 * @mixes 64 KB
 */
function BLOB(buf: Buffer): string {
    return Buffer.toHex(buf);
}

/**
 * @mixes 16 MIB
 */
function MEDIUMBLOB(buf: Buffer): string {
    return Buffer.toHex(buf);
}

/**
 * @mixes 40 MIB
 */
function LONGBLOB(buf: Buffer): string {
    return Buffer.toHex(buf);
}

function POINT(x: number, y: number): string {
    return `POINT(${x}, ${y})`;
}

function LINESTRING(str: string): string {
    return `LINESTRING(${str})`;
}

function POLYGON(str: string): string {
    return `POLYGON((${str}))`;
}

function JSON(arr: number[] | string[]) {
    return `'[${arr.map(element => `"${element}"`)}]'`;
}

function QueryPoint(field: string): string {
    return `X(${field}) AS Lat , Y(${field}) AS Lon`;
}

function DEFAULT(value: any): string {
    if (typeof value === 'string' && value?.indexOf('$') === 0)
        return `DEFAULT '${value.replace('$', '')}'`;

    return `DEFAULT ${value}`;
}


function qCheck(value: QCheckValueInObject | string | number, comparisonOperator?: COP, conjunction?: Cnj): FnResult {
    return {
        value: value,
        conjunctionType: !conjunction ? 'AND' : conjunction,
        comparisonOperator: !comparisonOperator ? '=' : comparisonOperator,
        type: 'qCheck'
    }
}

/**
 * @type string
 * @param leftStatement
 * @type string
 * @param rightStatement
 * @type COP
 * @param comparisonOperator
 * @type Cnj
 * @param conjunction
 * Used for $having object
 */
function Condition(leftStatement: string, rightStatement: string | number, comparisonOperator?: COP, conjunction?: Cnj): FnResult {
    return {
        value: {
            leftStatement: leftStatement,
            rightStatement: rightStatement
        },
        conjunctionType: !conjunction ? 'AND' : conjunction,
        comparisonOperator: !comparisonOperator ? '=' : comparisonOperator,
        type: 'Condition'
    };
}

function fnInHelper(arr: string[] | number[], type: string, conjunction?: Cnj): FnResult {
    return {
        value: arr,
        type: type,
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}

function IN(arr: string[] | number[], conjunction?: Cnj): FnResult {
    return fnInHelper(arr, 'IN', conjunction);
}

function NOT_IN(arr: string[] | number[], conjunction?: Cnj): FnResult {
    return fnInHelper(arr, 'NOT_IN', conjunction);
}

function fnBetweenHelper(first: string | number, second: string | number, type: string, conjunction?: Cnj): FnResult {
    return {
        value: {
            first: first,
            second: second
        },
        type: type,
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}

function NOT_BETWEEN(first: string | number, second: string | number, conjunction?: Cnj): FnResult {
    return fnBetweenHelper(first, second, 'NOT_BETWEEN', conjunction);
}

function BETWEEN(first: string | number, second: string | number, conjunction?: Cnj): FnResult {
    return fnBetweenHelper(first, second, 'BETWEEN', conjunction);
}

function fnLikeHelper(str: string, type: string, conjunction?: Cnj): FnResult {
    return {
        value: str,
        type: type,
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}

function LIKE(str: string, conjunction?: Cnj): FnResult {
    return fnLikeHelper(str, 'LIKE', conjunction);
}

function NOT_LIKE(str: string, conjunction?: Cnj): FnResult {
    return fnLikeHelper(str, 'NOT_LIKE', conjunction);
}


function CAST(data: number | string, type: string): string {
    let isString = typeof data === 'string';

    if (isString)
        return `CAST("${data}" AS ${type})`;

    return `CAST(${data} AS ${type})`;
}

function COUNT(column?: string | string[]): string {
    if (Array.isArray(column))
        return `COUNT(DISTINCT ${column})`;

    return !column ? 'COUNT(*) AS size' : `COUNT(${column})`;
}

function SOURCE(name: string, typeName?: string): string {
    return !typeName ? `\`${name}\` AS Source` : `\`${name}\` AS ${typeName}`;
}

function ATTACH(arr: JSONObject | string[], conjunction?: Cnj): FnResult {
    return {
        value: arr,
        type: 'ATTACH',
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}

function fnUnionHelper(json: Query, type: string): FnResult {
    return {
        value: json,
        type: type
    };
}

function UNION(json: Query): FnResult {
    return fnUnionHelper(json, 'UNION');
}

function UNION_ALL(json: Query): FnResult {
    return fnUnionHelper(json, 'UNION_ALL');
}

function fnColumnHelper(column: string, fnType: string): string {
    return `${fnType}(${column})`;
}

function MIN(column: string): string {
    return fnColumnHelper(column, 'MIN');
}

function MAX(column: string): string {
    return fnColumnHelper(column, 'MAX');
}

function SUM(column: string): string {
    return fnColumnHelper(column, 'SUM');
}

function AVG(column: string): string {
    return fnColumnHelper(column, 'AVG');
}

function CONCAT_WS(str: string, arr: string[], column: string): string {
    return `CONCAT_WS("${str}", ${arr.toString()}) AS ${column}`;
}

export {
    AS,
    IN,
    DAY,
    MAX,
    MIN,
    SUM,
    AVG,
    UUID,
    BLOB,
    JSON,
    LIKE,
    CAST,
    COUNT,
    UPPER,
    LOWER,
    ASCII,
    POINT,
    UNION,
    qCheck,
    BINARY,
    ATTACH,
    NOT_IN,
    SOURCE,
    POLYGON,
    DAYNAME,
    COMMENT,
    REVERSE,
    DEFAULT,
    BETWEEN,
    UTC_DATE,
    NOT_LIKE,
    UTC_TIME,
    TINYBLOB,
    LONGBLOB,
    CONCAT_WS,
    Condition,
    UNION_ALL,
    VARBINARY,
    DAYOFWEEK,
    DAYOFYEAR,
    QueryPoint,
    DAYOFMONTH,
    LINESTRING,
    UUID_SHORT,
    MEDIUMBLOB,
    CHAR_LENGTH,
    NOT_BETWEEN,
    CURRENT_USER,
    CURRENT_DATE,
    CURRENT_TIME,
    UTC_TIMESTAMP,
    ST_GeomFromText
}