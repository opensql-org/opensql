type JSONObject = {
    [key: string]: any
}

type JSONFunction = {
    [key: string]: Function
}

type JSONString = {
    [key: string]: string
}

type FnResult = {
    value: string | number | string[] | number[] | JSONObject[] | JSONObject | QCheckValueInObject,
    type: string,
    conjunctionType?: string,
    comparisonOperator?: string
}

type QCheckValueInObject = {
    data: string | number,
    haveNot?: boolean
}

type Conjunction = FnResult;


export {
    FnResult,
    JSONObject,
    JSONString,
    Conjunction,
    JSONFunction,
    QCheckValueInObject
}