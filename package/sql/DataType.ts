import types from './Types';
import Util from '../../src/util/Util';

let Utils = Util.getInstance();

export default {

    VARCHAR(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.varchar, data);
    },

    INT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.int, data);
    },

    CHAR(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.char, data);
    },

    DATE(data?: any[]): string {
        return Utils.dataTypeHandler(types.date, data);
    },

    DATETIME(data?: any[]): string {
        return Utils.dataTypeHandler(types.datetime, data);
    },

    ENUM(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.enum, data);
    },

    BOOLEAN(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.boolean, data);
    },

    POINT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.point, data);
    },

    TINYINT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.tinyint, data);
    },

    SMALLINT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.smallint, data);
    },

    MEDIUMINT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.mediumint, data);
    },

    BIGINT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.bigint, data);
    },

    DECIMAL(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.decimal, data);
    },

    FLOAT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.float, data);
    },

    DOUBLE(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.double, data);
    },

    REAL(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.real, data);
    },

    BIT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.bit, data);
    },

    SERIAL(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.serial, data);
    },

    TIMESTAMP(data?: any[]): string {
        return Utils.dataTypeHandler(types.timestamp, data);
    },

    TIME(data?: any[]): string {
        return Utils.dataTypeHandler(types.time, data);
    },

    YEAR(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.year, data);
    },

    TINYTEXT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.tinytext, data);
    },

    TEXT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.text, data);
    },

    MEDIUMTEXT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.mediumtext, data);
    },

    LONGTEXT(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.longtext, data);
    },

    BINARY(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.binary, data);
    },

    VARBINARY(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.varbinary, data);
    },

    TINYBLOB(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.tinyblob, data);
    },

    BLOB(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.blob, data);
    },

    MEDIUMBLOB(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.mediumblob, data);
    },

    LONGBLOB(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.longblob, data);
    },

    SET(data?: number | any[]): string {
        return Utils.dataTypeHandler(types.set, data);
    },

    MONEY(data: number | any[]): string {
        return Utils.dataTypeHandler(types.money, data);
    },

    SMALLMONEY(data: number | any[]): string {
        return Utils.dataTypeHandler(types.smallmoney, data);
    },

    SMALLDATETIME(data: number | any[]): string {
        return Utils.dataTypeHandler(types.smalldatetime, data);
    },

    DATETIME2(data: number | any[]): string {
        return Utils.dataTypeHandler(types.datetime2, data);
    },

    VARCHARMAX(data: number | any[]): string {
        return Utils.dataTypeHandler(types.varcharMax, data);
    },

    NVARCHAR(data: number | any[]): string {
        return Utils.dataTypeHandler(types.nvarchar, data);
    },

    NVARCHARMAX(data: number | any[]): string {
        return Utils.dataTypeHandler(types.nvarcharmax, data);
    },

    NCHAR(data: number | any[]): string {
        return Utils.dataTypeHandler(types.nchar, data);
    },

    NTEXT(data: number | any[]): string {
        return Utils.dataTypeHandler(types.ntext, data);
    },

    VARBINARYMAX(data: number | any[]): string {
        return Utils.dataTypeHandler(types.varbinarymax, data);
    },

    XML(data: number | any[]): string {
        return Utils.dataTypeHandler(types.xml, data);
    },

    SMALLSERIAL(data: number | any[]): string {
        return Utils.dataTypeHandler(types.smallserial, data);
    },

    CHARACTERVARYING(data: number | any[]): string {
        return Utils.dataTypeHandler(types.characterVarying, data);
    },

    BYTEA(data: number | any[]): string {
        return Utils.dataTypeHandler(types.bytea, data);
    },

    CIDR(data: number | any[]): string {
        return Utils.dataTypeHandler(types.cidr, data);
    },

    INET(data: number | any[]): string {
        return Utils.dataTypeHandler(types.inet, data);
    },

    MACADDR(data: number | any[]): string {
        return Utils.dataTypeHandler(types.macaddr, data);
    },

    MACADDR8(data: number | any[]): string {
        return Utils.dataTypeHandler(types.macaddr8, data);
    },

    TSVECTOR(data: number | any[]): string {
        return Utils.dataTypeHandler(types.tsvector, data);
    },

    TSQUERY(data: number | any[]): string {
        return Utils.dataTypeHandler(types.tsquery, data);
    },

    JSON(data: number | any[]): string {
        return Utils.dataTypeHandler(types.json, data);
    },

    UUID(data: number | any[]): string {
        return Utils.dataTypeHandler(types.uuid, data);
    },

    POLYGON(data: number | any[]): string {
        return Utils.dataTypeHandler(types.polygon, data);
    },

    GEOMETRY(data: number | any[]): string {
        return Utils.dataTypeHandler(types.geometry, data);
    }

}