"use strict";
exports.__esModule = true;
exports.lineString = void 0;
var Types_1 = require("../../../sql/Types");
var list = {
    0: function (str, type) {
        return str.replace(type, "".concat(Types_1["default"].geometry, "(").concat(Types_1["default"].linestring, ")"));
    },
    1: function (str) {
        return str;
    },
    2: function (str, type) {
        return str.replace(type, Types_1["default"].geography);
    }
};
exports.lineString = {
    postgresql: {
        query: function (str, type) { return list['0'](str, type); }
    },
    mysql: {
        query: function (str, type) { return list['1'](str); }
    },
    mssql: {
        query: function (str, type) { return list['2'](str, type); }
    }
};
