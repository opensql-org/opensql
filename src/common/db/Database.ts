import {Where, Option} from '../../../package/type/db/Query';

export default abstract class Database {

    abstract find(where?: Where, option?: Option): Promise<any>;

    abstract findOne(where?: Where, option?: Option): Promise<any>;

    abstract findMany(where?: Where, option?: Option): Promise<any>;


    abstract update(where?: Where, option?: Option): Promise<any>;

    abstract updateOne(where?: Where, option?: Option): Promise<any>;

    abstract updateMany(where?: Where, option?: Option): Promise<any>;


    abstract remove(where?: Where, option?: Option): Promise<any>;

    abstract removeOne(where?: Where, option?: Option): Promise<any>;

    abstract removeMany(where?: Where, option?: Option): Promise<any>;


    abstract add(where?: Where): Promise<any>;

    abstract addOne(where?: Where): Promise<any>;

    abstract addMany(where?: Where): Promise<any>;

}