import keyword from '../../package/sql/keyword';
import types from '../../package/sql/Types';

function isDefinedDefaultWordInFirstOfString(str: string) {
    if (typeof str === 'string')
        return str.search(keyword.DEFAULT) === 0;
    return false;
}

function isDefinedCommentWordInFirstOfString(str: string) {
    if (typeof str === 'string')
        return str.search(keyword.COMMENT) === 0;
    return false;
}

function isDefinedStorageWordInFirstOfString(str: string) {
    if (typeof str === 'string')
        return str.search(keyword.STORAGE) === 0;
    return false;
}

function arrayToString(arr: Array<string>) {
    return arr.toString().replace(',', ' ').trim();
}

function getStringOfValueForEnumOrSetDataTypesWithComma(arr: Array<string>) {
    let stringTypesWithComma = '';
    arr.forEach((item, index, arr) => {

        let lastIndex = arr.lastIndexOf(item);

        if (lastIndex)
            stringTypesWithComma += `, '${item}'`;


        if (!lastIndex)
            stringTypesWithComma += `'${item}'`;


    });
    return stringTypesWithComma;
}


export default class Util {

    private constructor() {
    }

    private static instance: Util;

    public static getInstance(): Util {

        if (!Util.instance)
            Util.instance = new Util();

        return Util.instance;
    }


    getDriverNameFromString(str: string): string {
        return str.split(':')[0];
    }

    /**
     * @param url
     * @param option
     */
    urlHandler(url: string, option?: object): object {
        let finalObject = {};

        if (option)
            finalObject = {...finalObject, ...option};

        let password = '',
            username = '',
            database = '',
            userWithPass = [],
            hostWithPort: any = url.split('/')[2],
            dbNameWithUserAndPass: any = url.split('/')[3],
            isSetPort = hostWithPort.search(':') !== -1;

        if (isSetPort) {
            hostWithPort = hostWithPort.split(':');
            finalObject = {
                host: hostWithPort[0],
                port: hostWithPort[1]
            };
        }


        dbNameWithUserAndPass = dbNameWithUserAndPass.split('?');
        userWithPass = dbNameWithUserAndPass[1].split('=');
        username = userWithPass[1].split('&')[0];
        database = dbNameWithUserAndPass[0]
        password = userWithPass[2];

        dbNameWithUserAndPass = {
            user: username,
            password: password
        }

        finalObject = {
            ...finalObject,
            ...dbNameWithUserAndPass
        }

        if (database)
            finalObject = {...finalObject, database: database};

        return finalObject;
    }

    dataTypeHandler(type: string, data?: number | any[]): string {
        if (!data)
            return type;

        let isArray = Array.isArray(data),
            isValueOfIndexIsNumber = false,
            newArrayForOptionsContains: string[] = [],
            newArrayOfValue: string[] = [],
            isDefinedValueInIndexTwoOfArray = false;


        let isDecimal = type === types.decimal,
            isDouble = type === types.double,
            isFloat = type === types.float,
            isReal = type === types.real,
            isEnum = type === types.enum,
            isSet = type === types.set;


        let arrayOfValidType = [
            keyword.NULL,
            keyword.NOT_NULL,
            keyword.AUTO_INCREMENT
        ];


        if (!isArray || typeof data === 'number')
            return (`${type}(${data})`).trim();


        data.forEach((item, index, arr) => {

            let isValidType = arrayOfValidType.includes(item),
                nextItem = arr[index + 1],
                isNextItemIsNumber = Number.isInteger(nextItem),
                isItemIsString = typeof item === 'string',
                isItemIsNumber = Number.isInteger(item),
                isCommentFunction = isDefinedCommentWordInFirstOfString(item),
                isStorageEnum = isDefinedStorageWordInFirstOfString(item),
                isDefaultType = isDefinedDefaultWordInFirstOfString(item);


            if (isValidType || isDefaultType || isCommentFunction || isStorageEnum) {
                newArrayForOptionsContains.push(item);
                return;
            }

            if ((!isNextItemIsNumber && isItemIsNumber) || isItemIsString) {
                isValueOfIndexIsNumber = true;
                newArrayOfValue.push(item);
            }

            if (isNextItemIsNumber && isItemIsNumber) {
                isDefinedValueInIndexTwoOfArray = true;
                newArrayOfValue.push(item);
            }


        });


        let stringOfOptionContains = arrayToString(newArrayForOptionsContains);
        let validateStringOfOptionContains = !stringOfOptionContains ? ' ' : stringOfOptionContains;

        if (isEnum || isSet)
            return (`${type}(${getStringOfValueForEnumOrSetDataTypesWithComma(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();

        if (isValueOfIndexIsNumber && !isDefinedValueInIndexTwoOfArray && (!isEnum || !isSet))
            return (`${type}(${(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();

        if (isDecimal || isFloat || isReal || isDouble)
            return (`${type}(${(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();

        return (type + ' ' + validateStringOfOptionContains).trim();
    }

    jsonToString(object: object, replaceValue: string = ', '): string {
        return JSON.stringify(object)
            .replace(/[{"}]/g, '')
            .replace(/:/g, ' ')
            .replace(/,/g, replaceValue);
    }

}