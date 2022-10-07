import types from './Types';
import Util from '../../src/util/Util';

let Utils = Util.getInstance();

export default {

    VARCHAR(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.varchar, data);
    },

    INT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.int, data);
    },

    CHAR(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.char, data);
    },

    DATE(data?: any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.date, data);
    },

    DATETIME(data?: any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.datetime, data);
    },

    ENUM(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.Enum, data);
    },

    BOOLEAN(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.boolean, data);
    },

    POINT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.point, data);
    },

    TINYINT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.tinyint, data);
    },

    SMALLINT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.smallint, data);
    },

    MEDIUMINT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.mediumint, data);
    },

    BIGINT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.bigint, data);
    },

    DECIMAL(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.decimal, data);
    },

    FLOAT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.float, data);
    },

    DOUBLE(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.double, data);
    },

    REAL(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.real, data);
    },

    BIT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.bit, data);
    },

    SERIAL(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.serial, data);
    },

    TIMESTAMP(data?: any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.timestamp, data);
    },

    TIME(data?: any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.time, data);
    },

    YEAR(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.year, data);
    },

    TINYTEXT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.tinytext, data);
    },

    TEXT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.text, data);
    },

    MEDIUMTEXT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.mediumtext, data);
    },

    LONGTEXT(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.longtext, data);
    },

    BINARY(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.binary, data);
    },

    VARBINARY(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.varbinary, data);
    },

    TINYBLOB(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.tinyblob, data);
    },

    BLOB(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.blob, data);
    },

    MEDIUMBLOB(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.mediumblob, data);
    },

    LONGBLOB(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.longblob, data);
    },

    SET(data?: number | any[]): string {
        return Utils.addDataTypeForFieldInFirstItemOfArray(types.set, data);
    }

}