import {
  CreateTable,
  FilterWithId,
  ForeignKey,
  ForeignKeyObject,
  Query,
  TargetTable,
} from '../../../package/type/db/Query';
import dataTypeHandler from '../../../package/query/helper/dataType';
import { foreignKey } from '../../../package/query/helper/foreignKey';
import { JSONObject } from '../../../package/typing';
import keyword from '../../../package/sql/Keyword';
import Util from '../../util/Util';

let { jsonToString } = Util.getInstance();

export default class Builder {
  private queryInjection: any[] = [];

  private driverName: string = '';

  private sqlParserHandler(config: JSONObject, query: unknown): string {
    if (!query) {
      return;
    }

    const SqlParser = require('../../../../lib/sql-parser');
    const sp = new SqlParser({ type: this.driverName, ...config }, query);
    const injection = sp.injection();

    if (injection) {
      this.queryInjection = injection;
    }

    return sp.toSQL();
  }

  private static sqlParserConfigHandler(
    type: string,
    operationType?: string,
  ): JSONObject {
    if (!operationType) {
      type = 'one';
    }

    return {
      operation: { [operationType]: type },
      operationType: operationType,
    };
  }

  setDriverName(driverName: string): void {
    this.driverName = driverName;
  }

  injection(): Array<any> {
    return this.queryInjection;
  }

  find(query: Query): string {
    return this.sqlParserHandler(
      Builder.sqlParserConfigHandler('multi', 'select'),
      query,
    );
  }

  findOne(query: Query): string {
    query.option.$limit = 1;
    return this.sqlParserHandler(
      Builder.sqlParserConfigHandler('one', 'select'),
      query,
    );
  }

  findById(id: number, filter: FilterWithId): string {
    return this.sqlParserHandler(
      Builder.sqlParserConfigHandler('one', 'select'),
      {
        ...filter,
        where: {
          id: id,
        },
      },
    );
  }

  findMany(query: Query, limit?: number): string {
    query.option.$limit = !limit ? 10 : limit;
    return this.sqlParserHandler(
      Builder.sqlParserConfigHandler('multi', 'select'),
      query,
    );
  }

  update(query: Query): string {
    return this.sqlParserHandler(
      Builder.sqlParserConfigHandler('multi', 'update'),
      query,
    );
  }

  remove(query: Query): string {
    return this.sqlParserHandler(
      Builder.sqlParserConfigHandler('multi', 'delete'),
      query,
    );
  }

  addOne(query: Query): string {
    return this.sqlParserHandler(
      Builder.sqlParserConfigHandler('one', 'insert'),
      query,
    );
  }

  addWithFind(targetTableName: string | TargetTable, query: Query): string {
    let sql: string = this.sqlParserHandler(
      Builder.sqlParserConfigHandler('insertWithSelect'),
      {
        target: targetTableName,
      },
    );

    sql += this.sqlParserHandler(
      Builder.sqlParserConfigHandler('multi', 'select'),
      query,
    );

    return sql;
  }

  addMany(query: Query): string {
    return this.sqlParserHandler(
      Builder.sqlParserConfigHandler('multi', 'insert'),
      query,
    );
  }

  createDatabase(
    name: string,
    set: string = 'UTF8',
    collate: string = 'UTF8_UNICODE_CI',
  ): string {
    return [
      keyword.CREATE,
      keyword.DATABASE,
      keyword.IF_NOT_EXISTS,
      name,
      'CHARACTER',
      keyword.SET,
      set,
      'COLLATE',
      collate,
    ].join(' ');
  }

  dropDatabase(name: string): string {
    return [keyword.DROP, keyword.DATABASE, name].join(' ');
  }

  /**
   * @param ct
   * @param dbName
   * Used to handle different query for different database.
   */
  createTable(ct: CreateTable, dbName: string): string {
    const hasForeignKey: ForeignKeyObject = ct?.foreignKey;
    const tableName: string = ct?.table;

    for (const key in ct?.column) {
      let value: string = ct.column[key],
        hasMatchForeignKey: ForeignKey = hasForeignKey?.[key];

      ct.column[key] = dataTypeHandler(dbName, value, key);

      if (hasMatchForeignKey) {
        let fkQuery = foreignKey[dbName]?.query(hasForeignKey[key]);

        ct.column[key] = `${value} ${fkQuery}`;
      }
    }

    return [
      keyword.CREATE,
      keyword.TABLE,
      keyword.IF_NOT_EXISTS,
      tableName,
      '(',
      jsonToString(ct.column),
      ct?.index ? `, INDEX(${ct?.index})` : '',
      ct?.unique ? `, UNIQUE(${ct?.unique})` : '',
      ct?.primaryKey ? `, PRIMARY KEY (${ct?.primaryKey})` : '',
      ')',
    ]
      .filter(str => str)
      .join(' ');
  }

  dropTable(tableName: string | string[]): string {
    return [keyword.DROP, keyword.TABLE, keyword.IF_EXISTS, tableName].join(
      ' ',
    );
  }

  truncateTable(tableName: string): string {
    return [keyword.TRUNCATE, keyword.TABLE, tableName].join(' ');
  }
}
