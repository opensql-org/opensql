enum RefState {
    CASCADE = 'CASCADE',
    RESTRICT = 'RESTRICT',
    SET_NULL = 'SET NULL',
    NO_ACTION = 'NO ACTION'
}


enum Operator {
    LESS = '<',
    EQUAL = '=',
    NULL = 'NULL',
    GREATER = '>',
    NOT_EQUAL = '<>',
    IS_NULL = 'IS NULL',
    LESS_OR_EQUAL = '<=',
    NOT_NULL = 'NOT NULL',
    GREATER_OR_EQUAL = '>=',
    IS_NOT_NULL = 'IS NOT NULL'
}

enum Cnj {
    OR = 'OR',
    AND = 'AND'
}

export {
    Cnj,
    RefState,
    Operator
}