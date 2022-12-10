"use strict";
exports.__esModule = true;
exports.networkAddress = void 0;
var Types_1 = require("../../../sql/Types");
var list = {
    0: function (str, type) {
        return str.replace(type, Types_1["default"].varchar);
    },
    1: function (str) {
        return str;
    }
};
exports.networkAddress = {
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
