# Query Type

In this section, we deal with `Query` object in CRUD parameters,
As you filter data in your sql queries, you can do this in Opensql.

`Query` object

| key      | type                 | required | description                                                                                            |
|----------|----------------------|----------|--------------------------------------------------------------------------------------------------------|
| get      | string, string[]     | true     | List of columns Or Single Column Or Function Helper                                                    |
| from     | string, string[]     | true     | List of tables Or Single Table                                                                         |
| where    | Where                | false    | In where object we have Map of columns with function helper for filter data                            |
| whereNot | Where                | false    | Opposite of Where object                                                                               |
| data     | any[], JSONObject    | false    | Used to insert or update data                                                                          |
| union    | UnionObject[]        | false    | Used to combine the result-set of two or more SELECT statements                                        |
| option   | Option               | false    | Manage option query like: limit, order, group or sort data with asc and desc.                          |
| join     | FnResult, FnResult[] | false    | A JOIN clause is used to combine rows from two or more tables, based on a related column between them. |

`Where` object:

| key | type | required | description |
|-----|------|----------|-------------|
|     | any  | true     | ...         |

`UnionObject` object

| key   | type   | required | description                   |
|-------|--------|----------|-------------------------------|
| value | Query  | true     | Used in Union Function Helper |
| type  | string | true     | Type of Union Function Helper |

`Option` object

| key     | type                 | required | description                                                                                           |
|---------|----------------------|----------|-------------------------------------------------------------------------------------------------------|
|         | string               | false    | Used to manage order from specific column. For example : DESC Or ASC                                  |
| $group  | string, string[]     | false    | Groups rows that have the same values into summary rows.                                              |
| $having | FnResult, FnResult[] | false    | The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions. |
| $order  | string, string[]     | false    | Used to sort the result-set in ascending or descending order.                                         |
| $limit  | number, number[]     | false    | Limited number of records.                                                                            |
| $offset | number               | false    | Used with the ORDER BY clause with a value greater than or equal to zero.                             |

`FnResult` object

| key                | type                                                                | required | description              |
|--------------------|---------------------------------------------------------------------|----------|--------------------------|
| value              | string, number, string[], number[], JSONObject, QCheckValueInObject | true     | Value of Function Helper |
| type               | string                                                              | true     | Type of Function Helper  |
| conjunctionType    | string                                                              | false    | AND , OR                 |
| comparisonOperator | string                                                              | false    | = , >= , <= , ...        |

`QCheckValueInObject` object

| key     | type           | required | description                                                                                                                   |
|---------|----------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| value   | string, number | true     | ...                                                                                                                           |
| haveNot | boolean        | false    | Used When you need query something like this : ` SELECT * FROM Customers WHERE NOT Country='Germany' AND NOT Country='USA'; ` |


