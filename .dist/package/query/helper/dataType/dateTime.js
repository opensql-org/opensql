"use strict";
exports.__esModule = true;
exports.dateTime = void 0;
var Types_1 = require("../../../sql/Types");
var Keyword_1 = require("../../../sql/Keyword");
var list = {
    0: function (str, type) {
        return str.replace(type, Types_1["default"].datetime);
    },
    1: function (str, type) {
        var withT = Keyword_1["default"].WITH;
        if (type === Types_1["default"].smallDateTime)
            withT = Keyword_1["default"].WITHOUT;
        return str.replace(type, "".concat(Types_1["default"].timestamp, " ").concat(withT, " ").concat(Keyword_1["default"].TIME_ZONE));
    },
    2: function (str) {
        return str;
    }
};
exports.dateTime = {
    mysql: {
        query: function (str, type) { return list['0'](str, type); }
    },
    postgresql: {
        query: function (str, type) { return list['1'](str, type); }
    },
    mssql: {
        query: function (str, type) { return list['2'](str); }
    }
};
