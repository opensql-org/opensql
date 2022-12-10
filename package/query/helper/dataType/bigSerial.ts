import {JSONObject} from '../../../typing';
import types from '../../../sql/Types';

let list = {
    0: (str: string, type: string): string => {
        return str.replace(type, types.bigint);
    },
    1: (str: string): string => {
        return str;
    }
}

export let bigSerial: JSONObject = {

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