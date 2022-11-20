import keyword from '../../sql/Keyword';
import Buffer from '../../fs/Buffer';

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

export {
    AS,
    DAY,
    UUID,
    BLOB,
    JSON,
    UPPER,
    LOWER,
    ASCII,
    POINT,
    BINARY,
    POLYGON,
    DAYNAME,
    COMMENT,
    REVERSE,
    DEFAULT,
    UTC_DATE,
    UTC_TIME,
    TINYBLOB,
    LONGBLOB,
    VARBINARY,
    DAYOFWEEK,
    DAYOFYEAR,
    QueryPoint,
    DAYOFMONTH,
    LINESTRING,
    UUID_SHORT,
    MEDIUMBLOB,
    CHAR_LENGTH,
    CURRENT_USER,
    CURRENT_DATE,
    CURRENT_TIME,
    UTC_TIMESTAMP,
    ST_GeomFromText
}