import {
  CreateTable,
  FilterWithId,
  Query,
  TargetTable,
} from '../../../package/type/db/Query';

export default interface Database {
  find(query: Query): Promise<any>;

  findOne(query: Query): Promise<any>;

  findById(id: number, filter: FilterWithId): Promise<any>;

  findMany(query: Query, limit?: number): Promise<any>;

  update(query: Query): Promise<any>;

  remove(query: Query): Promise<any>;

  addOne(query: Query): Promise<any>;

  addWithFind(
    targetTableName: string | TargetTable,
    query: Query,
  ): Promise<any>;

  addMany(query: Query): Promise<any>;

  createDatabase(name: string, set?: string, collate?: string): Promise<any>;

  dropDatabase(name: string): Promise<any>;

  createTable(ct: CreateTable): Promise<any>;

  dropTable(tableName: string | string[]): Promise<any>;

  truncateTable(tableName: string): Promise<any>;

  query(sql: string, injection?: any): Promise<any>;
}
