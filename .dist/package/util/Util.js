"use strict";
exports.__esModule = true;
function hasParentheses(str) {
    return str.search('\\' + '(') !== -1;
}
exports["default"] = {
    replaceDataType: function (str, replace, replaceWith) {
        if (hasParentheses(str))
            return str.replace(replace + '(', "".concat(replaceWith[0], "(").concat(replaceWith[1], ")"));
        return str.replace(replace, "".concat(replaceWith[0], "(").concat(replaceWith[1], ")"));
    },
    searchInString: function (str, target) {
        return str.search(target) !== -1;
    }
};
