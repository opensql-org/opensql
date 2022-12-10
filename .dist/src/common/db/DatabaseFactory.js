"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var postgresql_1 = require("../../driver/postgresql");
var mysql_1 = require("../../driver/mysql");
var Util_1 = require("../../util/Util");
var Utilities = Util_1["default"].getInstance(), instanceClass = {
    mysql: mysql_1["default"],
    postgresql: postgresql_1["default"]
};
var DatabaseFactory = /** @class */ (function () {
    function DatabaseFactory(url, option) {
        this.factory(url);
        this.connect(url, option);
    }
    DatabaseFactory.prototype.factory = function (str) {
        // @ts-ignore
        this.driver = new instanceClass[Utilities.getDriverNameFromString(str)]();
    };
    DatabaseFactory.prototype.find = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.find(query)];
            });
        });
    };
    DatabaseFactory.prototype.findOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.findOne(query)];
            });
        });
    };
    DatabaseFactory.prototype.findMany = function (query, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.findMany(query, limit)];
            });
        });
    };
    DatabaseFactory.prototype.update = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.update(query)];
            });
        });
    };
    DatabaseFactory.prototype.remove = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.remove(query)];
            });
        });
    };
    DatabaseFactory.prototype.addOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.addOne(query)];
            });
        });
    };
    DatabaseFactory.prototype.addMany = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.addMany(query)];
            });
        });
    };
    DatabaseFactory.prototype.createDatabase = function (name, set, collate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.createDatabase(name, set, collate)];
            });
        });
    };
    DatabaseFactory.prototype.dropDatabase = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.dropDatabase(name)];
            });
        });
    };
    DatabaseFactory.prototype.createTable = function (ct) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.createTable(ct)];
            });
        });
    };
    DatabaseFactory.prototype.dropTable = function (tableName, databaseName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.dropTable(tableName, databaseName)];
            });
        });
    };
    DatabaseFactory.prototype.truncateTable = function (tableName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.truncateTable(tableName)];
            });
        });
    };
    DatabaseFactory.prototype.query = function (sql, injection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.driver.query(sql, injection)];
            });
        });
    };
    DatabaseFactory.prototype.connect = function (url, option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.driver.connect(url, option);
                return [2 /*return*/];
            });
        });
    };
    DatabaseFactory.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.driver.disconnect();
                return [2 /*return*/];
            });
        });
    };
    return DatabaseFactory;
}());
exports["default"] = DatabaseFactory;
