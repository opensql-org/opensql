"use strict";
exports.__esModule = true;
exports.json = void 0;
var Types_1 = require("../../../sql/Types");
var list = {
    0: function (str, type) {
        return str.replace(type, Types_1["default"].text);
    },
    1: function (str) {
        return str;
    }
};
exports.json = {
    mysql: {
        query: function (str, type) { return list['1'](str); }
    },
    mssql: {
        query: function (str, type) { return list['0'](str, type); }
    },
    postgresql: {
        query: function (str, type) { return list['1'](str); }
    }
};