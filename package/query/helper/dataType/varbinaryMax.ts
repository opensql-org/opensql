import {JSONObject} from '../../../typing';
import types from '../../../sql/Types';

const MAX_LENGTH = '(4096)';

let list = {
    0: (str: string, type: string): string => {
        return str.replace(type, types.varbinary);
    },
    1: (str: string): string => {
        return str;
    },
    2: (str: string, type: string): string => {
        return str.replace(type, types.bit + MAX_LENGTH);
    }
}

export let varbinaryMax: JSONObject = {

    mysql: {
        query: (str: string, type: string) => list['0'](str, type)
    },
    mssql: {
        query: (str: string, type: string) => list['1'](str)
    },
    postgresql: {
        query: (str: string, type: string) => list['2'](str, type)
    }

}