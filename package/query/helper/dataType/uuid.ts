import {JSONObject} from '../../../typing';
import types from '../../../sql/Types';

const UUID_LENGTH = '(255)';

let list = {
    0: (str: string, type: string): string => {
        return str.replace(type, types.char + UUID_LENGTH);
    },
    1: (str: string): string => {
        return str;
    }
}

export let uuid: JSONObject = {

    mysql: {
        query: (str: string, type: string) => list['0'](str, type)
    },
    mssql: {
        query: (str: string, type: string) => list['0'](str, type)
    },
    postgresql: {
        query: (str: string, type: string) => list['1'](str)
    }

}