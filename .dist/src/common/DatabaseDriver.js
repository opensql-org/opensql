"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var DriverController_1 = require("./db/DriverController");
var Builder_1 = require("./query/Builder");
var Util_1 = require("../util/Util");
var Utils = Util_1["default"].getInstance();
var DatabaseDriver = /** @class */ (function (_super) {
    __extends(DatabaseDriver, _super);
    function DatabaseDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryBuilder = new Builder_1["default"]();
        return _this;
    }
    DatabaseDriver.prototype.find = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.find(query), this.queryBuilder.injection())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.findOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.findOne(query), this.queryBuilder.injection())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.findMany = function (query, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.findMany(query, limit), this.queryBuilder.injection())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.update = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.update(query), this.queryBuilder.injection())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.remove = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.remove(query), this.queryBuilder.injection())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.addOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.addOne(query), this.queryBuilder.injection())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.addMany = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.addMany(query))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.createDatabase = function (name, set, collate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setName(name);
                        return [4 /*yield*/, this.execute(this.queryBuilder.createDatabase(name, set, collate))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.dropDatabase = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.dropDatabase(name))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.createTable = function (ct) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.createTable(ct, this.getName()))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.dropTable = function (tableName, databaseName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.dropTable(tableName, !databaseName ? this.getName() : databaseName))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.truncateTable = function (tableName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(this.queryBuilder.truncateTable(tableName))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.query = function (sql, injection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(sql, injection)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseDriver.prototype.connector = function (url, option) {
        var connectionObject = Utils.urlHandler(url, option);
        // @ts-ignore
        var isExistDatabase = connectionObject === null || connectionObject === void 0 ? void 0 : connectionObject.database;
        /**
         * Searching database name in config object.
         */
        if (isExistDatabase)
            this.setName(isExistDatabase);
        /**
         *  Setting the
         *  @member driverName variable in the
         *  @class Builder class to handle sql and injections in different databases.
         */
        this.queryBuilder.setDriverName(Utils.getDriverNameFromString(url));
        return connectionObject;
    };
    return DatabaseDriver;
}(DriverController_1["default"]));
exports["default"] = DatabaseDriver;
