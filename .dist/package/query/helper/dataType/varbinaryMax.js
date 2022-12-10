"use strict";
exports.__esModule = true;
exports.varbinaryMax = void 0;
var Types_1 = require("../../../sql/Types");
var MAX_LENGTH = '(4096)';
var list = {
    0: function (str, type) {
        return str.replace(type, Types_1["default"].varBinary);
    },
    1: function (str) {
        return str;
    },
    2: function (str, type) {
        return str.replace(type, Types_1["default"].bit + MAX_LENGTH);
    }
};
exports.varbinaryMax = {
    mysql: {
        query: function (str, type) { return list['0'](str, type); }
    },
    mssql: {
        query: function (str, type) { return list['1'](str); }
    },
    postgresql: {
        query: function (str, type) { return list['2'](str, type); }
    }
};
