"use strict";
exports.__esModule = true;
exports.foreignKey = void 0;
function stateHandler(onUpdate, onDelete) {
    return "".concat(onUpdate ? "ON UPDATE ".concat(onUpdate) : '', " ").concat(onDelete ? "ON DELETE ".concat(onDelete) : '').trim();
}
var list = {
    0: function (fk) {
        return ", FOREIGN KEY (".concat(fk.get, ") REFERENCES ").concat(fk.to, "(").concat(fk.column, ") ").concat(stateHandler(fk.onUpdate, fk.onDelete)).trim();
    }
};
exports.foreignKey = {
    mysql: {
        query: function (fk) { return list['0'](fk); }
    },
    mssql: {
        query: function (fk) { return list['0'](fk); }
    },
    postgresql: {
        query: function (fk) { return list['0'](fk); }
    }
};
