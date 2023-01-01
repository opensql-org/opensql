import {CreateTable, FilterWithId, Query, TargetTable} from '../../../package/type/db/Query';
import DismissConnection from './DismissConnection';
import DriverConnection from './DriverConnection';
import Postgresql from '../../driver/postgresql';
import Mysql from '../../driver/mysql';
import Util from '../../util/Util';
import Database from './Database';

const Utilities = Util.getInstance(),
    instanceClass = {
        mysql: Mysql,
        postgresql: Postgresql
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

    async find(query: Query): Promise<any> {
        return this.driver.find(query);
    }

    async findOne(query: Query): Promise<any> {
        return this.driver.findOne(query);
    }

    async findById(id: number, filter: FilterWithId): Promise<any> {
        return this.driver.findById(id, filter);
    }

    async findMany(query: Query, limit?: number): Promise<any> {
        return this.driver.findMany(query, limit);
    }


    async update(query: Query): Promise<any> {
        return this.driver.update(query);
    }


    async remove(query: Query): Promise<any> {
        return this.driver.remove(query);
    }


    async addOne(query: Query): Promise<any> {
        return this.driver.addOne(query);
    }

    async addWithFind(targetTableName: string | TargetTable, query: Query): Promise<any> {
        return this.driver.addWithFind(targetTableName, query);
    }

    async addMany(query: Query): Promise<any> {
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

    async dropTable(tableName: string | string[]): Promise<any> {
        return this.driver.dropTable(tableName);
    }

    async truncateTable(tableName: string): Promise<any> {
        return this.driver.truncateTable(tableName);
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