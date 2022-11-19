import {CreateTable, Query, Option} from '../../../package/type/db/Query';

export default interface Database {

    find(query?: Query | Option, option?: Option): Promise<any>;

    findOne(query?: Query | Option, option?: Option): Promise<any>;

    findMany(query?: Query | Option, option?: Option): Promise<any>;


    update(query?: Query | Option, option?: Option): Promise<any>;

    updateOne(query?: Query | Option, option?: Option): Promise<any>;

    updateMany(query?: Query | Option, option?: Option): Promise<any>;


    remove(query?: Query | Option, option?: Option): Promise<any>;

    removeOne(query?: Query | Option, option?: Option): Promise<any>;

    removeMany(query?: Query | Option, option?: Option): Promise<any>;


    add(query?: Query): Promise<any>;

    addOne(query?: Query): Promise<any>;

    addMany(query?: Query): Promise<any>;


    createDatabase(name: string, set?: string, collate?: string): Promise<any>;

    dropDatabase(name: string): Promise<any>;


    createTable(ct: CreateTable): Promise<any>;

    dropTable(tableName: string | string[], databaseName?: string): Promise<any>;

    truncateTable(tableName: string): Promise<any>;


    query(sql: string, injection?: any): Promise<any>;

}