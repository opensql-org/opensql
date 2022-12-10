"use strict";
exports.__esModule = true;
exports.ntext = void 0;
var Types_1 = require("../../../sql/Types");
var list = {
    0: function (str, type) {
        return str.replace(type, Types_1["default"].text);
    },
    1: function (str) {
        return str;
    }
};
exports.ntext = {
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
