declare module queryHelper {

    interface QueryHelper {

        NULL: string;
        IS_NULL: string;
        NOT_NULL: string;
        EQUAL_TO: string;
        LESS_THAN: string;
        IS_NOT_NULL: string;
        GREATER_THAN: string;
        NOT_EQUAL_TO: string;
        LESS_THAN_OR_EQUAL_TO: string;
        GREATER_THAN_OR_EQUAL_TO: string;

        setOperator(operator: string, value: string, op?: string): string;

        OR(jsonObject: object, operator?: any): string[];

        AND(jsonObject: object, operator?: any): string[];

        IN(arr: any[], op?: string): string;

        NOT_IN(arr: any[], op?: string): string;

        BETWEEN(first: number, second: number, op?: string): string;

        NOT_BETWEEN(first: number, second: number, op?: string): string;

        LIKE(str: string, op?: string): string;

        CAST(data: string | number, type: string): string;

        COUNT(column?: string | string[]): string;

        AS(first: string, second: String): string;

        SOURCE(name: string, typeName?: string): string;

        ATTACH(array: string[], op?: string): object;

        UNION(jsonObject: object): object;

        NOT(str: string, op?: string): string;

        UNION_ALL(jsonObject: object): object;

        MIN(column: string): string;

        MAX(column: string): string;

        SUM(column: string): string;

        AVG(column: string): string;

        CONCAT_WS(str: string, array: string[], column: string): string;

        GROUP(data: string | string[]): string;
        
    }

}

export = queryHelper;