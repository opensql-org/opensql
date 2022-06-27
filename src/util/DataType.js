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
    char = 'char',  // 0 - 255
    date = 'date',  // 2022-03-20
    time = 'time',  // 23:55:54
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
    datetime = 'datetime', // 2022-03-20 20:32:42
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

    DATE() {
        return addDataTypeForFieldInFirstItemOfArray(date);
    },

    TIME(data) {
        return addDataTypeForFieldInFirstItemOfArray(time, data);
    },

    DATETIME() {
        return addDataTypeForFieldInFirstItemOfArray(datetime);
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

    TIMESTAMP() {
        return addDataTypeForFieldInFirstItemOfArray(timestamp);
    },

    TIME() {
        return addDataTypeForFieldInFirstItemOfArray(time);
    },

    YEAR() {
        return addDataTypeForFieldInFirstItemOfArray(year);
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