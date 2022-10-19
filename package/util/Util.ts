import symbol from '../sql/Symbol';

function hasParentheses(str: string): boolean {
    return str.search('\\' + symbol.OPEN_PARENTHESES) !== -1;
}


export default {

    replaceDataType: (str: string, replace: string, replaceWith: string[]): string => {

        if (hasParentheses(str))
            return str.replace(replace + symbol.OPEN_PARENTHESES, replaceWith[0] +
                symbol.OPEN_PARENTHESES + replaceWith[1] + symbol.CLOSE_PARENTHESES);

        return str.replace(replace, replaceWith[0] +
            symbol.OPEN_PARENTHESES + replaceWith[1] + symbol.CLOSE_PARENTHESES);
    }

}