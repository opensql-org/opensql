import {JSONObject} from '../../../typing';
import types from '../../../sql/Types';
import Util from '../../../util/Util';
import keyword from '../../../sql/Keyword';

let list = {
    0: (str: string, type: string, columnName: string): string => {
        let isDefinedCheckConstraint = Util.searchInString(str, keyword.CHECK);
        str = str.replace(type, types.varchar);

        if (isDefinedCheckConstraint)
            return str;

        let getParenthesesData = str.match(/VARCHAR\((.*?)\)/)[1].split(','),
            removeParenthesesWithData = str.replace(/VARCHAR\((.*?)\)/, 'VARCHAR'),
            arrayOfCheckConditions: any[] = [];

        getParenthesesData.forEach((item, index, array) => {

            let isLastIndex = array.length === index + 1;

            arrayOfCheckConditions.push(`${columnName}=${item}`);

            if (!isLastIndex)
                arrayOfCheckConditions.push('OR');

        });


        return `${removeParenthesesWithData},${keyword.CHECK}(${arrayOfCheckConditions.join(' ')})`;
    },
    1: (str: string): string => {
        return str;
    }
}

export let Enum: JSONObject = {

    mysql: {
        query: (str: string, type: string, columnName: string) => list['1'](str)
    },
    mssql: {
        query: (str: string, type: string, columnName: string) => list['0'](str, type, columnName)
    },
    postgresql: {
        query: (str: string, type: string, columnName: string) => list['1'](str)
    }

}