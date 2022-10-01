import {CRUD, Option} from '../../../package/type/db/Query';

export default abstract class Database {

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

}