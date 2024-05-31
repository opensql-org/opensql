import { ConnectionInfo, Database } from '../../package/type/db/Query';
import keyword from '../../package/sql/Keyword';
import types from '../../package/sql/Types';
import { getPort } from './defaults';

function isDefinedDefaultWordInFirstOfString(str: string): boolean {
  if (typeof str === 'string') {
    return str.search(keyword.DEFAULT) === 0;
  }

  return false;
}

function isDefinedCommentWordInFirstOfString(str: string): boolean {
  if (typeof str === 'string') {
    return str.search(keyword.COMMENT) === 0;
  }

  return false;
}

function arrayToString(arr: Array<string>): string {
  return arr.toString().replace(',', ' ').trim();
}

function addCommaAndQuotation(arr: Array<string>): string {
  return arr.map((s: string) => `'${s}'`).join(', ');
}

export default class Util {
  private constructor() {}

  private static instance: Util;

  public static getInstance(): Util {
    if (!Util.instance) {
      Util.instance = new Util();
    }

    return Util.instance;
  }

  getDriverNameFromString(str: string): string {
    return str.split(':')[0];
  }

  /**
   * @param {String} url
   * @param {Object} option
   */
  urlHandler(url: string, option: object = {}): ConnectionInfo {
    const arr: string[] = url.split('/').filter(s => s);
    const network: string[] = arr[1]?.split(':');
    const databaseType: Database = arr[0] as Database;
    const credential: string[] = arr[2]?.split('?');
    const databaseName = credential[0];
    const auth: { user?: string; password?: string } = {};

    for (const str of credential[1]?.split('&') ?? []) {
      const _auth: string[] = str.split('=');
      const key = _auth[0] as keyof typeof auth;

      if (key in auth) {
        auth[key] = _auth[1];
      }
    }

    let finalObject: ConnectionInfo = {
      port: network[1] ?? getPort(databaseType).toString(),
      password: auth?.password,
      dbName: databaseName,
      user: auth?.user,
      host: network[0],
    };

    if (option) {
      finalObject = { ...finalObject, ...option };
    }

    return finalObject;
  }

  dataTypeHandler(type: string, data?: number | any[]): string {
    if (!data) {
      return type;
    }

    const newArrayOfValue: string[] = [];
    let isValueOfIndexIsNumber: boolean = false;
    const newArrayForOptionsContains: string[] = [];
    let isDefinedValueInIndexTwoOfArray: boolean = false;

    const arrayOfValidType = [
      keyword.NULL,
      keyword.NOT_NULL,
      keyword.AUTO_INCREMENT,
    ];

    if (!Array.isArray(data) || typeof data === 'number') {
      return `${type}(${data})`.trim();
    }

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const nextItem = data[i + 1];
      const isItemIsNumber: boolean = Number.isInteger(item);
      const isItemIsString: boolean = typeof item === 'string';
      const isValidType: boolean = arrayOfValidType.includes(item);
      const isNextItemIsNumber: boolean = Number.isInteger(nextItem);
      const isDefaultType: boolean = isDefinedDefaultWordInFirstOfString(item);
      const isCommentFunction: boolean =
        isDefinedCommentWordInFirstOfString(item);

      if (isValidType || isDefaultType || isCommentFunction) {
        newArrayForOptionsContains.push(item);
        continue;
      }

      if ((!isNextItemIsNumber && isItemIsNumber) || isItemIsString) {
        isValueOfIndexIsNumber = true;
        newArrayOfValue.push(item);
      }

      if (isNextItemIsNumber && isItemIsNumber) {
        isDefinedValueInIndexTwoOfArray = true;
        newArrayOfValue.push(item);
      }
    }

    const stringOfOptionContains: string = arrayToString(
      newArrayForOptionsContains,
    );
    const validateStringOfOptionContains: string = !stringOfOptionContains
      ? ' '
      : stringOfOptionContains;

    const isDecimal: boolean = type === types.decimal;
    const isDouble: boolean = type === types.double;
    const isFloat: boolean = type === types.float;
    const isReal: boolean = type === types.real;
    const isEnum: boolean = type === types.enum;
    const isSet: boolean = type === types.set;

    if (isEnum || isSet) {
      return `${type}(${addCommaAndQuotation(newArrayOfValue)}) ${validateStringOfOptionContains}`.trim();
    }

    if (
      isValueOfIndexIsNumber &&
      !isDefinedValueInIndexTwoOfArray &&
      (!isEnum || !isSet)
    ) {
      return `${type}(${newArrayOfValue}) ${validateStringOfOptionContains}`.trim();
    }

    if (isDecimal || isFloat || isReal || isDouble) {
      return `${type}(${newArrayOfValue}) ${validateStringOfOptionContains}`.trim();
    }

    return `${type} ${validateStringOfOptionContains}`.trim();
  }

  jsonToString(object: object, replaceValue: string = ', '): string {
    return JSON.stringify(object)
      .replace(/[{"}]/g, '')
      .replace(/:/g, ' ')
      .replace(/,/g, replaceValue);
  }
}
