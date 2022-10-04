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

    async find(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.find(crud, option);
    }

    async findOne(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.findOne(crud, option);
    }

    async findMany(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.findMany(crud, option);
    }


    async update(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.update(crud, option);
    }

    async updateOne(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.updateOne(crud, option);
    }

    async updateMany(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.updateMany(crud, option);
    }


    async remove(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.remove(crud, option);
    }

    async removeOne(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.removeOne(crud, option);
    }

    async removeMany(crud?: CRUD, option?: Option): Promise<any> {
        return this.driver.removeMany(crud, option);
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


    async connect(url: string, option?: object) {
        this.driver.connect(url, option);
    }

    disconnect() {
        this.driver.disconnect();
    }

}