import {CreateTable, Query, Option} from '../../../package/type/db/Query';
import DismissConnection from './DismissConnection';
import DriverConnection from './DriverConnection';
import Mysql from '../../driver/mysql';
import Util from '../../util/Util';
import Database from './Database';

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

    async find(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.find(query, option);
    }

    async findOne(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.findOne(query, option);
    }

    async findMany(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.findMany(query, option);
    }


    async update(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.update(query, option);
    }

    async updateOne(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.updateOne(query, option);
    }

    async updateMany(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.updateMany(query, option);
    }


    async remove(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.remove(query, option);
    }

    async removeOne(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.removeOne(query, option);
    }

    async removeMany(query?: Query | Option, option?: Option): Promise<any> {
        return this.driver.removeMany(query, option);
    }


    async add(query?: Query): Promise<any> {
        return this.driver.add(query);
    }

    async addOne(query?: Query): Promise<any> {
        return this.driver.addOne(query);
    }

    async addMany(query?: Query): Promise<any> {
        return this.driver.addMany(query);
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