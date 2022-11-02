import * as DB from 'mysql2';
import DatabaseDriver from '../../common/DatabaseDriver';

export default class Mysql extends DatabaseDriver {

    protected connection: DB.Connection;

    async connect(url: string, option?: object): Promise<any> {
        let config = super.connector(url, option);
        return this.connection = DB.createConnection(config);
    }

    async execute(sql: string, queryOption?: any): Promise<any> {
        return await this.connection.promise().query(sql, queryOption);
    }

    async disconnect() {
        await this.connection.end();
    }

}