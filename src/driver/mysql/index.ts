import {CRUD, Ref, Option} from '../../../package/type/db/Query';
import DriverConnection from '../../common/db/DriverConnection';
import Util from '../../util/Util';
import DB from 'mysql2';
import Builder from '../../common/query/Builder';
import DatabaseConfig from '../../common/db/DatabaseConfig';

let Utils = Util.getInstance();

export default class Mysql extends DatabaseConfig implements DriverConnection {


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


    async createDatabase(name: string, set?: string, collate?: string): Promise<any> {
        this.setName(name);
        return this.connection.query(this.queryBuilder.createDatabase(name, set, collate));
    }

    async dropDatabase(name: string): Promise<any> {
        return this.connection.query(this.queryBuilder.dropDatabase(name));
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