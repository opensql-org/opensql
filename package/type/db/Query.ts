export type CRUD = {

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

export type Option = {

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

export type CreateTable = {

    /**
     * @type string
     * Table name.
     */
    table: string

    /**
     * @type object
     * Used to generate field for table.
     */
    field: object

    /**
     * @type object[]
     * List of field reference.
     */
    ref?: object[]

    /**
     * @type string[]
     * Used to search fast in field.
     */
    index?: string[]

    primaryKey?: string

}