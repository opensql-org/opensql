// import keyword from '../../package/sql/keyword';


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
            Object.assign(finalObject, option);

        let password = '',
            username = '',
            database = '',
            userWithPass = [],
            hostWithPort: any = url.split('/')[2],
            dbNameWithUserAndPass: any = url.split('/')[3],
            isSetPort = hostWithPort.search(':') !== -1,
            isSetDatabase = /\/[a-z-A-Z-0-9]/.test(dbNameWithUserAndPass);

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

        Object.assign(finalObject, dbNameWithUserAndPass);

        if (isSetDatabase)
            Object.assign(finalObject, {database: database})


        return finalObject;
    }

    addDataTypeForFieldInFirstItemOfArray(type: string, data?: number | any[]): string {
        // if (!data)
        //     return type;
        //
        // let isArray = Array.isArray(data),
        //     isValueOfIndexIsNumber = false,
        //     newArrayForOptionsContains: any[] = [],
        //     newArrayOfValue: any[] = [],
        //     isDefinedValueInIndexTwoOfArray = false;
        //
        //
        // let isDecimal = type === 'DECIMAL',
        //     isDouble = type === 'DOUBLE',
        //     isFloat = type === 'FLOAT',
        //     isReal = type === 'REAL',
        //     isEnum = type === 'ENUM',
        //     isSet = type === 'SET';
        //
        //
        // let arrayOfValidType = [
        //     keyword.AUTO_INCREMENT,
        //     keyword.NOT + keyword.NULL,
        //     keyword.NULL
        // ];
        //
        //
        // if (!isArray || typeof data === 'number')
        //     return (`${type}(${data})`).trim();
        //
        //
        // data.forEach((item, index, arr) => {
        //
        //     let isValidType = arrayOfValidType.includes(item);
        //     let nextItem = arr[index + 1];
        //     let isNextItemIsNumber = Number.isInteger(nextItem);
        //     let isItemIsString = typeof item === 'string';
        //     let isItemIsNumber = Number.isInteger(item);
        //     let isDefaultType = isDefinedDefaultWordInFirstOfString(item);
        //
        //
        //     if (isValidType || isDefaultType) {
        //         newArrayForOptionsContains.push(item);
        //         return;
        //     }
        //
        //
        //     if ((!isNextItemIsNumber && isItemIsNumber) || isItemIsString) {
        //         isValueOfIndexIsNumber = true;
        //         newArrayOfValue.push(item);
        //     }
        //
        //     if (isNextItemIsNumber && isItemIsNumber) {
        //         isDefinedValueInIndexTwoOfArray = true;
        //         newArrayOfValue.push(item);
        //     }
        //
        //
        // });
        //
        //
        // let stringOfOptionContains = getArrayToString(newArrayForOptionsContains);
        // let validateStringOfOptionContains = (stringOfOptionContains === undefined) ? ' ' : stringOfOptionContains;
        //
        // if (isEnum || isSet)
        //     return (`${type}(${getStringOfValueForEnumOrSetDataTypesWithComma(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();
        //
        // if (isValueOfIndexIsNumber && !isDefinedValueInIndexTwoOfArray && (!isEnum || !isSet))
        //     return (`${type}(${(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();
        //
        // if ((isDecimal || isFloat || isReal || isDouble))
        //     return (`${type}(${(newArrayOfValue)}) ${validateStringOfOptionContains}`).trim();
        //
        // return (type + ' ' + validateStringOfOptionContains).trim();
        return '';
    }

}