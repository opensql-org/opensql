"use strict";
exports.__esModule = true;
var characterVarying_1 = require("./characterVarying");
var networkAddress_1 = require("./networkAddress");
var varbinaryMax_1 = require("./varbinaryMax");
var smallSerial_1 = require("./smallSerial");
var varcharMax_1 = require("./varcharMax");
var textSearch_1 = require("./textSearch");
var lineString_1 = require("./lineString");
var Types_1 = require("../../../sql/Types");
var bigSerial_1 = require("./bigSerial");
var dateTime_1 = require("./dateTime");
var polygon_1 = require("./polygon");
var serial_1 = require("./serial");
var money_1 = require("./money");
var ntext_1 = require("./ntext");
var bytea_1 = require("./bytea");
var json_1 = require("./json");
var uuid_1 = require("./uuid");
var xml_1 = require("./xml");
var enum_1 = require("./enum");
function default_1(dbName, str) {
    var dataType = str.split(' ')[1].split('(')[0].toLowerCase(), mapOfDataTypeInstance = {
        xml: function () { var _a; return (_a = xml_1.xml[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].xml); },
        "enum": function () { var _a; return (_a = enum_1.Enum[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"]["enum"]); },
        uuid: function () { var _a; return (_a = uuid_1.uuid[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].uuid); },
        json: function () { var _a; return (_a = json_1.json[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].json); },
        money: function () { var _a; return (_a = money_1.money[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].money); },
        ntext: function () { var _a; return (_a = ntext_1.ntext[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].nText); },
        bytea: function () { var _a; return (_a = bytea_1.bytea[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].bytea); },
        serial: function () { var _a; return (_a = serial_1.serial[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].serial); },
        nchar: function () { var _a; return (_a = varcharMax_1.varcharMax[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].nChar); },
        polygon: function () { var _a; return (_a = polygon_1.polygon[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].polygon); },
        cidr: function () { var _a; return (_a = networkAddress_1.networkAddress[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].cidr); },
        inet: function () { var _a; return (_a = networkAddress_1.networkAddress[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].inet); },
        tsquery: function () { var _a; return (_a = textSearch_1.textSearch[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].tsQuery); },
        smallmoney: function () { var _a; return (_a = money_1.money[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].smallMoney); },
        tsvector: function () { var _a; return (_a = textSearch_1.textSearch[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].tsVector); },
        nvarchar: function () { var _a; return (_a = varcharMax_1.varcharMax[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].nvarchar); },
        datetime2: function () { var _a; return (_a = dateTime_1.dateTime[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].datetime2); },
        bigserial: function () { var _a; return (_a = bigSerial_1.bigSerial[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].bigSerial); },
        macaddr: function () { var _a; return (_a = networkAddress_1.networkAddress[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].macaddr); },
        linestring: function () { var _a; return (_a = lineString_1.lineString[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].linestring); },
        varcharmax: function () { var _a; return (_a = varcharMax_1.varcharMax[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].varcharMax); },
        macaddr8: function () { var _a; return (_a = networkAddress_1.networkAddress[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].macaddr8); },
        nvarcharmax: function () { var _a; return (_a = varcharMax_1.varcharMax[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].nVarcharMax); },
        smallserial: function () { var _a; return (_a = smallSerial_1.smallSerial[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].smallSerial); },
        smalldatetime: function () { var _a; return (_a = dateTime_1.dateTime[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].smallDateTime); },
        datetimeoffset: function () { var _a; return (_a = dateTime_1.dateTime[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].dateTimeOffset); },
        varbinarymax: function () { var _a; return (_a = varbinaryMax_1.varbinaryMax[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].varbinaryMax); },
        charactervarying: function () { var _a; return (_a = characterVarying_1.characterVarying[dbName]) === null || _a === void 0 ? void 0 : _a.query(str, Types_1["default"].characterVarying); }
    };
    if (typeof mapOfDataTypeInstance[dataType] === 'function')
        return mapOfDataTypeInstance[dataType]();
    return str;
}
exports["default"] = default_1;
