# Function Helper

- [Introduction](#introduction)
- [Expressions](#expressions)
- [Where](#where)
- [Others](#others)

# Introduction

A huge part of Opensql is managed using Function Helpers, so this part is very important for developers.

# Expressions

```ts
AS(
    data,      // string
    columnName // string?
);
```

Example code:

```ts
AS(
    'id',
    'userId'
);
```


### MAX

```ts
MAX(
    column // string
);
```

### MIN

```ts
MIN(
    column // string
);
```

### SUM

```ts
SUM(
    column // string
);
```

### AVG

```ts
AVG(
    column // string
);
```


# Where

### IN

```ts
IN(
    arr,        // string[] | number[] | string&number[]
    conjunction // Cnj?
);
```

```ts
NOT_IN(
    arr,        // string[] | number[] | string&number[]
    conjunction // Cnj?
);
```

Example code:

```text
{
  where: {
    id: IN([1, 5])
  }
}
```

### LIKE

```ts
LIKE(
    str, // string
    conjunction // Cnj?
);
```

```ts
NOT_LIKE(
    str, // string
    conjunction // Cnj?
);
```

Example code:

```text
{
    where: {
        title: LIKE('%simple')
    }
}
```

### BETWEEN

```ts
BETWEEN(
    first,      // string | number
    second,     // string | number
    conjunction // Cnj?
)
```

```ts
NOT_BETWEEN(
    first,      // string | number
    second,     // string | number
    conjunction // Cnj?
)
```
Example code:

```text
{
  where: {
    id: BETWEEN(1, 5)
  }
}
```

### jsonChecker

```ts
jsonChecker(
    key,    // string
    has     // string
)
```

Example code:

```text
{
  where: {
    id: jsonChecker('c', 'name')
  }
}
```

### Condition

The Condition function is used along with the $having object

```ts
Condition(
    leftStatement,        // string
    rightStatement,       // string | number
    comparisonOperator,   // COP?
    conjunction           // Cnj?
);
```

Example code:

```text
{
    option: {
        $having: [
            Condition('COUNT(password)', 1234)
        ]
    }
}
```


# Others

### NOW

```ts
NOW();
```
### DAY

```ts
DAY(
    date // string
);
```

```ts
DAY('2017-06-15');
```

### DAYOFWEEK

```ts
DAYOFWEEK(
    date // string
);
```

### DAYOFYEAR

```ts
DAYOFYEAR(
    date // string
);
```

### DAYOFMONTH

```ts
DAYOFMONTH(
    date // string
);
```

### DAYNAME

```ts
DAYNAME(
    date // string
);
```

```ts
DAYNAME('2017-06-15');
```

### UUID

```ts
UUID();
```

### UUID_SHORT

```ts
UUID_SHORT();
```

### JOIN

#### LEFT

```ts
LEFT(
    query // Query
);
```

#### INNER

```ts
INNER(
    query // Query
);
```

#### INNER

```ts
INNER(
    query // Query
);
```

#### FULL

```ts
FULL(
    query // Query
);
```
Example code:

```text
{
  from: 'books',
  join: [
    FULL({
        from: 'users'
    })   
  ]
}
```

### BLOB

#### BLOB

```ts
BLOB(
    buf // Buffer
);
```

#### TINYBLOB

```ts
TINYBLOB(
    buf // Buffer
);
```
#### LONGBLOB

```ts
LONGBLOB(
    buf // Buffer
);
```
#### MEDIUMBLOB

```ts
MEDIUMBLOB(
    buf // Buffer
);
```

### JSON

Use when you want insert data in json data type.

```ts
JSON(
    data //  number[] | string[] | JSONObject | JSONObject[]
);
```

Example code:

```text
{
    data: JSON({
        username: 'root'
    })
}
```

### CAST

```ts
CAST(
    data, // number | string
    type  // string
);
```

Example code:

```text
{
    get: CAST('username','id')
    
}
```

### COUNT

```ts
COUNT(
    column // string? | string[]?
);
```

Example code:

```text
{
    get: COUNT('username')
    
}
```

### UPPER

```ts
UPPER(
    string // string
);
```

Example code:

```text
{
    get: UPPER('username')
    
}
```
### LOWER

```ts
LOWER(
    string // string
);
```

Example code:

```text
{
    get: LOWER('USERNAME')
    
}
```

### ASCII

```ts
ASCII(
    char // string
);
```

Example code:

```text
{
    get: ASCII('A')
    
}
```

### POINT

```ts
POINT(
    x, // number
    y  // number
);
```

Example code:

```text
{
    get: POINT(4.5, 5)
    
}
```

### UNION

```ts
UNION(
    query // Query
);
```

### UNION ALL

```ts
UNION_ALL(
    query // Query
);
```

Example code:

```text
{
    from: 'users',
    union: [
        UNION({
            from: 'books'
        })
    ]
}
```

### qCheck

```ts
qCheck(
    value, // QCheckValueInObject | string | number
    comparisonOperator, // COP?
    conjunction // Cnj?
);
```

Example code:

```text
{
    where: {
        id: qCheck(50, COP.DivEqual)
    }
}
```

### BINARY

```ts
BINARY(
  data // number  
);
```

### VARBINARY

```ts
VARBINARY(
  data // number  
);
```

### ATTACH

```ts
ATTACH(
    arr,        // JSONObject | string[]   
    conjunction // Cnj? 
);
```

Example code:

```text
{
    where: {
        id: ATTACH([
            IN([100, 105]), 
            qCheck(50, COP.DivEqual)
        ])
    }
}
```

### SOURCE

```ts
SOURCE(
    name,    // string
    typeName // string?
);
```

Example code:

```text
{
    get: SOURCE('username')
}
```
### POLYGON

```ts
POLYGON(
    str    // string
);
```

Example code:

```text
{
    data: {
       p: POLYGON('0 0,10 0,10 10')
    }
}
```
### COMMENT

```ts
COMMENT(
    description    // string
);
```

Example code:

```text
{
    column: {
       id: DataType.INT([COMMENT('This is a simple test')])
    }
}
```

### REVERSE

```ts
REVERSE(
    string    // string
);
```

### DEFAULT

```ts
DEFAULT(
    value    // string | number | boolean
);
```

Example code:

```text
{
    column: {
       phoneNumber: DataType.INT([DEFAULT('NULL')])
    }
}
```
### UTC_DATE

```ts
UTC_DATE();
```
### UTC_TIME

```ts
UTC_TIME();
```

### XML

```ts
XML(
    data    // string
);
```

Example code:

```text
{
    data: {
       id: XML('<h1>Hello World!<h1>')
    }
}
```

### UNQUOTE

```ts
UNQUOTE(
    extract    // string
);
```

Example code:

```text
{
   get: UNQUOTE("c->'$.name'")   
}
```

### CONTAINS

```ts
CONTAINS(
    target,     // string | JSONObject
    candidate,  // string | JSONObject
    path        // string?
);
```

Example code:

```text
{
   get: CONTAINS('{"d": 4}', '1', '$.a')   
}
```

### EXTRACT

```ts
EXTRACT(
    data,    // JSONObject | number[] | string
    ...path  // string[]
);
```

Example code:

```text
{
   get: EXTRACT([1, 2, 3, 4, 5], '$[last-3 to last-1]')
}
```
### CONCAT_WS

```ts
CONCAT_WS(
    str,    // string
    arr,    // string[]
    column  // string
);
```

Example code:

```text
{
   get: CONCAT_WS(' ', ['A', 'B'], 'ConcatenatedString')
}
```

### QueryPoint

```ts
QueryPoint(
    field    // string
);
```

Example code:

```text
{
   get: QueryPoint('location')
}
```

### LINESTRING

```ts
LINESTRING(
    str    // string | string[]
);
```

Example code:

```text
{
   get: LINESTRING([Point(0,0), Point(1,1)])
}
```
### CHAR_LENGTH

```ts
CHAR_LENGTH(
    data    // string | number
);
```

Example code:

```text
{
   get: CHAR_LENGTH(125)
}
```

### CURRENT_USER

```ts
CURRENT_USER();
```

### CURRENT_DATE

```ts
CURRENT_DATE();
```

### CURRENT_TIME

```ts
CURRENT_TIME();
```

### UTC_TIMESTAMP

```ts
UTC_TIMESTAMP();
```
### ST_GeomFromText

```ts
ST_GeomFromText(
    string // string
);
```
