enum RefState {
    CASCADE = 'CASCADE',
    RESTRICT = 'RESTRICT',
    SET_NULL = 'SET NULL',
    NO_ACTION = 'NO ACTION'
}


enum Operator {
    NULL = 'NULL',
    IS_NULL = 'IS NULL',
    NOT_NULL = 'NOT NULL',
    IS_NOT_NULL = 'IS NOT NULL'
}

/**
 * Comparison operator
 */
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

enum Cnj {
    OR = 'OR',
    AND = 'AND'
}

export {
    Cnj,
    COP,
    RefState,
    Operator
}