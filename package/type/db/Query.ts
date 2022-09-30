export type Where = {

    /**
     * @type string | string[]
     *
     * It is used to manage the display of columns.
     *
     * The @string type is used when you want to manipulate a single column or select all columns using the asterisk word.
     * The @string-array type is used when you want to select and manipulate a multi columns.
     */
    get?: string | string[]

    /**
     * @type string | string[]
     * The name of the table or tables you want to work on
     *
     * The @string type is used when you want to select single table.
     * The @string-array type is used when you want to select multi tables.
     */
    from?: string | string[]

    /**
     * @type object
     * Used to filter record.
     *
     * In where object we have list of conditions with columns
     */
    where?: object

    /**
     * @type object
     * Used to insert or update data
     */
    data?: any[]

}

export type Option = {

    /**
     * @type string | string[]
     * Groups rows that have the same values into summary rows
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
     *  Used with the ORDER BY clause with a value greater than or equal to zero
     */
    _offset?: number
}