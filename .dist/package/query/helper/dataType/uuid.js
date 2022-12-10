"use strict";
exports.__esModule = true;
exports.uuid = void 0;
var Types_1 = require("../../../sql/Types");
var UUID_LENGTH = '(255)';
var list = {
    0: function (str, type) {
        return str.replace(type, Types_1["default"].char + UUID_LENGTH);
    },
    1: function (str) {
        return str;
    }
};
exports.uuid = {
    mysql: {
        query: function (str, type) { return list['0'](str, type); }
    },
    mssql: {
        query: function (str, type) { return list['0'](str, type); }
    },
    postgresql: {
        query: function (str, type) { return list['1'](str); }
    }
};
