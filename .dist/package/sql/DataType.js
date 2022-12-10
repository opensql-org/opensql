"use strict";
exports.__esModule = true;
var Types_1 = require("./Types");
var Util_1 = require("../../src/util/Util");
var Utils = Util_1["default"].getInstance();
exports["default"] = {
    VARCHAR: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].varchar, data);
    },
    INT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].int, data);
    },
    CHAR: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].char, data);
    },
    DATE: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].date, data);
    },
    DATETIME: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].datetime, data);
    },
    ENUM: function (data) {
        return Utils.dataTypeHandler(Types_1["default"]["enum"], data);
    },
    BOOLEAN: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].boolean, data);
    },
    POINT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].point, data);
    },
    TINYINT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].tinyint, data);
    },
    SMALLINT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].smallint, data);
    },
    MEDIUMINT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].mediumint, data);
    },
    BIGINT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].bigint, data);
    },
    DECIMAL: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].decimal, data);
    },
    FLOAT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].float, data);
    },
    DOUBLE: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].double, data);
    },
    REAL: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].real, data);
    },
    BIT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].bit, data);
    },
    SERIAL: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].serial, data);
    },
    TIMESTAMP: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].timestamp, data);
    },
    TIME: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].time, data);
    },
    YEAR: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].year, data);
    },
    TINYTEXT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].tinytext, data);
    },
    TEXT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].text, data);
    },
    MEDIUMTEXT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].mediumtext, data);
    },
    LONGTEXT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].longtext, data);
    },
    BINARY: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].binary, data);
    },
    VARBINARY: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].varBinary, data);
    },
    TINYBLOB: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].tinyblob, data);
    },
    BLOB: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].blob, data);
    },
    MEDIUMBLOB: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].mediumblob, data);
    },
    LONGBLOB: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].longblob, data);
    },
    SET: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].set, data);
    },
    MONEY: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].money, data);
    },
    SMALLMONEY: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].smallMoney, data);
    },
    SMALLDATETIME: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].smallDateTime, data);
    },
    DATETIME2: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].datetime2, data);
    },
    VARCHARMAX: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].varcharMax, data);
    },
    NVARCHAR: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].nvarchar, data);
    },
    NVARCHARMAX: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].nVarcharMax, data);
    },
    NCHAR: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].nChar, data);
    },
    NTEXT: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].nText, data);
    },
    VARBINARYMAX: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].varbinaryMax, data);
    },
    XML: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].xml, data);
    },
    SMALLSERIAL: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].smallSerial, data);
    },
    CHARACTERVARYING: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].characterVarying, data);
    },
    BYTEA: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].bytea, data);
    },
    CIDR: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].cidr, data);
    },
    INET: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].inet, data);
    },
    MACADDR: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].macaddr, data);
    },
    MACADDR8: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].macaddr8, data);
    },
    TSVECTOR: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].tsVector, data);
    },
    TSQUERY: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].tsQuery, data);
    },
    JSON: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].json, data);
    },
    UUID: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].uuid, data);
    },
    POLYGON: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].polygon, data);
    },
    GEOMETRY: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].geometry, data);
    },
    LINESTRING: function (data) {
        return Utils.dataTypeHandler(Types_1["default"].linestring, data);
    }
};
