import { JSONObject } from '../../../typing';
import types from '../../../sql/Types';
import Util from '../../../util/Util';

const MAX_Field_LENGTH = '65535';

const list = {
  0: (str: string, type: string): string => {
    return Util.replaceDataType(str, type, [types.varchar, MAX_Field_LENGTH]);
  },
  1: (str: string): string => {
    return str;
  },
};

export const varcharMax: JSONObject = {
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
