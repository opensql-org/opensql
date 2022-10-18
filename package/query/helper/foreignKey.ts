import {JSONObject} from '../../typing';

let list = {
    0: (arr: Array<string>): string => {
        return `, FOREIGN KEY (${arr[0]}) REFERENCES ${arr[1]}(${arr[2]})`;
    },
    1: (arr: Array<string>): string => {
        return ` FOREIGN KEY REFERENCES ${arr[1]}(${arr[2]})`;
    },
    2: (arr: Array<string>): string => {
        return ` REFERENCES ${arr[1]}(${arr[2]})`;
    }
}

export let foreignKey: JSONObject = {

    mysql: {
        query: (arr: Array<string>) => list['0'](arr)
    },
    mssql: {
        query: (arr: Array<string>) => list['1'](arr)
    },
    postgresql: {
        query: (arr: Array<string>) => list['2'](arr)
    }

}