import DatabaseDriver from '../../common/DatabaseDriver';
import { JSONObject } from '../../../package/typing';
import * as DB from 'mysql2';

export default class Mysql extends DatabaseDriver {
  protected connection: DB.Connection;

  async connect(url: string, option?: object): Promise<any> {
    const config: JSONObject = this.connector(url, option);
    return (this.connection = DB.createConnection(config));
  }

  async execute(sql: string, queryOption?: any): Promise<any> {
    return this.connection.promise().query(sql, queryOption);
  }

  async disconnect(): Promise<void> {
    this.connection.end();
  }
}
