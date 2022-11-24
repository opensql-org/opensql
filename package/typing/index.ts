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
    value: string | string[] | number[] | JSONObject[] | JSONObject,
    type: string,
    conjunctionType?: string
}


type Conjunction = FnResult;


export {
    FnResult,
    JSONObject,
    JSONString,
    Conjunction,
    JSONFunction
}