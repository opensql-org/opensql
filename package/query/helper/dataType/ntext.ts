import { JSONObject } from '../../../typing';
import types from '../../../sql/Types';

const list = {
  0: (str: string, type: string): string => {
    return str.replace(type, types.text);
  },
  1: (str: string): string => {
    return str;
  },
};

export let ntext: JSONObject = {
  mysql: {
    query: (str: string, type: string) => list['0'](str, type),
  },
  mssql: {
    query: (str: string, type: string) => list['1'](str),
  },
  postgresql: {
    query: (str: string, type: string) => list['0'](str, type),
  },
};
