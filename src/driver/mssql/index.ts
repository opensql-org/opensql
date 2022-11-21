import * as mssql from 'mssql';
import DatabaseDriver from '../../common/DatabaseDriver';

export default class Mssql extends DatabaseDriver {

    protected connection: any;

    async connect(url: string, option?: object): Promise<any> {
        let config = this.connector(url, option);
        return this.connection = await mssql.connect(config);
    }

    async execute(sql: string, queryOption?: any): Promise<any> {
        return await this.connection.query(sql, queryOption);
    }

    async disconnect() {
        let connection = await this.connection;
        await connection.close();
    }

}