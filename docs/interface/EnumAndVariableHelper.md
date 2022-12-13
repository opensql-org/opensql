# Enum And Variable Helper


# Enum

### Cnj

Used when you need add conjunction AND , OR between two or more conditions

```ts
enum Cnj {
    OR = 'OR',
    AND = 'AND'
}
```

### COP

COP is Comparison operator that helper to filter value

```ts
enum COP {
    LESS = '<',
    EQUAL = '=',
    GREATER = '>',
    OrEqual = '|*=',
    AddEqual = '+=',
    SubEqual = '-=',
    MulEqual = '*=',
    DivEqual = '/=',
    ModEqual = '%=',
    AndEqual = '&=',
    NOT_EQUAL = '<>',
    ExcEqual = '^-=',
    LESS_OR_EQUAL = '<=',
    GREATER_OR_EQUAL = '>='
}
```

### Operator

```ts
enum Operator {
    NULL = 'NULL',
    IS_NULL = 'IS NULL',
    NOT_NULL = 'NOT NULL',
    IS_NOT_NULL = 'IS NOT NULL'
}
```

### RefState 

Use foreign key creation on onDelete or onUpdate

```ts
enum RefState {
    CASCADE = 'CASCADE',
    RESTRICT = 'RESTRICT',
    SET_NULL = 'SET NULL',
    NO_ACTION = 'NO ACTION'
}
```

# Variable

```ts
const NULL = 'NULL';

const NOT_NULL = 'NOT_NULL';

const AUTO_INCREMENT: 'AUTO_INCREMENT';
```