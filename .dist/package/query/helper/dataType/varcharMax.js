"use strict";
exports.__esModule = true;
exports.varcharMax = void 0;
var Types_1 = require("../../../sql/Types");
var Util_1 = require("../../../util/Util");
var MAX_Field_LENGTH = '65535';
var list = {
    0: function (str, type) {
        return Util_1["default"].replaceDataType(str, type, [Types_1["default"].varchar, MAX_Field_LENGTH]);
    },
    1: function (str) {
        return str;
    }
};
exports.varcharMax = {
    mysql: {
        query: function (str, type) { return list['0'](str, type); }
    },
    mssql: {
        query: function (str, type) { return list['1'](str); }
    },
    postgresql: {
        query: function (str, type) { return list['0'](str, type); }
    }
};
