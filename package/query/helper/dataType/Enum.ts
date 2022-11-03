import {JSONObject} from '../../../typing';
import types from '../../../sql/Types';
import Util from '../../../util/Util';
import keyword from '../../../sql/Keyword';

let list = {
    0: (str: string, type: string): string => {
        let isDefinedCheckConstraint = Util.searchInString(str, keyword.CHECK);
        str = str.replace(type, types.varchar);

        if (isDefinedCheckConstraint)
            return str;

        let columnName = str.split(' ')[0],
            extractData = str.match(/varchar\((.*?)\)/),
            removeParenthesesWithData = str.replace('(' + extractData[1] + ')', ' ');

        return `${removeParenthesesWithData}${keyword.CHECK}(${columnName} ${extractData[0]
            .replace(types.varchar, keyword.IN)})`;
    },
    1: (str: string): string => {
        return str;
    }
}

export let Enum: JSONObject = {

    mysql: {
        query: (str: string, type: string) => list['1'](str)
    },
    mssql: {
        query: (str: string, type: string) => list['0'](str, type)
    },
    postgresql: {
        query: (str: string, type: string) => list['1'](str)
    }

}