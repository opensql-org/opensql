import keyword from '../../sql/Keyword';
import Buf from '../../fs/Buffer';
import {COP, Cnj} from '../../enum/helper';
import {FnResult, JoinObject, JsonChecker, JSONObject, QCheckValueInObject} from '../../typing';
import {Query} from '../../type/db/Query';
import Util from '../../util/Util';


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

function AS(data: string, columnName: string): string {

    let haveASKeyword = / AS /g.test(data);

    if (haveASKeyword)
        data = `, ${data}`;

    return `${data} AS ${columnName}`;
}

function BINARY(data: number): string {
    return `0x${data}`;
}

function VARBINARY(data: number): string {
    return `0x${data}`;
}


/**
 * @mixes 256 B
 */
function TINYBLOB(buf: Buffer): string {
    return Buf.toHex(buf);
}

/**
 * @mixes 64 KB
 */
function BLOB(buf: Buffer): string {
    return Buf.toHex(buf);
}

/**
 * @mixes 16 MIB
 */
function MEDIUMBLOB(buf: Buffer): string {
    return Buf.toHex(buf);
}

/**
 * @mixes 40 MIB
 */
function LONGBLOB(buf: Buffer): string {
    return Buf.toHex(buf);
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

function JSON(data: number[] | string[] | JSONObject | JSONObject[]) {
    let stringForArr = (data: any) => `[${Util.arrayToStringWithDoubleQuotationMark(data)}]`;

    if (!Util.isJsonObject(data) && !Util.isArrayOf(data, 'object'))
        return stringForArr(data);

    return Array.isArray(data) ? stringForArr(Util.jsonArrayToString(data)) : Util.jsonToString(data);
}

function QueryPoint(field: string): string {
    return `X(${field}) AS Lat , Y(${field}) AS Lon`;
}

function DEFAULT(value: any): string {
    if (typeof value === 'string' && value?.indexOf('$') === 0)
        return `DEFAULT '${value.replace('$', '')}'`;

    return `DEFAULT ${value}`;
}


function qCheck(value: QCheckValueInObject | string | number | JsonChecker, comparisonOperator?: COP, conjunction?: Cnj): FnResult {
    return {
        value: value,
        conjunctionType: !conjunction ? 'AND' : conjunction,
        comparisonOperator: !comparisonOperator ? '=' : comparisonOperator,
        type: 'qCheck'
    }
}

function jsonChecker(key: string, has: string): JsonChecker {
    return {
        key: key,
        has: has,
        type: 'JsonChecker'
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

function INNER(statements: JoinObject): FnResult {
    return {
        value: statements,
        type: 'INNER JOIN'
    }
}

function LEFT(statements: JoinObject): FnResult {
    return {
        value: statements,
        type: 'LEFT JOIN'
    }
}

function RIGHT(statements: JoinObject): FnResult {
    return {
        value: statements,
        type: 'RIGHT JOIN'
    }
}

function FULL(statements: JoinObject): FnResult {
    return {
        value: statements,
        type: 'FULL OUTER JOIN'
    }
}

/**
 * A candidate object is contained in a target object if and only
 * if for each key in the candidate there is a key with the same name
 * in the target and the value associated with
 * the candidate key is contained in the value associated with the target key.
 * @param target
 * @param candidate
 * @param path
 * @constructor
 */
function CONTAINS(target: JSONObject | string, candidate: JSONObject | string, path?: string): string {
    let jsonHandler = (data: JSONObject | string) => typeof data === 'string' ? data : Util.jsonToString(data),
        str = `'${jsonHandler(target)}', '${jsonHandler(candidate)}'`;


    return path ? `JSON_CONTAINS(${str}, '${path}')` : `JSON_CONTAINS(${str})`;
}

function NOW(): string {
    return 'NOW()';
}

function EXTRACT(data: JSONObject | number[] | string, ...path: string[]): string {
    let pathHandler = () => !Array.isArray(path) ? `'${path}'` : path.map(element => `'${element}'`).join(', ');

    if (typeof data === 'object')
        return `JSON_EXTRACT('${Util.jsonToString(data)}', ${pathHandler()})`;

    if (typeof data === 'string')
        return `JSON_EXTRACT(${data}, ${pathHandler()})`;

    return `JSON_EXTRACT('${data}', ${pathHandler()})`;
}

function UNQUOTE(extract: string): string {
    return `JSON_UNQUOTE(${extract})`;
}

function XML(data: string): string {
    return `XMLPARSE('${data}')`;
}

export {
    AS,
    IN,
    DAY,
    MAX,
    MIN,
    SUM,
    AVG,
    NOW,
    XML,
    LEFT,
    UUID,
    BLOB,
    JSON,
    LIKE,
    CAST,
    FULL,
    RIGHT,
    COUNT,
    UPPER,
    LOWER,
    INNER,
    ASCII,
    POINT,
    UNION,
    qCheck,
    BINARY,
    ATTACH,
    NOT_IN,
    SOURCE,
    UNQUOTE,
    EXTRACT,
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
    CONTAINS,
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
    jsonChecker,
    CHAR_LENGTH,
    NOT_BETWEEN,
    CURRENT_USER,
    CURRENT_DATE,
    CURRENT_TIME,
    UTC_TIMESTAMP,
    ST_GeomFromText
}