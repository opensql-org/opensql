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
var dataType_1 = require("../../../package/query/helper/dataType");
var foreignKey_1 = require("../../../package/query/helper/foreignKey");
var Keyword_1 = require("../../../package/sql/Keyword");
var Util_1 = require("../../util/Util");
var SqlParser = require('../../../../lib/sql-parser');
var jsonToString = Util_1["default"].getInstance().jsonToString;
var Builder = /** @class */ (function () {
    function Builder() {
        this.queryInjection = [];
        this.driverName = '';
    }
    Builder.prototype.sqlParserHandler = function (config, query) {
        if (!query)
            return;
        var sp = new SqlParser(__assign({ type: this.driverName }, config), query);
        if (sp.injection())
            this.queryInjection = sp.injection();
        return sp.toSQL();
    };
    Builder.sqlParserConfigHandler = function (type, operationType) {
        var _a;
        return { operation: (_a = {}, _a[operationType] = type, _a), operationType: operationType };
    };
    Builder.prototype.setDriverName = function (driverName) {
        this.driverName = driverName;
    };
    Builder.prototype.injection = function () {
        return this.queryInjection;
    };
    Builder.prototype.find = function (query) {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'select'), query);
    };
    Builder.prototype.findOne = function (query) {
        query.option.$limit = 1;
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('one', 'select'), query);
    };
    Builder.prototype.findMany = function (query, limit) {
        query.option.$limit = !limit ? 10 : limit;
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'select'), query);
    };
    Builder.prototype.update = function (query) {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'update'), query);
    };
    Builder.prototype.remove = function (query) {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'delete'), query);
    };
    Builder.prototype.addOne = function (query) {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('one', 'insert'), query);
    };
    Builder.prototype.addMany = function (query) {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'insert'), query);
    };
    Builder.prototype.createDatabase = function (name, set, collate) {
        if (set === void 0) { set = 'UTF8'; }
        if (collate === void 0) { collate = 'UTF8_UNICODE_CI'; }
        return [
            Keyword_1["default"].CREATE, Keyword_1["default"].DATABASE, Keyword_1["default"].IF_NOT_EXISTS,
            name, 'CHARACTER', Keyword_1["default"].SET, set, 'COLLATE', collate
        ].join(' ');
    };
    Builder.prototype.dropDatabase = function (name) {
        return [
            Keyword_1["default"].DROP, Keyword_1["default"].DATABASE, name
        ].join(' ');
    };
    /**
     * @param ct
     * @param dbName
     * Used to handle different query for different database.
     */
    Builder.prototype.createTable = function (ct, dbName) {
        var _a;
        var hasPrimaryKey = ct === null || ct === void 0 ? void 0 : ct.primaryKey, hasForeignKey = ct === null || ct === void 0 ? void 0 : ct.foreignKey, tableName = ct === null || ct === void 0 ? void 0 : ct.table, hasTrueConditions = hasPrimaryKey || hasForeignKey;
        if (hasTrueConditions)
            for (var key in ct === null || ct === void 0 ? void 0 : ct.column) {
                var value = ct.column[key], hasMatchPrimaryKey = key === hasPrimaryKey, hasMatchForeignKey = hasForeignKey[key];
                ct.column[key] = (0, dataType_1["default"])(dbName, value);
                if (hasMatchPrimaryKey)
                    ct.column[key] = "".concat(value, " ").concat(Keyword_1["default"].PRIMARY_KEY);
                if (hasMatchForeignKey) {
                    var fkQuery = (_a = foreignKey_1.foreignKey[dbName]) === null || _a === void 0 ? void 0 : _a.query(hasForeignKey[key]);
                    ct.column[key] = "".concat(value, " ").concat(fkQuery);
                }
            }
        return [
            Keyword_1["default"].CREATE,
            Keyword_1["default"].TABLE,
            Keyword_1["default"].IF_NOT_EXISTS,
            tableName,
            '(',
            jsonToString(ct.column),
            (ct === null || ct === void 0 ? void 0 : ct.index) ? ", INDEX(".concat(ct === null || ct === void 0 ? void 0 : ct.index, ")") : '',
            (ct === null || ct === void 0 ? void 0 : ct.unique) ? ", UNIQUE(".concat(ct === null || ct === void 0 ? void 0 : ct.unique, ")") : '',
            ')'
        ].filter(function (str) { return /\S/.test(str); }).join(' ');
    };
    Builder.prototype.dropTable = function (tableName, databaseName) {
        return [
            Keyword_1["default"].USE,
            databaseName,
            Keyword_1["default"].IF_EXISTS,
            tableName
        ].join(' ');
    };
    Builder.prototype.truncateTable = function (tableName) {
        return [
            Keyword_1["default"].TRUNCATE,
            Keyword_1["default"].TABLE,
            tableName
        ].join(' ');
    };
    return Builder;
}());
exports["default"] = Builder;
