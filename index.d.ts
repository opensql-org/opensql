import * as dataType from './type/DataType';
import * as fieldHelper from './type/FieldHelper';
import * as queryHelper from './type/QueryHelper';
import * as keywordHelper from './type/KeywordHelper';
import * as variableDataType from './type/VariableDataType';


declare module 'opensql' {

    let fieldHelper: fieldHelper.FieldHelper;

    let dataType: dataType.DataType;

    let keywordHelper: keywordHelper.KeywordHelper;

    let variableDataType: variableDataType.VariableDataType;

    let queryHelper: queryHelper.QueryHelper;

    export function connect(jsonObject: object): any;

    export function createDatabase(name?: string): any;

    export function createTable(jsonObject: object): any;

    export function dropTable(data: string[] | string): any;

    export function addForeignKey(jsonObject: object): any;

    export function remove(jsonObject: object): any;

    export function update(jsonObject: object): any;

    export function addMultiValue(jsonObject: object): any;

    export function addOne(jsonObject: object): any;

    export function addWithFind(jsonObject: object): any;

    export function customQuery(sqlQuery: string, inject?: object | any[]): any;

    export function dropDatabase(databaseName?: string): any;

    export function find(jsonObject: object): any;

    export function findTable(tableName: string, databaseName?: string): any;

    export function result(fn: Function): any;

}