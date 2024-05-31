import { JSONObject } from '../../../typing';
import types from '../../../sql/Types';
import Util from '../../../util/Util';
import keyword from '../../../sql/Keyword';

const list = {
  0: (str: string, type: string, columnName: string): string => {
    let isDefinedCheckConstraint: boolean = Util.searchInString(
      str,
      keyword.CHECK,
    );
    str = str.replace(type, types.varchar);

    if (isDefinedCheckConstraint) {
      return str;
    }

    const getParenthesesData: string[] = str
      .match(/VARCHAR\((.*?)\)/)[1]
      .split(',');

    const removeParenthesesWithData: string = str.replace(
      /VARCHAR\((.*?)\)/,
      'VARCHAR',
    );

    const arrayOfCheckConditions: any[] = [];

    for (let i = 0; i < getParenthesesData.length; i++) {
      let isLastIndex: boolean = getParenthesesData.length === i + 1;

      arrayOfCheckConditions.push(`${columnName}=${getParenthesesData[i]}`);

      if (!isLastIndex) {
        arrayOfCheckConditions.push('OR');
      }
    }

    return `${removeParenthesesWithData},${keyword.CHECK}(${arrayOfCheckConditions.join(' ')})`;
  },
  1: (str: string): string => {
    return str;
  },
};

export const Enum: JSONObject = {
  mysql: {
    query: (str: string, type: string, columnName: string) => list['1'](str),
  },
  mssql: {
    query: (str: string, type: string, columnName: string) =>
      list['0'](str, type, columnName),
  },
  postgresql: {
    query: (str: string, type: string, columnName: string) => list['1'](str),
  },
};
