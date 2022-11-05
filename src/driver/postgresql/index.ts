import {Client} from 'pg';
import DatabaseDriver from '../../common/DatabaseDriver';

export default class Postgresql extends DatabaseDriver {

    protected connection: any;

    async connect(url: string, option?: object): Promise<any> {
        let config = super.connector(url, option);
        return this.connection = new Client(config);
    }

    async execute(sql: string, queryOption?: any): Promise<any> {
        let objBuilder = {
            text: sql
        };

        if (!queryOption)
            return await this.connection.query(objBuilder);

        return await this.connection.query({values: queryOption, ...objBuilder});
    }

    async disconnect() {
        await this.connection.end();
    }

}