import {CreateTable, Query, Option} from '../../../package/type/db/Query';
import foreignKey from '../../../package/query/helper/primaryKey';
import keyword from '../../../package/sql/Keyword';
import symbol from '../../../package/sql/Symbol';
import Util from '../../util/Util';


let {jsonToString} = Util.getInstance();

export default class Builder {

    private queryInjection: any[];

    sql(query?: Query | Option, option?: Option): string {
        return '';
    }

    injection(): Array<any> {
        return this.queryInjection;
    }


    findOne(query?: Query | Option, option?: Option): string {
        return '';
    }

    findMany(query?: Query | Option, option?: Option): string {
        return '';
    }


    updateOne(query?: Query | Option, option?: Option): string {
        return '';
    }

    updateMany(query?: Query | Option, option?: Option): string {
        return '';
    }


    removeOne(query?: Query | Option, option?: Option): string {
        return '';
    }

    removeMany(query?: Query | Option, option?: Option): string {
        return '';
    }


    addOne(query?: Query): string {
        return '';
    }

    addMany(query?: Query): string {
        return '';
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
                    hasMatchForeignKey = hasForeignKey[key] !== undefined;

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
            tableName,
            symbol.OPEN_PARENTHESES,
            jsonToString(ct.column),
            symbol.CLOSE_PARENTHESES
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

}