import DatabaseDriver from '../../common/DatabaseDriver';
import * as mssql from 'mssql';
import { config, ConnectionPool } from 'mssql';

export default class Mssql extends DatabaseDriver {
  protected connection: ConnectionPool;

  async connect(url: string, option?: object): Promise<any> {
    const config: mssql.config = this.connector(url, option) as config;
    return (this.connection = await mssql.connect(config));
  }

  async execute(sql: string, queryOption?: any): Promise<any> {
    return this.connection.query(sql, queryOption);
  }

  async disconnect(): Promise<void> {
    await this.connection.close();
  }
}
