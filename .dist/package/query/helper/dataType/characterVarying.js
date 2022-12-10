"use strict";
exports.__esModule = true;
exports.characterVarying = void 0;
var Types_1 = require("../../../sql/Types");
var list = {
    0: function (str, type, replaceWith) {
        return str.replace(type, replaceWith);
    },
    1: function (str) {
        return str;
    }
};
exports.characterVarying = {
    mysql: {
        query: function (str, type) { return list['0'](str, type, Types_1["default"].text); }
    },
    mssql: {
        query: function (str, type) { return list['0'](str, type, Types_1["default"].varcharMax); }
    },
    postgresql: {
        query: function (str, type) { return list['1'](str); }
    }
};
