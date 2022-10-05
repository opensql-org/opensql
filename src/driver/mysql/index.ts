import Database from '../../common/db/Database';
import {CRUD, Ref, Option} from '../../../package/type/db/Query';

export default class Mysql extends Database {


    async find(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async findOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async findMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }


    async update(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async updateOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async updateMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }


    async remove(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async removeOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async removeMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }


    async add(crud?: CRUD): Promise<any> {
        return Promise.resolve(undefined);
    }

    async addOne(crud?: CRUD): Promise<any> {
        return Promise.resolve(undefined);
    }

    async addMany(crud?: CRUD): Promise<any> {
        return Promise.resolve(undefined);
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
        return Promise.resolve(undefined);
    }


    async connect(url: string, option?: object): Promise<any> {
        return Promise.resolve(undefined);
    }

    async disconnect(): Promise<any> {
        return Promise.resolve(undefined);
    }


}