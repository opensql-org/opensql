import { ForeignKey } from '../../type/db/Query';
import { RefState } from '../../enum/helper';
import { JSONObject } from '../../typing';

function stateHandler(onUpdate: RefState, onDelete: RefState): string {
  return `${onUpdate ? `ON UPDATE ${onUpdate}` : ' '} ${onDelete ? `ON DELETE ${onDelete}` : ' '}`.trim();
}

type ForeignKeyCallBack = {
  [key: number]: (fk: ForeignKey) => string;
};

const list: ForeignKeyCallBack = {
  0: (fk: ForeignKey): string => {
    return `,FOREIGN KEY (${fk.get}) REFERENCES ${fk.to}(${fk.column}) ${stateHandler(fk.onUpdate, fk.onDelete)}`;
  },
};

export let foreignKey: JSONObject = {
  mysql: {
    query: (fk: ForeignKey) => list['0'](fk),
  },
  mssql: {
    query: (fk: ForeignKey) => list['0'](fk),
  },
  postgresql: {
    query: (fk: ForeignKey) => list['0'](fk),
  },
};
