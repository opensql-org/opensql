import {CRUD, Option, Ref} from '../../../package/type/db/Query';
import Connection from './Connection';

export default abstract class Database extends Connection {

    abstract find(crud?: CRUD, option?: Option): Promise<any>;

    abstract findOne(crud?: CRUD, option?: Option): Promise<any>;

    abstract findMany(crud?: CRUD, option?: Option): Promise<any>;


    abstract update(crud?: CRUD, option?: Option): Promise<any>;

    abstract updateOne(crud?: CRUD, option?: Option): Promise<any>;

    abstract updateMany(crud?: CRUD, option?: Option): Promise<any>;


    abstract remove(crud?: CRUD, option?: Option): Promise<any>;

    abstract removeOne(crud?: CRUD, option?: Option): Promise<any>;

    abstract removeMany(crud?: CRUD, option?: Option): Promise<any>;


    abstract add(crud?: CRUD): Promise<any>;

    abstract addOne(crud?: CRUD): Promise<any>;

    abstract addMany(crud?: CRUD): Promise<any>;


    abstract dropDatabase(name: string | string[]): Promise<any>;

    abstract dropTable(tableName: string | string[], databaseName?: string | string[]): Promise<any>;


    abstract foreignKey(ref: Ref): Promise<any>;

    abstract query(sql: string, injection?: any): Promise<any>;

}