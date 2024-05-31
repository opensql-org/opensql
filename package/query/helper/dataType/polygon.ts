import { JSONObject } from '../../../typing';
import types from '../../../sql/Types';

const list = {
  0: (str: string, type: string): string => {
    return str.replace(type, types.geometry);
  },
  1: (str: string): string => {
    return str;
  },
};

export const polygon: JSONObject = {
  mysql: {
    query: (str: string, type: string) => list['1'](str),
  },
  mssql: {
    query: (str: string, type: string) => list['0'](str, type),
  },
  postgresql: {
    query: (str: string, type: string) => list['1'](str),
  },
};
