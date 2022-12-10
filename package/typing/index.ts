type JSONObject = {
    [key: string]: any
}

type JSONFunction = {
    [key: string]: Function
}

type JSONString = {
    [key: string]: string
}

type JoinObject = {
    from: string,
    lsm: string
    rsm: string | number
}

type UnionObject = {
    value: JSONObject,
    type: string
}

type FnResult = {
    value: string | number | string[] | number[] | JSONObject | QCheckValueInObject,
    type: string,
    conjunctionType?: string,
    comparisonOperator?: string
}

type QCheckValueInObject = {
    data: string | number,
    /**
     * Used When you need query something like this
     *
     * @example
     *
     * SELECT * FROM Customers WHERE NOT Country='Germany' AND NOT Country='USA';
     */
    haveNot?: boolean
}

type JsonChecker = {
    key: string
    has?: string
    type: string
}


export {
    FnResult,
    JSONObject,
    JSONString,
    JoinObject,
    UnionObject,
    JsonChecker,
    JSONFunction,
    QCheckValueInObject
}