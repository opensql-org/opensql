"use strict";
exports.__esModule = true;
exports.Operator = exports.RefState = exports.COP = exports.Cnj = void 0;
var RefState;
(function (RefState) {
    RefState["CASCADE"] = "CASCADE";
    RefState["RESTRICT"] = "RESTRICT";
    RefState["SET_NULL"] = "SET NULL";
    RefState["NO_ACTION"] = "NO ACTION";
})(RefState || (RefState = {}));
exports.RefState = RefState;
var Operator;
(function (Operator) {
    Operator["NULL"] = "NULL";
    Operator["IS_NULL"] = "IS NULL";
    Operator["NOT_NULL"] = "NOT NULL";
    Operator["IS_NOT_NULL"] = "IS NOT NULL";
})(Operator || (Operator = {}));
exports.Operator = Operator;
/**
 * Comparison operator
 */
var COP;
(function (COP) {
    COP["LESS"] = "<";
    COP["EQUAL"] = "=";
    COP["GREATER"] = ">";
    COP["OrEqual"] = "|*=";
    COP["AddEqual"] = "+=";
    COP["SubEqual"] = "-=";
    COP["MulEqual"] = "*=";
    COP["DivEqual"] = "/=";
    COP["ModEqual"] = "%=";
    COP["AndEqual"] = "&=";
    COP["NOT_EQUAL"] = "<>";
    COP["ExcEqual"] = "^-=";
    COP["LESS_OR_EQUAL"] = "<=";
    COP["GREATER_OR_EQUAL"] = ">=";
})(COP || (COP = {}));
exports.COP = COP;
var Cnj;
(function (Cnj) {
    Cnj["OR"] = "OR";
    Cnj["AND"] = "AND";
})(Cnj || (Cnj = {}));
exports.Cnj = Cnj;
