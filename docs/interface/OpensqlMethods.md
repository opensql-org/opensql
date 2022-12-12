# Opensql Methods

After connecting to the database, you have access to the methods, each method performs its own tasks and returns
different outputs using promises.

- [Create](#create)
    - [Database](#create-database)
    - [Table](#create-table)
- [Drop Or Clear](#drop-or-clear)
  - [Database](#drop-database)
  - [Table](#drop-table)
- [CRUD](#crud)
  - [Add](#Add) 
    
- [Custom query](#custom-query)
- [Disconnect](#disconnect)


# Create

## Create Database

```ts
opensql.createDatabase(
    name,   // string
    set,    // string?
    collate // string?
);
```

### Arguments

`name` **:** Database Name

`set` **:** Database CHARACTER SET by default `UTF8`

`collate` **:** Database Collation Name by default `UTF8_UNICODE_CI`

## Create Table

```ts
opensql.createTable(
    ct   // CreateTable
);
```

CreateTable is an object that receives input from the user:

| key    | type             | required | description                                                                         |
|--------|------------------|----------|-------------------------------------------------------------------------------------|
| table  | string           | true     | Table name                                                                          |
| column | JSONString       | true     | Map of columns with data type , etc                                                 |
| index  | string[]         | false    | List of columns that you want to index for fast research                            |
| unique | string[]         | false    | List of columns that you want to ensures that all values in a column are different. |
| unique | string, string[] | false    | List of columns Or column that you want to add primary key                          |
| unique | ForeignKeyObject | false    | Map of columns that you want to add foreign key                                     |

`JSONString` is object, The keys written in this object are treated as column names And the values of that data type are
the column and the options of that column

`ForeignKeyObject` is object , The keys of this object do not affect the sql output, so you can choose a desired name
for each key, but its values are of ForeignKey type. This object has several parameters with it, which we will learn
about later

#### ForeignKey

| key      | type             | required | description                                            |
|----------|------------------|----------|--------------------------------------------------------|
| get      | string, string[] | true     | Column name that you want to reference in other tables |
| to       | string           | true     | Target table name                                      |
| column   | string, string[] | true     | Column of target table                                 |
| onUpdate | RefState         | false    | enum data type                                         |
| onDelete | RefState         | false    | enum data type                                         |

# Drop Or Clear

## Drop Database

```ts
opensql.dropDatabase(
    name   // string
);
```

## Drop Table

```ts
opensql.dropTable(
        tableName   // string | string[]
);
```

If you want to delete only the contents of the table, use the truncateTable method

```ts
opensql.truncateTable(
        tableName   // string
);
```

# CRUD





# Custom query

If your queries are very complex, it is better to write them without any problems using the query method. It should be noted that in the second parameter, you can use it to prevent injection in SQL.

```ts
opensql.query(
        sql,     // string
        injection // any?
);
```

# Disconnect

It is used when you want to close the connection to the database, try this:

```ts
opensql.disconnect();
```