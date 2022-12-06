import {CreateTable, Query} from '../../../package/type/db/Query';
import dataTypeHandler from '../../../package/query/helper/dataType';
import {foreignKey} from '../../../package/query/helper/foreignKey';
import SqlParser = require( '../../../lib/sql-parser');
import keyword from '../../../package/sql/Keyword';
import {JSONObject} from '../../../package/typing';
import Util from '../../util/Util';


let {jsonToString} = Util.getInstance();

export default class Builder {

    private queryInjection: any[] = [];

    private driverName: string = '';


    private sqlParserHandler(config: JSONObject, query?: Query): string {
        if (!query)
            return;

        let sp = new SqlParser({type: this.driverName, ...config}, query);

        if (sp.injection())
            this.queryInjection = sp.injection();

        return sp.toSQL();
    }


    private static sqlParserConfigHandler(type: string, operationType: string): JSONObject {
        return {operation: {[operationType]: type}, operationType: operationType};
    }


    setDriverName(driverName: string) {
        this.driverName = driverName;
    }


    injection(): Array<any> {
        return this.queryInjection;
    }


    find(query?: Query): string {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'select'), query);
    }

    findOne(query?: Query): string {
        query.option.$limit = 1;
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('one', 'select'), query);
    }

    findMany(query?: Query, limit?: number): string {
        query.option.$limit = !limit ? 10 : limit;
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'select'), query);
    }


    update(query?: Query): string {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'update'), query);
    }


    remove(query?: Query): string {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'delete'), query);
    }


    addOne(query?: Query): string {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('one', 'insert'), query);
    }

    addMany(query?: Query): string {
        return this.sqlParserHandler(Builder.sqlParserConfigHandler('multi', 'insert'), query);
    }


    createDatabase(name: string, set: string = 'UTF8', collate: string = 'UTF8_UNICODE_CI'): string {
        return [
            keyword.CREATE, keyword.DATABASE, keyword.IF_NOT_EXISTS,
            name, 'CHARACTER', keyword.SET, set, 'COLLATE', collate
        ].join(' ');
    }

    dropDatabase(name: string): string {
        return [
            keyword.DROP, keyword.DATABASE, name
        ].join(' ');
    }


    /**
     * @param ct
     * @param dbName
     * Used to handle different query for different database.
     */
    createTable(ct: CreateTable, dbName: string): string {

        let hasPrimaryKey = ct?.primaryKey,
            hasForeignKey = ct?.foreignKey,
            tableName = ct?.table,
            hasTrueConditions = hasPrimaryKey || hasForeignKey;


        if (hasTrueConditions)
            for (const key in ct?.column) {

                let value = ct.column[key],
                    hasMatchPrimaryKey = key === hasPrimaryKey,
                    hasMatchForeignKey = hasForeignKey[key];


                ct.column[key] = dataTypeHandler(dbName, value);

                if (hasMatchPrimaryKey)
                    ct.column[key] = `${value} ${keyword.PRIMARY_KEY}`;

                if (hasMatchForeignKey) {
                    let fkQuery = foreignKey[dbName]?.query([
                        key, /** The name of the column in this table that should be linked to the external column **/
                        hasForeignKey[key].to /** Target table **/,
                        hasForeignKey[key].column /** Target column in target table **/
                    ]);

                    ct.column[key] = `${value} ${fkQuery}`;
                }

            }


        return [
            keyword.CREATE,
            keyword.TABLE,
            keyword.IF_NOT_EXISTS,
            tableName,
            '(',
            jsonToString(ct.column),
            ')'
        ].join(' ');
    }

    dropTable(tableName: string | string[], databaseName?: string): string {
        return [
            keyword.USE,
            databaseName,
            keyword.IF_EXISTS,
            tableName
        ].join(' ');
    }

    truncateTable(tableName: string): string {
        return [
            keyword.TRUNCATE,
            keyword.TABLE,
            tableName
        ].join(' ');
    }

}