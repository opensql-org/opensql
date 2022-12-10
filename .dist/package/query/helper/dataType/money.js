"use strict";
exports.__esModule = true;
exports.money = void 0;
var Types_1 = require("../../../sql/Types");
var Util_1 = require("../../../util/Util");
var MONEY_NUMBER_AND_POINT_LENGTH = '15,2';
var list = {
    0: function (str, type) {
        return Util_1["default"].replaceDataType(str, type, [Types_1["default"].decimal, MONEY_NUMBER_AND_POINT_LENGTH]);
    },
    1: function (str) {
        return str;
    }
};
exports.money = {
    mysql: {
        query: function (str, type) { return list['0'](str, type); }
    },
    mssql: {
        query: function (str, type) { return list['1'](str); }
    },
    postgresql: {
        query: function (str, type) { return list['1'](str); }
    }
};
