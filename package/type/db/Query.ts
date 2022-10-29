import {RefState} from '../../enum/helper';
import {JSONString} from '../../typing';


type Query = {

    /**
     * @type string | string[]
     * It is used to manage the display of columns.
     * The @string type is used when you want to manipulate a single column or3
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
    from?: string | string[]

    /**
     * @type Where
     * Used to filter record.
     * In where object we have list of conditions with columns.
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
    data?: any[]

    /**
     * @type object[]
     * Used to combine the result-set of two or more SELECT statements.
     */
    union?: object[]

}

type Option = {

    /**
     * @type string | string[]
     * Groups rows that have the same values into summary rows.
     */
    _group?: string | string[]

    /**
     * @type string | string[]
     * Used to sort the result-set in ascending or descending order.
     */
    _order?: string | string[]

    /**
     * @type number | number[]
     * Limited number of records.
     */
    _limit?: number | number[]

    /**
     *  @type number
     *  Used with the ORDER BY clause with a value greater than or equal to zero.
     */
    _offset?: number

    /**
     * @type any
     * Used to manage specific column.
     */
    [key: string]: any

}

type Where = {

    /**
     * @type any
     * Used to filter records.
     */
    [key: string]: any

    /**
     * @type string[]
     * Used to filter records with single or multi (and, or) conditions
     */
    op?: string[]

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
     * @type object[]
     * List of column reference.
     */
    ref?: Ref[]

    /**
     * @type string[]
     * Used to search fast in column.
     */
    index?: string[]

    unique?: string[]

    primaryKey?: string

    foreignKey?: ForeignKey

    constraint?: CONSTRAINT

}

type CONSTRAINT = {

    symbol?: string

    index?: string[]

    unique?: string[]

    primaryKey?: string

    foreignKey?: ForeignKey

}

type ForeignKey = {

    [key: string]: ForeignKeyObject

}

type Ref = {

    /**
     * @type string
     * Column name that you want to reference in other tables.
     */
    get: string

    /**
     * @type string
     * Table name that you want to reference in other tables.
     */
    from: string

    /**
     * @type string
     * Target table name.
     */
    to: string

    /**
     * @type string
     * Column of target table.
     */
    column: string

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

type ForeignKeyObject = {

    /**
     * @type string
     * Target table name.
     */
    to: string

    /**
     * @type string
     * Column of target table.
     */
    column: string

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


type FieldAlter = {
    [key: string]: string
}

type Alter = {

    add:  FieldAlter

    drop: FieldAlter

    modify: FieldAlter

    from: string

}

export {
    CreateTable,
    Option,
    Query,
    Alter,
    Ref
}