import { JSONObject } from '../../../typing';
import types from '../../../sql/Types';

const list = {
  0: (str: string, type: string): string => {
    return str.replace(type, `${types.geometry}(${types.linestring})`);
  },
  1: (str: string): string => {
    return str;
  },
  2: (str: string, type: string): string => {
    return str.replace(type, types.geography);
  },
};

export const lineString: JSONObject = {
  postgresql: {
    query: (str: string, type: string) => list['0'](str, type),
  },
  mysql: {
    query: (str: string, type: string) => list['1'](str),
  },
  mssql: {
    query: (str: string, type: string) => list['2'](str, type),
  },
};
