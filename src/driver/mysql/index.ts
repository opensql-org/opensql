import {CRUD, Ref, Option} from '../../../package/type/db/Query';
import DriverConnection from '../../common/db/DriverConnection';
import Util from '../../util/Util';
import DB from 'mysql2';
import Builder from '../../common/query/Builder';

let Utils = Util.getInstance();

export default class Mysql implements DriverConnection {

    private connection: DB.Connection;

    private queryBuilder = new Builder();

    async find(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query, option), this.queryBuilder.injection());
    }

    async findOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.findOne(query, option), this.queryBuilder.injection());
    }

    async findMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query), this.queryBuilder.injection());
    }


    async update(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query), this.queryBuilder.injection());
    }

    async updateOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.updateOne(query, option), this.queryBuilder.injection());
    }

    async updateMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query), this.queryBuilder.injection());
    }


    async remove(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query), this.queryBuilder.injection());
    }

    async removeOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.removeOne(query, option), this.queryBuilder.injection());
    }

    async removeMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(query), this.queryBuilder.injection());
    }


    async add(crud?: CRUD): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(crud));
    }

    async addOne(crud?: CRUD): Promise<any> {
        return this.connection.query(this.queryBuilder.addOne(crud), this.queryBuilder.injection());
    }

    async addMany(crud?: CRUD): Promise<any> {
        return this.connection.query(this.queryBuilder.sql(crud));
    }


    async dropDatabase(name: string | string[]): Promise<any> {
        return Promise.resolve(undefined);
    }

    async dropTable(tableName: string | string[], databaseName?: string | string[]): Promise<any> {
        return Promise.resolve(undefined);
    }


    async foreignKey(ref: Ref): Promise<any> {
        return Promise.resolve(undefined);
    }

    async query(sql: string, injection?: any): Promise<any> {
        return this.connection.query(sql, injection);
    }


    async connect(url: string, option?: object): Promise<any> {
        return this.connection = DB.createConnection(Utils.urlHandler(url, option));
    }

    async disconnect(): Promise<any> {
        return this.connection.end();
    }


}