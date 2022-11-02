import {Alter, CreateTable, Option, Query} from '../../package/type/db/Query';
import DriverController from './db/DriverController';
import DriverConnection from './db/DriverConnection';
import {JSONObject} from '../../package/typing';
import Builder from './query/Builder';
import Util from '../util/Util';


let Utils = Util.getInstance();


export default abstract class DatabaseDriver extends DriverController implements DriverConnection {


    protected connection: any;

    private queryBuilder = new Builder();


    async find(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.find(query, option), this.queryBuilder.injection());
    }

    async findOne(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.findOne(query, option), this.queryBuilder.injection());
    }

    async findMany(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.findMany(query), this.queryBuilder.injection());
    }


    async update(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.update(query), this.queryBuilder.injection());
    }

    async updateOne(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.updateOne(query, option), this.queryBuilder.injection());
    }

    async updateMany(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.updateMany(query), this.queryBuilder.injection());
    }


    async remove(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.remove(query), this.queryBuilder.injection());
    }

    async removeOne(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.removeOne(query, option), this.queryBuilder.injection());
    }

    async removeMany(query?: Query | Option, option?: Option): Promise<any> {
        return await this.execute(this.queryBuilder.removeMany(query), this.queryBuilder.injection());
    }


    async add(query?: Query): Promise<any> {
        return await this.execute(this.queryBuilder.add(query));
    }

    async addOne(query?: Query): Promise<any> {
        return await this.execute(this.queryBuilder.addOne(query), this.queryBuilder.injection());
    }

    async addMany(query?: Query): Promise<any> {
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

    async dropTable(tableName: string | string[], databaseName?: string): Promise<any> {
        return await this.execute(this.queryBuilder.dropTable(tableName,
            !databaseName ? this.getName() : databaseName));
    }


    async alter(alter: Alter): Promise<any> {
        return await this.execute(this.queryBuilder.alter(alter));
    }


    async query(sql: string, injection?: any): Promise<any> {
        return await this.execute(sql, injection);
    }


    abstract connect(url: string, option?: object): Promise<any>;


    connector(url: string, option?: object): JSONObject {
        const connectionObject = Utils.urlHandler(url, option);
        // @ts-ignore
        let isExistDatabase = connectionObject?.database;

        if (isExistDatabase)
            this.setName(isExistDatabase);

        return connectionObject;
    }

    abstract disconnect(): void;


    abstract execute(sql: string, queryOption?: any): Promise<any>;

}