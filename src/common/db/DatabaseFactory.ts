import {CreateTable, CRUD, Ref, Option} from '../../../package/type/db/Query';
import Mysql from '../../driver/mysql';
import Util from '../../util/Util';
import DismissConnection from './DismissConnection';
import Database from './Database';
import DriverConnection from "./DriverConnection";

const Utilities = Util.getInstance(),
    instanceClass = {
        mysql: Mysql
    };


export default class DatabaseFactory implements DismissConnection, Database {

    private driver: DriverConnection;

    protected factory(str: string) {
        // @ts-ignore
        this.driver = new instanceClass[Utilities.getDriverNameFromString(str)]();
    }

    constructor(url: string, option?: object) {
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


    async createDatabase(name: string, set?: string, collate?: string): Promise<any> {
        return this.driver.createDatabase(name, set, collate);
    }

    async dropDatabase(name: string): Promise<any> {
        return this.driver.dropDatabase(name);
    }


    async createTable(ct: CreateTable): Promise<any> {
        return this.driver.createTable(ct);
    }

    async dropTable(tableName: string | string[], databaseName?: string): Promise<any> {
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

    async disconnect() {
        this.driver.disconnect();
    }

}