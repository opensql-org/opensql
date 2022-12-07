import {JSONObject} from '../../typing';
import {ForeignKey} from '../../type/db/Query';
import {RefState} from '../../enum/helper';

function stateHandler(onUpdate: RefState, onDelete: RefState) {
    return `${onUpdate ? `ON UPDATE ${onUpdate}` : ''} ${onDelete ? `ON DELETE ${onDelete}` : ''}`.trim();
}

let list = {
    0: (fk: ForeignKey): string => {
        return `, FOREIGN KEY (${fk.get}) REFERENCES ${fk.to}(${fk.column}) ${stateHandler(fk.onUpdate, fk.onDelete)}`.trim();
    }
}

export let foreignKey: JSONObject = {

    mysql: {
        query: (fk: ForeignKey) => list['0'](fk)
    },
    mssql: {
        query: (fk: ForeignKey) => list['0'](fk)
    },
    postgresql: {
        query: (fk: ForeignKey) => list['0'](fk)
    }

}