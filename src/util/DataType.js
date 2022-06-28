const {
    addDataTypeForFieldInFirstItemOfArray
} = require('./Utilites');

let int = 'int',
    bit = 'bit',
    text = 'text',
    Enum = 'enum',
    set = 'set',
    real = 'real',
    year = 'year',
    blob = 'blob',
    char = 'char',
    date = 'date',
    time = 'time',
    point = 'point',
    float = 'float',
    bigint = 'bigint',
    binary = 'binary',
    serial = 'serial',
    double = 'double',
    decimal = 'decimal',
    boolean = 'boolean',
    varchar = 'varchar',
    tinyint = 'tinyint',
    tinyblob = 'tinyblob',
    longblob = 'longblob',
    longtext = 'longtext',
    tinytext = 'tinytext',
    smallint = 'smallint',
    datetime = 'datetime',
    timestamp = 'timestamp',
    mediumint = 'mediumint',
    varbinary = 'varbinary',
    mediumblob = 'mediumblob',
    mediumtext = 'mediumtext';

module.exports = {

    VARCHAR(data) {
        return addDataTypeForFieldInFirstItemOfArray(varchar, data);
    },

    INT(data) {
        return addDataTypeForFieldInFirstItemOfArray(int, data);
    },

    CHAR(data) {
        return addDataTypeForFieldInFirstItemOfArray(char, data);
    },

    DATE(data) {
        return addDataTypeForFieldInFirstItemOfArray(date, data);
    },

    TIME(data) {
        return addDataTypeForFieldInFirstItemOfArray(time, data);
    },

    DATETIME(data) {
        return addDataTypeForFieldInFirstItemOfArray(datetime, data);
    },

    ENUM(data) {
        return addDataTypeForFieldInFirstItemOfArray(Enum, data);
    },

    BOOLEAN(data) {
        return addDataTypeForFieldInFirstItemOfArray(boolean, data);
    },

    POINT(data) {
        return addDataTypeForFieldInFirstItemOfArray(point, data);
    },

    TINYINT(data) {
        return addDataTypeForFieldInFirstItemOfArray(tinyint, data);
    },

    SMALLINT(data) {
        return addDataTypeForFieldInFirstItemOfArray(smallint, data);
    },

    MEDIUMINT(data) {
        return addDataTypeForFieldInFirstItemOfArray(mediumint, data);
    },

    BIGINT(data) {
        return addDataTypeForFieldInFirstItemOfArray(bigint, data);
    },

    DECIMAL(data) {
        return addDataTypeForFieldInFirstItemOfArray(decimal, data);
    },

    FLOAT(data) {
        return addDataTypeForFieldInFirstItemOfArray(float, data);
    },

    DOUBLE(data) {
        return addDataTypeForFieldInFirstItemOfArray(double, data);
    },

    REAL(data) {
        return addDataTypeForFieldInFirstItemOfArray(real, data);
    },

    BIT(data) {
        return addDataTypeForFieldInFirstItemOfArray(bit, data);
    },

    SERIAL(data) {
        return addDataTypeForFieldInFirstItemOfArray(serial, data);
    },

    TIMESTAMP(data) {
        return addDataTypeForFieldInFirstItemOfArray(timestamp, data);
    },

    TIME(data) {
        return addDataTypeForFieldInFirstItemOfArray(time, data);
    },

    YEAR(data) {
        return addDataTypeForFieldInFirstItemOfArray(year, data);
    },

    TINYTEXT(data) {
        return addDataTypeForFieldInFirstItemOfArray(tinytext, data);
    },

    TEXT(data) {
        return addDataTypeForFieldInFirstItemOfArray(text, data);
    },

    MEDIUMTEXT(data) {
        return addDataTypeForFieldInFirstItemOfArray(mediumtext, data);
    },

    LONGTEXT(data) {
        return addDataTypeForFieldInFirstItemOfArray(longtext, data);
    },

    BINARY(data) {
        return addDataTypeForFieldInFirstItemOfArray(binary, data);
    },

    VARBINARY(data) {
        return addDataTypeForFieldInFirstItemOfArray(varbinary, data);
    },

    TINYBLOB(data) {
        return addDataTypeForFieldInFirstItemOfArray(tinyblob, data);
    },

    BLOB(data) {
        return addDataTypeForFieldInFirstItemOfArray(blob, data);
    },

    MEDIUMBLOB(data) {
        return addDataTypeForFieldInFirstItemOfArray(mediumblob, data);
    },

    LONGBLOB(data) {
        return addDataTypeForFieldInFirstItemOfArray(longblob, data);
    },

    SET(data) {
        return addDataTypeForFieldInFirstItemOfArray(set, data);
    }

}