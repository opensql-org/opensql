import { JSONObject } from '../typing';

function hasParentheses(str: string): boolean {
  return str.search('\\' + '(') !== -1;
}

export default {
  replaceDataType(str: string, replace: string, replaceWith: string[]): string {
    if (hasParentheses(str)) {
      return str.replace(replace + '(', `${replaceWith[0]}(${replaceWith[1]})`);
    }

    return str.replace(replace, `${replaceWith[0]}(${replaceWith[1]})`);
  },

  searchInString(str: string, target: string): boolean {
    return str.search(target) !== -1;
  },

  jsonArrayToString(data: any[]): any[] {
    return data.map(element => JSON.stringify(element));
  },

  jsonToString(data: JSONObject | number[] | string): string {
    const isObject: boolean = typeof data === 'object';
    return isObject ? JSON.stringify(data) : '';
  },

  isArrayOf(data: any[] | any, type: string): boolean {
    if (!Array.isArray(data)) {
      return false;
    }

    const somethingIsNotValidType: boolean = data.some(
      it => typeof it !== type,
    );

    return !somethingIsNotValidType && data.length > 0;
  },

  isJsonObject(data: any): boolean {
    return data?.constructor === {}.constructor;
  },

  arrayToStringWithDoubleQuotationMark(data: any[]): string {
    for (let i = 0; i < data.length; i++) {
      const it = data[i];

      if (typeof it !== 'string') {
        continue;
      }

      if (it.indexOf('"', 0) >= 0) {
        continue;
      }

      data[i] = `"${it}"`;
    }

    return data.join(', ');
  },
};
