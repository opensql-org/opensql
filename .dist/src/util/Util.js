"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var keyword_1 = require("../../package/sql/keyword");
var Types_1 = require("../../package/sql/Types");
function isDefinedDefaultWordInFirstOfString(str) {
    if (typeof str === 'string')
        return str.search(keyword_1["default"].DEFAULT) === 0;
    return false;
}
function isDefinedCommentWordInFirstOfString(str) {
    if (typeof str === 'string')
        return str.search(keyword_1["default"].COMMENT) === 0;
    return false;
}
function isDefinedStorageWordInFirstOfString(str) {
    if (typeof str === 'string')
        return str.search(keyword_1["default"].STORAGE) === 0;
    return false;
}
function arrayToString(arr) {
    return arr.toString().replace(',', ' ').trim();
}
function getStringOfValueForEnumOrSetDataTypesWithComma(arr) {
    var stringTypesWithComma = '';
    arr.forEach(function (item, index, arr) {
        var lastIndex = arr.lastIndexOf(item);
        if (lastIndex)
            stringTypesWithComma += ", '".concat(item, "'");
        if (!lastIndex)
            stringTypesWithComma += "'".concat(item, "'");
    });
    return stringTypesWithComma;
}
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.getInstance = function () {
        if (!Util.instance)
            Util.instance = new Util();
        return Util.instance;
    };
    Util.prototype.getDriverNameFromString = function (str) {
        return str.split(':')[0];
    };
    /**
     * @param url
     * @param option
     */
    Util.prototype.urlHandler = function (url, option) {
        var finalObject = {};
        if (option)
            finalObject = __assign(__assign({}, finalObject), option);
        var password = '', username = '', database = '', userWithPass = [], hostWithPort = url.split('/')[2], dbNameWithUserAndPass = url.split('/')[3], isSetPort = hostWithPort.search(':') !== -1;
        if (isSetPort) {
            hostWithPort = hostWithPort.split(':');
            finalObject = {
                host: hostWithPort[0],
                port: hostWithPort[1]
            };
        }
        dbNameWithUserAndPass = dbNameWithUserAndPass.split('?');
        userWithPass = dbNameWithUserAndPass[1].split('=');
        username = userWithPass[1].split('&')[0];
        database = dbNameWithUserAndPass[0];
        password = userWithPass[2];
        dbNameWithUserAndPass = {
            user: username,
            password: password
        };
        finalObject = __assign(__assign({}, finalObject), dbNameWithUserAndPass);
        if (database)
            finalObject = __assign(__assign({}, finalObject), { database: database });
        return finalObject;
    };
    Util.prototype.dataTypeHandler = function (type, data) {
        if (!data)
            return type;
        var isArray = Array.isArray(data), isValueOfIndexIsNumber = false, newArrayForOptionsContains = [], newArrayOfValue = [], isDefinedValueInIndexTwoOfArray = false;
        var isDecimal = type === Types_1["default"].decimal, isDouble = type === Types_1["default"].double, isFloat = type === Types_1["default"].float, isReal = type === Types_1["default"].real, isEnum = type === Types_1["default"]["enum"], isSet = type === Types_1["default"].set;
        var arrayOfValidType = [
            keyword_1["default"].NULL,
            keyword_1["default"].NOT_NULL,
            keyword_1["default"].AUTO_INCREMENT
        ];
        if (!isArray || typeof data === 'number')
            return ("".concat(type, "(").concat(data, ")")).trim();
        data.forEach(function (item, index, arr) {
            var isValidType = arrayOfValidType.includes(item), nextItem = arr[index + 1], isNextItemIsNumber = Number.isInteger(nextItem), isItemIsString = typeof item === 'string', isItemIsNumber = Number.isInteger(item), isCommentFunction = isDefinedCommentWordInFirstOfString(item), isStorageEnum = isDefinedStorageWordInFirstOfString(item), isDefaultType = isDefinedDefaultWordInFirstOfString(item);
            if (isValidType || isDefaultType || isCommentFunction || isStorageEnum) {
                newArrayForOptionsContains.push(item);
                return;
            }
            if ((!isNextItemIsNumber && isItemIsNumber) || isItemIsString) {
                isValueOfIndexIsNumber = true;
                newArrayOfValue.push(item);
            }
            if (isNextItemIsNumber && isItemIsNumber) {
                isDefinedValueInIndexTwoOfArray = true;
                newArrayOfValue.push(item);
            }
        });
        var stringOfOptionContains = arrayToString(newArrayForOptionsContains);
        var validateStringOfOptionContains = !stringOfOptionContains ? ' ' : stringOfOptionContains;
        if (isEnum || isSet)
            return ("".concat(type, "(").concat(getStringOfValueForEnumOrSetDataTypesWithComma(newArrayOfValue), ") ").concat(validateStringOfOptionContains)).trim();
        if (isValueOfIndexIsNumber && !isDefinedValueInIndexTwoOfArray && (!isEnum || !isSet))
            return ("".concat(type, "(").concat((newArrayOfValue), ") ").concat(validateStringOfOptionContains)).trim();
        if (isDecimal || isFloat || isReal || isDouble)
            return ("".concat(type, "(").concat((newArrayOfValue), ") ").concat(validateStringOfOptionContains)).trim();
        return (type + ' ' + validateStringOfOptionContains).trim();
    };
    Util.prototype.jsonToString = function (object, replaceValue) {
        if (replaceValue === void 0) { replaceValue = ', '; }
        return JSON.stringify(object)
            .replace(/[{"}]/g, '')
            .replace(/:/g, ' ')
            .replace(/,/g, replaceValue);
    };
    return Util;
}());
exports["default"] = Util;
