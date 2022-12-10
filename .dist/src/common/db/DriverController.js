"use strict";
exports.__esModule = true;
var DriverController = /** @class */ (function () {
    function DriverController() {
        /**
         * Store the name of the database that the client wants to work on
         * @private
         */
        this.name = '';
    }
    DriverController.prototype.setName = function (name) {
        this.name = name;
    };
    DriverController.prototype.getName = function () {
        return this.name;
    };
    return DriverController;
}());
exports["default"] = DriverController;
