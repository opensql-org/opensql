"use strict";
exports.__esModule = true;
exports.Enum = void 0;
var Types_1 = require("../../../sql/Types");
var Util_1 = require("../../../util/Util");
var Keyword_1 = require("../../../sql/Keyword");
var list = {
    0: function (str, type) {
        var isDefinedCheckConstraint = Util_1["default"].searchInString(str, Keyword_1["default"].CHECK);
        str = str.replace(type, Types_1["default"].varchar);
        if (isDefinedCheckConstraint)
            return str;
        var columnName = str.split(' ')[0], extractData = str.match(/varchar\((.*?)\)/), removeParenthesesWithData = str.replace('(' + extractData[1] + ')', ' ');
        return "".concat(removeParenthesesWithData).concat(Keyword_1["default"].CHECK, "(").concat(columnName, " ").concat(extractData[0]
            .replace(Types_1["default"].varchar, Keyword_1["default"].IN), ")");
    },
    1: function (str) {
        return str;
    }
};
exports.Enum = {
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
