import {JSONObject} from '../../../typing';
import types from '../../../sql/Types';

let list = {
    0: (str: string, type: string, replaceWith: string): string => {
        return str.replace(type, replaceWith);
    },
    1: (str: string): string => {
        return str;
    }
}

export let characterVarying: JSONObject = {

    mysql: {
        query: (str: string, type: string) => list['0'](str, type, types.text)
    },
    mssql: {
        query: (str: string, type: string) => list['0'](str, type, types.varcharMax)
    },
    postgresql: {
        query: (str: string, type: string) => list['1'](str)
    }

}