import {CRUD, Option, Ref} from '../../../package/type/db/Query';

export default interface Database {

    find(query?: CRUD | Option, option?: Option): Promise<any>;

    findOne(query?: CRUD | Option, option?: Option): Promise<any>;

    findMany(query?: CRUD | Option, option?: Option): Promise<any>;


    update(query?: CRUD | Option, option?: Option): Promise<any>;

    updateOne(query?: CRUD | Option, option?: Option): Promise<any>;

    updateMany(query?: CRUD | Option, option?: Option): Promise<any>;


    remove(query?: CRUD | Option, option?: Option): Promise<any>;

    removeOne(query?: CRUD | Option, option?: Option): Promise<any>;

    removeMany(query?: CRUD | Option, option?: Option): Promise<any>;


    add(crud?: CRUD): Promise<any>;

    addOne(crud?: CRUD): Promise<any>;

    addMany(crud?: CRUD): Promise<any>;


    createDatabase(name: string, set?: string, collate?: string): Promise<any>;

    dropDatabase(name: string): Promise<any>;

    dropTable(tableName: string | string[], databaseName?: string | string[]): Promise<any>;


    foreignKey(ref: Ref): Promise<any>;

    query(sql: string, injection?: any): Promise<any>;

}