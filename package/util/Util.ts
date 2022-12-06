function hasParentheses(str: string): boolean {
    return str.search('\\' + '(') !== -1;
}


export default {

    replaceDataType: (str: string, replace: string, replaceWith: string[]): string => {

        if (hasParentheses(str))
            return str.replace(replace + '(', `${replaceWith[0]}(${replaceWith[1]})`);

        return str.replace(replace, `${replaceWith[0]}(${replaceWith[1]})`);
    },

    searchInString: (str: string, target: string): boolean => {
        return str.search(target) !== -1;
    }

}