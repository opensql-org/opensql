import {Query, Ref, Option, CreateTable} from '../../../package/type/db/Query';
import DriverConnection from '../../common/db/DriverConnection';
import Util from '../../util/Util';
import DB from 'mysql2';
import Builder from '../../common/query/Builder';
import DriverController from '../../common/db/DriverController';

let Utils = Util.getInstance();

export default class Mysql extends DriverController implements DriverConnection {

    private connection: DB.Connection;


    private queryBuilder = new Builder();


    async find(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query, option), this.queryBuilder.injection());
    }

    async findOne(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.findOne(query, option), this.queryBuilder.injection());
    }

    async findMany(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.findMany(query), this.queryBuilder.injection());
    }


    async update(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query), this.queryBuilder.injection());
    }

    async updateOne(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.updateOne(query, option), this.queryBuilder.injection());
    }

    async updateMany(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.updateMany(query), this.queryBuilder.injection());
    }


    async remove(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query), this.queryBuilder.injection());
    }

    async removeOne(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.removeOne(query, option), this.queryBuilder.injection());
    }

    async removeMany(query?: Query | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.removeMany(query), this.queryBuilder.injection());
    }


    async add(query?: Query): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query));
    }

    async addOne(query?: Query): Promise<any> {
        return this.connection.query(this.queryBuilder.addOne(query), this.queryBuilder.injection());
    }

    async addMany(query?: Query): Promise<any> {
        return this.connection.query(this.queryBuilder.addMany(query));
    }


    async createDatabase(name: string, set?: string, collate?: string): Promise<any> {
        this.setName(name);
        return this.connection.query(this.queryBuilder.createDatabase(name, set, collate));
    }

    async dropDatabase(name: string): Promise<any> {
        return this.connection.query(this.queryBuilder.dropDatabase(name));
    }


    async createTable(ct: CreateTable): Promise<any> {
        return this.connection.query(this.queryBuilder.createTable(ct, this.getName()));
    }

    async dropTable(tableName: string | string[], databaseName?: string): Promise<any> {
        return this.connection.query(this.queryBuilder.dropTable(tableName,
            !databaseName ? this.getName() : databaseName));
    }


    async foreignKey(ref: Ref): Promise<any> {
        return Promise.resolve(undefined);
    }

    async query(sql: string, injection?: any): Promise<any> {
        return this.connection.query(sql, injection);
    }


    async connect(url: string, option?: object): Promise<any> {
        const connectionObject = Utils.urlHandler(url, option);
        // @ts-ignore
        let isExistDatabase = connectionObject?.database;

        if (isExistDatabase)
            this.setName(isExistDatabase);

        return this.connection = DB.createConnection(connectionObject);
    }

    async disconnect(): Promise<any> {
        return this.connection.end();
    }


}