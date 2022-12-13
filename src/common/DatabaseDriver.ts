import {CreateTable, Query} from '../../package/type/db/Query';
import DriverController from './db/DriverController';
import DriverConnection from './db/DriverConnection';
import {JSONObject} from '../../package/typing';
import Builder from './query/Builder';
import Util from '../util/Util';


let Utils = Util.getInstance();


export default abstract class DatabaseDriver extends DriverController implements DriverConnection {


    protected connection: any;

    private queryBuilder = new Builder();


    async find(query: Query): Promise<any> {
        return await this.execute(this.queryBuilder.find(query), this.queryBuilder.injection());
    }

    async findOne(query: Query): Promise<any> {
        return await this.execute(this.queryBuilder.findOne(query), this.queryBuilder.injection());
    }

    async findMany(query: Query, limit?: number): Promise<any> {
        return await this.execute(this.queryBuilder.findMany(query, limit), this.queryBuilder.injection());
    }


    async update(query: Query): Promise<any> {
        return await this.execute(this.queryBuilder.update(query), this.queryBuilder.injection());
    }


    async remove(query: Query): Promise<any> {
        return await this.execute(this.queryBuilder.remove(query), this.queryBuilder.injection());
    }


    async addOne(query: Query): Promise<any> {
        return await this.execute(this.queryBuilder.addOne(query), this.queryBuilder.injection());
    }

    async addMany(query: Query): Promise<any> {
        return await this.execute(this.queryBuilder.addMany(query));
    }


    async createDatabase(name: string, set?: string, collate?: string): Promise<any> {
        this.setName(name);
        return await this.execute(this.queryBuilder.createDatabase(name, set, collate));
    }

    async dropDatabase(name: string): Promise<any> {
        return await this.execute(this.queryBuilder.dropDatabase(name));
    }


    async createTable(ct: CreateTable): Promise<any> {
        return await this.execute(this.queryBuilder.createTable(ct, this.getName()));
    }

    async dropTable(tableName: string | string[]): Promise<any> {
        return await this.execute(this.queryBuilder.dropTable(tableName));
    }

    async truncateTable(tableName: string): Promise<any> {
        return await this.execute(this.queryBuilder.truncateTable(tableName));
    }


    async query(sql: string, injection?: any): Promise<any> {
        return await this.execute(sql, injection);
    }


    abstract connect(url: string, option?: object): Promise<any>;


    connector(url: string, option?: object): JSONObject {
        const connectionObject = Utils.urlHandler(url, option);
        // @ts-ignore
        let isExistDatabase = connectionObject?.database;

        /**
         * Searching database name in config object.
         */
        if (isExistDatabase)
            this.setName(isExistDatabase);

        /**
         *  Setting the
         *  @member driverName variable in the
         *  @class Builder class to handle sql and injections in different databases.
         */
        this.queryBuilder.setDriverName(Utils.getDriverNameFromString(url));

        return connectionObject;
    }

    abstract disconnect(): void;


    abstract execute(sql: string, queryOption?: any): Promise<any>;

}