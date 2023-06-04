import keyword from '../../sql/Keyword';
import Buf from '../../fs/Buffer';
import {COP, Cnj} from '../../enum/helper';
import {JsonChecker, JSONObject, QCheckValueInObject} from '../../typing';
import {FnResult, Query} from '../../type/db/Query';
import Util from '../../util/Util';


function COMMENT(description: string): string {
    return `${keyword.COMMENT} '${description}'`;
}

function ASCII(char: string | number): string {
    let haveSpace = typeof char === 'string' && /\u0020/.test(char);

    return `ASCII(${haveSpace ? `'${char}'` : char})`;
}

function CHAR_LENGTH(data: string | number): string {
    let isString = typeof data === 'string';

    return `CHAR_LENGTH(${isString ? data : `"${data}"`})`;
}

function DAYNAME(date: string): string {
    let hasNowWord = date === 'NOW()';

    return `DAYNAME(${hasNowWord ? date : `"${date}"`})`;
}

function DAYOFMONTH(date: string): string {
    let hasNowWord = date === 'NOW()';

    return `DAYOFMONTH(${hasNowWord ? date : `"${date}"`})`;
}

function DAYOFWEEK(date: string): string {
    let hasNowWord = date === 'NOW()';

    return `DAYOFWEEK(${hasNowWord ? date : `"${date}"`})`;
}

function DAYOFYEAR(date: string): string {
    let hasNowWord = date === 'NOW()';

    return `DAYOFYEAR(${hasNowWord ? date : `"${date}"`})`;
}

function DAY(date: string): string {
    let hasNowWord = date === 'NOW()';

    return `DAY(${hasNowWord ? date : `"${date}"`})`;
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

function LINESTRING(str: string | string[]): string {
    return `LINESTRING(${str})`;
}

function POLYGON(str: string): string {
    let haveParentheses = str.indexOf('(', 0) === 0;

    return `POLYGON(${haveParentheses ? str : `(${str})`})`;
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

function DEFAULT(value: string | number | boolean): string {
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
 * Using in $having object
 * @param {String} leftStatement
 * @param {String} rightStatement
 * @param {COP} comparisonOperator
 * @param {Cnj} conjunction
 * @return {FnResult}
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

function fnInHelper(arr: (string | number)[], type: string, conjunction?: Cnj): FnResult {
    return {
        value: arr,
        type: type,
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}

function IN(arr: (string | number)[], conjunction?: Cnj): FnResult {
    return fnInHelper(arr, 'IN', conjunction);
}

function NOT_IN(arr: (string | number)[], conjunction?: Cnj): FnResult {
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

    return `CAST(${isString ? data : `"${data}"`} AS ${type})`;
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

function fnUnionHelper(query: Query, type: string): FnResult {
    return {
        value: query,
        type: type
    };
}

function UNION(query: Query): FnResult {
    return fnUnionHelper(query, 'UNION');
}

function UNION_ALL(query: Query): FnResult {
    return fnUnionHelper(query, 'UNION_ALL');
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

function CONCAT_WS(str: string, arr: string[], column?: string): string {
    return `CONCAT_WS("${str}", ${arr.map(element => `"${element}"`).join(', ')}) ${column ? `AS ${column}` : ''}`.trim();
}

function INNER(query: Query): FnResult {
    return {
        value: query,
        type: 'INNER JOIN'
    }
}

function LEFT(query: Query): FnResult {
    return {
        value: query,
        type: 'LEFT JOIN'
    }
}

function RIGHT(query: Query): FnResult {
    return {
        value: query,
        type: 'RIGHT JOIN'
    }
}

function FULL(query: Query): FnResult {
    return {
        value: query,
        type: 'FULL OUTER JOIN'
    }
}

/**
 * A candidate object is contained in a target object if and only
 * if for each key in the candidate there is a key with the same name
 * in the target and the value associated with
 * the candidate key is contained in the value associated with the target key.
 * @param {JSONObject|String} target
 * @param {JSONObject|String} candidate
 * @param {String} path
 * @return {String}
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
    let pathHandler = () => !Array.isArray(path) ? `'${path}'` : path.map(element => `'${element}'`).join(', '),
        isObject = typeof data === 'object',
        isString = typeof data === 'string';

    return `JSON_EXTRACT(${isObject ? `'${Util.jsonToString(data)}'` : isString ? data : `'${data}'`}, ${pathHandler()})`;
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