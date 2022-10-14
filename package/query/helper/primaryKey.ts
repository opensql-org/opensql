import {JSONObject} from '../../typing';

let foreignKey: JSONObject = {

    0: (arr: Array<string>) => {
        return `, FOREIGN KEY (${arr[0]}) REFERENCES ${arr[1]}(${arr[2]})`;
    },
    1: (arr: Array<string>) => {
        return ` FOREIGN KEY REFERENCES ${arr[1]}(${arr[2]})`;
    },
    2: (arr: Array<string>) => {
        return ` REFERENCES ${arr[1]}(${arr[2]})`;
    },
    mysql: {
        query: (arr: Array<string>) => foreignKey['0'](arr)
    },
    mssql: {
        query: (arr: Array<string>) => foreignKey['1'](arr)
    },
    postgresql: {
        query: (arr: Array<string>) => foreignKey['2'](arr)
    }

}


export {
    foreignKey as default
}