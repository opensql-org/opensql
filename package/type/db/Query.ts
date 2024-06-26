import { RefState } from '../../enum/helper';
import { JSONObject, JSONString, QCheckValueInObject } from '../../typing';

type UnionObject = {
  value: Query;
  type: string;
};

type FnResult = {
  value:
    | string
    | number
    | string[]
    | number[]
    | JSONObject
    | QCheckValueInObject
    | Query;
  type: string;
  conjunctionType?: string;
  comparisonOperator?: string;
};

type FilterWithId = {
  from: string | string[];

  get?: string | string[];
};

type TargetTable = {
  get?: string | string[];

  from: string | string[];
};

type Query = {
  /**
   * It is used to manage the display of columns.
   * The @string type is used when you want to manipulate a single column or
   * select all columns using the asterisk word.
   * The @string-array type is used when you want to select and manipulate a multi columns.
   * @param {String|String[]}
   */
  get?: string | string[];

  /**
   * The name of the table or tables you want to work on.
   * The @string type is used when you want to select single table.
   * The @string-array type is used when you want to select multi tables.
   * @param {String|String[]}
   */
  from: string | string[];

  /**
   * Used to filter record.
   * In where object we have Map of columns with function helper for filter data.
   * @param {Where}
   */
  where?: Where;

  /**
   * Opposite of Where object
   * @param {Where}
   */
  whereNot?: Where;

  /**
   * Used to insert or update data.
   * @param {any[] | JSONObject}
   */
  data?: any[] | JSONObject;

  /**
   * Used to combine the result-set of two or more SELECT statements.
   * @param {UnionObject[]}
   */
  union?: UnionObject[];

  /**
   * Manage option query like: limit, order, group or sort data with asc and desc.
   * @param {Option}
   */
  option?: Option;

  /**
   * A JOIN clause is used to combine rows from two or more tables, based on a related column between them.
   * @param {FnResult|FnResult[]}
   */
  join?: FnResult | FnResult[];
};

type Option = {
  /**
   * Groups rows that have the same values into summary rows.
   * @param {String|String[]}
   */
  $group?: string | string[];

  /**
   * The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.
   * @param {FnResult|FnResult[]}
   */
  $having?: FnResult | FnResult[];

  /**
   * Used to sort the result-set in ascending or descending order.
   * @param {String|String[]}
   */
  $order?: string | string[];

  /**
   * Limited number of records.
   * @param {Number|Number[]}
   */
  $limit?: number | number[];

  /**
   * Used with the ORDER BY clause with a value greater than or equal to zero.
   * @param {Number}
   */
  $offset?: number;

  /**
   * Used to manage order from specific column. For example : DESC Or ASC
   * @param {any}
   */
  [key: string]: any;
};

type Where = {
  /**
   * Used to filter records.
   * @param {any}
   */
  [key: string]: any;
};

type CreateTable = {
  /**
   * Table name.
   * @param {String}
   */
  table: string;

  /**
   * Used to generate column for table.
   * @param {JSONObject}
   */
  column: JSONString;

  /**
   * Used to search fast in column.
   * @param{String[]}
   */
  index?: string[];

  unique?: string[];

  primaryKey?: string | string[];

  foreignKey?: ForeignKeyObject;
};

type ForeignKeyObject = {
  [key: string]: ForeignKey;
};

type ForeignKey = {
  /**
   * Column name that you want to reference in other tables.
   * @param {String|String[]}
   */
  get: string | string[];

  /**
   * Target table name.
   * @param {String}
   */
  to: string;

  /**
   * Column of target table.
   * @param {String|String[]}
   */
  column: string | string[];

  /**
   * @param {RefState}
   * @default RESTRICT
   */
  onDelete?: RefState;

  /**
   * @param {RefState}
   * @default RESTRICT
   */
  onUpdate?: RefState;
};

type Database = 'mssql' | 'mysql' | 'postgresql';

type ConnectionInfo = {
  [key: string]: any;
  password: string;
  dbName: string;
  user: string;
  host: string;
  port: string;
};

export {
  CreateTable,
  Query,
  Database,
  ConnectionInfo,
  FnResult,
  TargetTable,
  FilterWithId,
  ForeignKeyObject,
  ForeignKey,
};
