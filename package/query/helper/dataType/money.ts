import {JSONObject} from '../../../typing';
import types from '../../../sql/Types';

const MONEY_NUMBER_AND_POINT_LENGTH = '(15,2)';

let list = {
    0: (str: string, type: string): string => {
        return str.replace(type, types.decimal + MONEY_NUMBER_AND_POINT_LENGTH);
    },
    1: (str: string): string => {
        return str;
    }
}

export let money: JSONObject = {

    mysql: {
        query: (str: string, type: string) => list['0'](str, type)
    },
    mssql: {
        query: (str: string, type: string) => list['1'](str)
    },
    postgresql: {
        query: (str: string, type: string) => list['1'](str)
    }

}