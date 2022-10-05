import {CRUD, Option, Ref} from '../../../package/type/db/Query';
import DismissConnection from './DismissConnection';
import Connectable from './Connectable';

export default abstract class Database implements DismissConnection,Connectable {

    abstract find(query?: CRUD | Option, option?: Option): Promise<any>;

    abstract findOne(query?: CRUD | Option, option?: Option): Promise<any>;

    abstract findMany(query?: CRUD | Option, option?: Option): Promise<any>;


    abstract update(query?: CRUD | Option, option?: Option): Promise<any>;

    abstract updateOne(query?: CRUD | Option, option?: Option): Promise<any>;

    abstract updateMany(query?: CRUD | Option, option?: Option): Promise<any>;


    abstract remove(query?: CRUD | Option, option?: Option): Promise<any>;

    abstract removeOne(query?: CRUD | Option, option?: Option): Promise<any>;

    abstract removeMany(query?: CRUD | Option, option?: Option): Promise<any>;


    abstract add(crud?: CRUD): Promise<any>;

    abstract addOne(crud?: CRUD): Promise<any>;

    abstract addMany(crud?: CRUD): Promise<any>;


    abstract dropDatabase(name: string | string[]): Promise<any>;

    abstract dropTable(tableName: string | string[], databaseName?: string | string[]): Promise<any>;


    abstract foreignKey(ref: Ref): Promise<any>;

    abstract query(sql: string, injection?: any): Promise<any>;


    abstract connect(url: string, option?: object): void;

    abstract disconnect(): void;

}