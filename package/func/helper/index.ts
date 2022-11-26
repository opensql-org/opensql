import keyword from '../../sql/Keyword';
import Buffer from '../../fs/Buffer';
import {COP, Cnj} from '../../enum/helper';
import {FnResult, JSONObject, Conjunction, QCheckValueInObject} from '../../typing';
import {Query} from '../../type/db/Query';


let
    /**
     * Saving state of multi conjunction : AND , OR with object
     * In array we have JSOONObject[] some thing like this
     *
     * @example
     * {
     *     username: "root",
     *     name: LIKE('Admin%')
     * }
     */
    stateOfMultiConjunction: JSONObject[] = [];


function COMMENT(description: string): string {
    return keyword.COMMENT + ` '${description}'`;
}

function ASCII(char: string): string {
    return `ASCII(${char})`;
}

function CHAR_LENGTH(string: string | number): string {
    let str = `ASCII(${string})`;

    if (typeof string === 'string')
        str = `ASCII("${string}")`;

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

function DEFAULT(value: string): string {
    if (value.indexOf('$') === 0)
        return `DEFAULT '${value.replace('$', '')}'`;

    return `DEFAULT ${value}`;
}


function qCheck(value: QCheckValueInObject | string | number, comparisonOperator?: COP, conjunction?: Cnj): FnResult {
    let query: FnResult = {
        value: value,
        conjunctionType: 'AND',
        comparisonOperator: !comparisonOperator ? '=' : comparisonOperator,
        type: 'qCheck'
    };

    if (conjunction)
        query.conjunctionType = conjunction;

    return query;
}

function conjunctionHandler(json: JSONObject, defaultConjunction: string, conjunction?: Conjunction): FnResult {
    let finalJson = stateOfMultiConjunction;
    if (!conjunction) {
        stateOfMultiConjunction = [];
        return {
            value: finalJson,
            type: 'conjunctionHandler',
            conjunctionType: defaultConjunction
        };
    }
    stateOfMultiConjunction.push({data: json, defaultConjunction: defaultConjunction});
}

function OR(json: JSONObject, conjunction?: Conjunction): FnResult {
    return conjunctionHandler(json, 'OR', conjunction);
}


function AND(json: JSONObject, conjunction?: Conjunction): FnResult {
    return conjunctionHandler(json, 'AND', conjunction);
}

function fnInHelper(arr: string[] | number[], type: string, conjunction?: Cnj): FnResult {
    let newArr: any[] = arr.map(element => {
        if (typeof element === 'string')
            return `"${element}"`;
        return element;
    });
    let query: FnResult = {
        value: {
            arr: newArr
        },
        type: type,
        conjunctionType: 'AND'
    };
    if (conjunction)
        query.conjunctionType = conjunction;

    return query;
}

function IN(arr: string[] | number[], type: string, conjunction?: Cnj): FnResult {
    return fnInHelper(arr, 'IN', conjunction);
}

function NOT_IN(arr: string[] | number[], type: string, conjunction?: Cnj): FnResult {
    return fnInHelper(arr, 'NOT_IN', conjunction);
}

function fnBetweenHelper(first: string | number, second: string | number, type: string, conjunction?: Cnj): FnResult {
    let query: FnResult = {
        value: {
            first: typeof first === 'string' ? `"${first}"` : first,
            second: typeof second === 'string' ? `"${second}"` : second
        },
        type: type,
        conjunctionType: 'AND'
    };
    if (conjunction)
        query.conjunctionType = conjunction;
    return query;
}

function NOT_BETWEEN(first: string | number, second: string | number, conjunction?: Cnj): FnResult {
    return fnBetweenHelper(first, second, 'NOT_BETWEEN', conjunction);
}

function BETWEEN(first: string | number, second: string | number, conjunction?: Cnj): FnResult {
    return fnBetweenHelper(first, second, 'BETWEEN', conjunction);
}

function fnLikeHelper(str: string, type: string, conjunction?: Cnj): FnResult {
    let query: FnResult = {
        value: `"${str}"`,
        type: type,
        conjunctionType: 'AND'
    };
    if (conjunction)
        query.conjunctionType = conjunction;
    return query;
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

function ATTACH(arr: string[], conjunction?: Cnj): FnResult {
    let query: FnResult = {
        value: arr,
        type: 'ATTACH',
        conjunctionType: 'AND'
    };
    if (conjunction)
        query.conjunctionType = conjunction;
    return query;
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

function GROUP(data: string | string[]): FnResult {
    let query: FnResult = {
        value: data,
        type: 'GROUP'
    };
    if (Array.isArray(data))
        return query;
    return query;
}

export {
    AS,
    OR,
    IN,
    AND,
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
    GROUP,
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