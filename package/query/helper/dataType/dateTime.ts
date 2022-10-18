import {JSONObject} from '../../../typing';
import types from '../../../sql/Types';
import keyword from '../../../sql/Keyword';

let list = {
    0: (str: string, type: string): string => {
        return str.replace(type, types.datetime);
    },
    1: (str: string, type: string): string => {
        let withT: string = keyword.WITH;

        if (type === types.smalldatetime)
            withT = keyword.WITHOUT;

        return str.replace(type,
            `${types.timestamp} ${withT} ${keyword.TIME_ZONE}`);
    },
    2: (str: string): string => {
        return str;
    }
}

export let dateTime: JSONObject = {

    mysql: {
        query: (str: string, type: string) => list['0'](str, type)
    },
    postgresql: {
        query: (str: string, type: string) => list['1'](str, type)
    },
    mssql: {
        query: (str: string, type: string) => list['2'](str)
    }

}