import {RefState} from '../../enum/helper';
import {FnResult, JSONObject, JSONString} from '../../typing';

type UnionObject = {
    value: Query,
    type: string
}


type Query = {

    /**
     * @type string | string[]
     * It is used to manage the display of columns.
     * The @string type is used when you want to manipulate a single column or
     * select all columns using the asterisk word.
     * The @string-array type is used when you want to select and manipulate a multi columns.
     */
    get?: string | string[]

    /**
     * @type string | string[]
     * The name of the table or tables you want to work on.
     * The @string type is used when you want to select single table.
     * The @string-array type is used when you want to select multi tables.
     */
    from: string | string[]

    /**
     * @type Where
     * Used to filter record.
     * In where object we have Map of columns with function helper for filter data.
     */
    where?: Where

    /**
     * @type Where
     * Opposite of Where object
     */
    whereNot?: Where

    /**
     * @type object
     * Used to insert or update data.
     */
    data?: any[] | JSONObject

    /**
     * @type object[]
     * Used to combine the result-set of two or more SELECT statements.
     */
    union?: UnionObject[]

    /**
     * @type Option
     * Manage option query like: limit, order, group or sort data with asc and desc.
     */
    option?: Option

    /**
     * A JOIN clause is used to combine rows from two or more tables, based on a related column between them.
     */
    join?: FnResult | FnResult[]

}

type Option = {

    /**
     * @type string | string[]
     * Groups rows that have the same values into summary rows.
     */
    $group?: string | string[]

    /**
     * @type FnResult | FnResult[]
     * The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.
     */
    $having?: FnResult | FnResult[]

    /**
     * @type string | string[]
     * Used to sort the result-set in ascending or descending order.
     */
    $order?: string | string[]

    /**
     * @type number | number[]
     * Limited number of records.
     */
    $limit?: number | number[]

    /**
     *  @type number
     *  Used with the ORDER BY clause with a value greater than or equal to zero.
     */
    $offset?: number

    /**
     * @type any
     * Used to manage order from specific column. For example : DESC Or ASC
     */
    [key: string]: any

}

type Where = {

    /**
     * @type any
     * Used to filter records.
     */
    [key: string]: any

}

type CreateTable = {

    /**
     * @type string
     * Table name.
     */
    table: string

    /**
     * @type object
     * Used to generate column for table.
     */
    column: JSONString

    /**
     * @type string[]
     * Used to search fast in column.
     */
    index?: string[]

    unique?: string[]

    primaryKey?: string | string[]

    foreignKey?: ForeignKeyObject

}

type ForeignKeyObject = {

    [key: string]: ForeignKey

}

type ForeignKey = {

    /**
     * @type string
     * Column name that you want to reference in other tables.
     */
    get: string | string[]

    /**
     * @type string
     * Target table name.
     */
    to: string

    /**
     * @type string
     * Column of target table.
     */
    column: string | string[]

    /**
     * @type RefState
     * @default RESTRICT
     */
    onDelete?: RefState

    /**
     * @type RefState
     * @default RESTRICT
     */
    onUpdate?: RefState

}

export {
    CreateTable,
    Query,
    ForeignKey
}