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

### UUID

```ts
UUID();
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
)
```

Example code:

```text
{
    get: SOURCE('username')
}
```



