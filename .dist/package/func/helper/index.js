"use strict";
exports.__esModule = true;
exports.CHAR_LENGTH = exports.MEDIUMBLOB = exports.UUID_SHORT = exports.LINESTRING = exports.DAYOFMONTH = exports.QueryPoint = exports.DAYOFYEAR = exports.DAYOFWEEK = exports.VARBINARY = exports.UNION_ALL = exports.Condition = exports.CONCAT_WS = exports.LONGBLOB = exports.TINYBLOB = exports.UTC_TIME = exports.NOT_LIKE = exports.UTC_DATE = exports.BETWEEN = exports.DEFAULT = exports.REVERSE = exports.COMMENT = exports.DAYNAME = exports.POLYGON = exports.SOURCE = exports.NOT_IN = exports.ATTACH = exports.BINARY = exports.qCheck = exports.UNION = exports.POINT = exports.ASCII = exports.INNER = exports.LOWER = exports.UPPER = exports.COUNT = exports.RIGHT = exports.FULL = exports.CAST = exports.LIKE = exports.JSON = exports.BLOB = exports.UUID = exports.LEFT = exports.AVG = exports.SUM = exports.MIN = exports.MAX = exports.DAY = exports.IN = exports.AS = void 0;
exports.ST_GeomFromText = exports.UTC_TIMESTAMP = exports.CURRENT_TIME = exports.CURRENT_DATE = exports.CURRENT_USER = exports.NOT_BETWEEN = void 0;
var Keyword_1 = require("../../sql/Keyword");
var Buffer_1 = require("../../fs/Buffer");
function COMMENT(description) {
    return "".concat(Keyword_1["default"].COMMENT, " '").concat(description, "'");
}
exports.COMMENT = COMMENT;
function ASCII(char) {
    return "ASCII(".concat(char, ")");
}
exports.ASCII = ASCII;
function CHAR_LENGTH(string) {
    var str = "CHAR_LENGTH(".concat(string, ")");
    if (typeof string === 'string')
        str = "CHAR_LENGTH(\"".concat(string, "\")");
    return str;
}
exports.CHAR_LENGTH = CHAR_LENGTH;
function DAYNAME(string) {
    return "DAYNAME(\"".concat(string, "\")");
}
exports.DAYNAME = DAYNAME;
function DAYOFMONTH(string) {
    return "DAYOFMONTH(\"".concat(string, "\")");
}
exports.DAYOFMONTH = DAYOFMONTH;
function DAYOFWEEK(string) {
    return "DAYOFWEEK(\"".concat(string, "\")");
}
exports.DAYOFWEEK = DAYOFWEEK;
function DAYOFYEAR(string) {
    return "DAYOFYEAR(\"".concat(string, "\")");
}
exports.DAYOFYEAR = DAYOFYEAR;
function DAY(string) {
    return "DAY(\"".concat(string, "\")");
}
exports.DAY = DAY;
function REVERSE(string) {
    return "REVERSE(\"".concat(string, "\")");
}
exports.REVERSE = REVERSE;
function LOWER(string) {
    return "LOWER(\"".concat(string, "\")");
}
exports.LOWER = LOWER;
function UPPER(string) {
    return "UPPER(\"".concat(string, "\")");
}
exports.UPPER = UPPER;
function ST_GeomFromText(string) {
    return "ST_GeomFromText('".concat(string, "')");
}
exports.ST_GeomFromText = ST_GeomFromText;
function UUID() {
    return 'UUID()';
}
exports.UUID = UUID;
function UUID_SHORT() {
    return 'UUID_SHORT()';
}
exports.UUID_SHORT = UUID_SHORT;
function UTC_DATE() {
    return 'UTC_DATE()';
}
exports.UTC_DATE = UTC_DATE;
function UTC_TIME() {
    return 'UTC_TIME()';
}
exports.UTC_TIME = UTC_TIME;
function UTC_TIMESTAMP() {
    return 'UTC_TIME()';
}
exports.UTC_TIMESTAMP = UTC_TIMESTAMP;
function CURRENT_DATE() {
    return Keyword_1["default"].CURRENT_DATE;
}
exports.CURRENT_DATE = CURRENT_DATE;
function CURRENT_TIME() {
    return Keyword_1["default"].CURRENT_TIME;
}
exports.CURRENT_TIME = CURRENT_TIME;
function CURRENT_USER() {
    return Keyword_1["default"].CURRENT_USER;
}
exports.CURRENT_USER = CURRENT_USER;
function AS(data, columnName) {
    var haveASKeyword = / AS /g.test(data);
    if (haveASKeyword)
        data = ", ".concat(data);
    if (!columnName)
        return data;
    return "".concat(data, " AS ").concat(columnName);
}
exports.AS = AS;
function BINARY(data) {
    return "0x".concat(data);
}
exports.BINARY = BINARY;
function VARBINARY(data) {
    return "0x".concat(data);
}
exports.VARBINARY = VARBINARY;
/**
 * @mixes 256 B
 */
function TINYBLOB(buf) {
    return Buffer_1["default"].toHex(buf);
}
exports.TINYBLOB = TINYBLOB;
/**
 * @mixes 64 KB
 */
function BLOB(buf) {
    return Buffer_1["default"].toHex(buf);
}
exports.BLOB = BLOB;
/**
 * @mixes 16 MIB
 */
function MEDIUMBLOB(buf) {
    return Buffer_1["default"].toHex(buf);
}
exports.MEDIUMBLOB = MEDIUMBLOB;
/**
 * @mixes 40 MIB
 */
function LONGBLOB(buf) {
    return Buffer_1["default"].toHex(buf);
}
exports.LONGBLOB = LONGBLOB;
function POINT(x, y) {
    return "POINT(".concat(x, ", ").concat(y, ")");
}
exports.POINT = POINT;
function LINESTRING(str) {
    return "LINESTRING(".concat(str, ")");
}
exports.LINESTRING = LINESTRING;
function POLYGON(str) {
    return "POLYGON((".concat(str, "))");
}
exports.POLYGON = POLYGON;
function JSON(arr) {
    return "'[".concat(arr.map(function (element) { return "\"".concat(element, "\""); }), "]'");
}
exports.JSON = JSON;
function QueryPoint(field) {
    return "X(".concat(field, ") AS Lat , Y(").concat(field, ") AS Lon");
}
exports.QueryPoint = QueryPoint;
function DEFAULT(value) {
    if (typeof value === 'string' && (value === null || value === void 0 ? void 0 : value.indexOf('$')) === 0)
        return "DEFAULT '".concat(value.replace('$', ''), "'");
    return "DEFAULT ".concat(value);
}
exports.DEFAULT = DEFAULT;
function qCheck(value, comparisonOperator, conjunction) {
    return {
        value: value,
        conjunctionType: !conjunction ? 'AND' : conjunction,
        comparisonOperator: !comparisonOperator ? '=' : comparisonOperator,
        type: 'qCheck'
    };
}
exports.qCheck = qCheck;
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
function Condition(leftStatement, rightStatement, comparisonOperator, conjunction) {
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
exports.Condition = Condition;
function fnInHelper(arr, type, conjunction) {
    return {
        value: arr,
        type: type,
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}
function IN(arr, conjunction) {
    return fnInHelper(arr, 'IN', conjunction);
}
exports.IN = IN;
function NOT_IN(arr, conjunction) {
    return fnInHelper(arr, 'NOT_IN', conjunction);
}
exports.NOT_IN = NOT_IN;
function fnBetweenHelper(first, second, type, conjunction) {
    return {
        value: {
            first: first,
            second: second
        },
        type: type,
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}
function NOT_BETWEEN(first, second, conjunction) {
    return fnBetweenHelper(first, second, 'NOT_BETWEEN', conjunction);
}
exports.NOT_BETWEEN = NOT_BETWEEN;
function BETWEEN(first, second, conjunction) {
    return fnBetweenHelper(first, second, 'BETWEEN', conjunction);
}
exports.BETWEEN = BETWEEN;
function fnLikeHelper(str, type, conjunction) {
    return {
        value: str,
        type: type,
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}
function LIKE(str, conjunction) {
    return fnLikeHelper(str, 'LIKE', conjunction);
}
exports.LIKE = LIKE;
function NOT_LIKE(str, conjunction) {
    return fnLikeHelper(str, 'NOT_LIKE', conjunction);
}
exports.NOT_LIKE = NOT_LIKE;
function CAST(data, type) {
    var isString = typeof data === 'string';
    if (isString)
        return "CAST(\"".concat(data, "\" AS ").concat(type, ")");
    return "CAST(".concat(data, " AS ").concat(type, ")");
}
exports.CAST = CAST;
function COUNT(column) {
    if (Array.isArray(column))
        return "COUNT(DISTINCT ".concat(column, ")");
    return !column ? 'COUNT(*) AS size' : "COUNT(".concat(column, ")");
}
exports.COUNT = COUNT;
function SOURCE(name, typeName) {
    return !typeName ? "`".concat(name, "` AS Source") : "`".concat(name, "` AS ").concat(typeName);
}
exports.SOURCE = SOURCE;
function ATTACH(arr, conjunction) {
    return {
        value: arr,
        type: 'ATTACH',
        conjunctionType: !conjunction ? 'AND' : conjunction
    };
}
exports.ATTACH = ATTACH;
function fnUnionHelper(json, type) {
    return {
        value: json,
        type: type
    };
}
function UNION(json) {
    return fnUnionHelper(json, 'UNION');
}
exports.UNION = UNION;
function UNION_ALL(json) {
    return fnUnionHelper(json, 'UNION_ALL');
}
exports.UNION_ALL = UNION_ALL;
function fnColumnHelper(column, fnType) {
    return "".concat(fnType, "(").concat(column, ")");
}
function MIN(column) {
    return fnColumnHelper(column, 'MIN');
}
exports.MIN = MIN;
function MAX(column) {
    return fnColumnHelper(column, 'MAX');
}
exports.MAX = MAX;
function SUM(column) {
    return fnColumnHelper(column, 'SUM');
}
exports.SUM = SUM;
function AVG(column) {
    return fnColumnHelper(column, 'AVG');
}
exports.AVG = AVG;
function CONCAT_WS(str, arr, column) {
    return "CONCAT_WS(\"".concat(str, "\", ").concat(arr.toString(), ") AS ").concat(column);
}
exports.CONCAT_WS = CONCAT_WS;
function INNER(statements) {
    return {
        value: statements,
        type: 'INNER JOIN'
    };
}
exports.INNER = INNER;
function LEFT(statements) {
    return {
        value: statements,
        type: 'LEFT JOIN'
    };
}
exports.LEFT = LEFT;
function RIGHT(statements) {
    return {
        value: statements,
        type: 'RIGHT JOIN'
    };
}
exports.RIGHT = RIGHT;
function FULL(statements) {
    return {
        value: statements,
        type: 'FULL OUTER JOIN'
    };
}
exports.FULL = FULL;
