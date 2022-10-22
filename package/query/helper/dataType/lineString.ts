import {JSONObject} from '../../../typing';
import symbol from '../../../sql/Symbol';
import types from '../../../sql/Types';

let list = {
    0: (str: string, type: string): string => {
        return str.replace(type, types.geometry + symbol.OPEN_PARENTHESES +
            types.linestring + symbol.CLOSE_PARENTHESES);
    },
    1: (str: string): string => {
        return str;
    },
    2: (str: string, type: string): string => {
        return str.replace(type, types.geography);
    }
}

export let lineString: JSONObject = {

    postgresql: {
        query: (str: string, type: string) => list['0'](str, type)
    },
    mysql: {
        query: (str: string, type: string) => list['1'](str)
    },
    mssql: {
        query: (str: string, type: string) => list['2'](str, type)
    }

}