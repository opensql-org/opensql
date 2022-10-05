import Database from './Database';
import {CRUD, Ref, Option} from '../../../package/type/db/Query';
import DriverFactory from './DriverFactory';
import Mysql from '../../driver/mysql';
import Util from '../../util/Util';

const Utilities = Util.getInstance(),
    instanceClass = {
        mysql: Mysql
    };


export default class DatabaseFactory extends DriverFactory {

    private driver: Database;

    protected factory(str: string) {
        // @ts-ignore
        this.driver = new instanceClass[Utilities.getDriverNameFromString(str)]();
    }

    constructor(url: string, option?: object) {
        super();
        this.factory(url);
        this.connect(url, option);
    }

    async find(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.find(query, option);
    }

    async findOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.findOne(query, option);
    }

    async findMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.findMany(query, option);
    }


    async update(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.update(query, option);
    }

    async updateOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.updateOne(query, option);
    }

    async updateMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.updateMany(query, option);
    }


    async remove(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.remove(query, option);
    }

    async removeOne(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.removeOne(query, option);
    }

    async removeMany(query?: CRUD | Option, option?: Option): Promise<any> {
        return this.driver.removeMany(query, option);
    }


    async add(crud?: CRUD): Promise<any> {
        return this.driver.add(crud);
    }

    async addOne(crud?: CRUD): Promise<any> {
        return this.driver.addOne(crud);
    }

    async addMany(crud?: CRUD): Promise<any> {
        return this.driver.addMany(crud);
    }


    async dropDatabase(name: string | string[]): Promise<any> {
        return this.driver.dropDatabase(name);
    }

    async dropTable(tableName: string | string[], databaseName?: string | string[]): Promise<any> {
        return this.driver.dropTable(tableName, databaseName);
    }


    async foreignKey(ref: Ref): Promise<any> {
        return this.driver.foreignKey(ref);
    }

    async query(sql: string, injection?: any): Promise<any> {
        return this.driver.query(sql, injection);
    }


    protected async connect(url: string, option?: object) {
        this.driver.connect(url, option);
    }

    disconnect() {
        this.driver.disconnect();
    }

}