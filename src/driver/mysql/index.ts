import Database from '../../common/db/Database';
import {CRUD, Ref, Option} from '../../../package/type/db/Query';

export default class Mysql extends Database {


    async find(crud?: CRUD, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async findOne(crud?: CRUD, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async findMany(crud?: CRUD, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }


    async update(crud?: CRUD, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async updateOne(crud?: CRUD, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async updateMany(crud?: CRUD, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }


    async remove(crud?: CRUD, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async removeOne(crud?: CRUD, option?: Option): Promise<any> {
        return Promise.resolve(undefined);
    }

    async removeMany(crud?: CRUD, option?: Option): Promise<any> {
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


    protected async connect(url: string, option?: object): Promise<any> {
        return Promise.resolve(undefined);
    }

    async disconnect(): Promise<any> {
        return Promise.resolve(undefined);
    }


}