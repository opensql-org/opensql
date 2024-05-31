import DatabaseDriver from '../../common/DatabaseDriver';
import { JSONObject } from '../../../package/typing';
import { Client } from 'pg';

export default class Postgresql extends DatabaseDriver {
  protected connection: Client;

  async connect(url: string, option?: object): Promise<any> {
    const config: JSONObject = this.connector(url, option);
    return (this.connection = new Client(config));
  }

  async execute(sql: string, queryOption?: any): Promise<any> {
    const objBuilder: { text: string } = {
      text: sql,
    };

    if (!queryOption) {
      return this.connection.query(objBuilder);
    }

    return this.connection.query({
      values: queryOption,
      ...objBuilder,
    });
  }

  async disconnect(): Promise<void> {
    await this.connection.end();
  }
}
