import DataType from '../package/sql/DataType';
import keyword from '../package/sql/Keyword';

describe('Options Contain', () => {

    it('should be return string equal to VARCHAR(30) NOT NULL', () => {
        expect(DataType.VARCHAR([keyword.NOT_NULL, 30])).toBe('VARCHAR(30) NOT NULL');
    });

    it('should be return string equal to VARCHAR(30) NOT NULL AUTO_INCREMENT', () => {
        expect(DataType.VARCHAR([keyword.NOT_NULL, keyword.AUTO_INCREMENT, 30])).toBe('VARCHAR(30) NOT NULL AUTO_INCREMENT');
    });

    it("should be return string equal to ENUM('Low', 'Medium', 'High') NOT NULL AUTO_INCREMENT", () => {
        expect(DataType.ENUM([keyword.NOT_NULL, keyword.AUTO_INCREMENT, 'Low', 'Medium', 'High'])).toBe("ENUM('Low', 'Medium', 'High') NOT NULL AUTO_INCREMENT");
    });

});


describe('VARCHAR', () => {

    it('should be return string equal to VARCHAR', () => {
        expect(DataType.VARCHAR()).toBe('VARCHAR');
    });

    it('should be return string equal to VARCHAR(30)', () => {
        expect(DataType.VARCHAR(30)).toBe('VARCHAR(30)');
    });

});

describe('INT', () => {

    it('should be return string equal to INT', () => {
        expect(DataType.INT()).toBe('INT');
    });

    it('should be return string equal to INT(30)', () => {
        expect(DataType.INT(30)).toBe('INT(30)');
    });

});

describe('CHAR', () => {

    it('should be return string equal to CHAR', () => {
        expect(DataType.CHAR()).toBe('CHAR');
    });

    it('should be return string equal to CHAR(30)', () => {
        expect(DataType.CHAR(30)).toBe('CHAR(30)');
    });

});

describe('DATE', () => {

    it('should be return string equal to DATE', () => {
        expect(DataType.DATE()).toBe('DATE');
    });

});

describe('DATETIME', () => {

    it('should be return string equal to DATETIME', () => {
        expect(DataType.DATETIME()).toBe('DATETIME');
    });

});

describe('ENUM', () => {

    it("should be return string equal to ENUM('Low', 'Medium', 'High')", () => {
        expect(DataType.ENUM(['Low', 'Medium', 'High'])).toBe("ENUM('Low', 'Medium', 'High')");
    });

});

describe('BOOLEAN', () => {

    it('should be return string equal to BOOLEAN', () => {
        expect(DataType.BOOLEAN()).toBe('BOOLEAN');
    });

});

describe('POINT', () => {

    it('should be return string equal to POINT', () => {
        expect(DataType.POINT()).toBe('POINT');
    });

    it('should be return string equal to POINT(5)', () => {
        expect(DataType.POINT(5)).toBe('POINT(5)');
    });

});

describe('TINYINT', () => {

    it('should be return string equal to TINYINT', () => {
        expect(DataType.TINYINT()).toBe('TINYINT');
    });

    it('should be return string equal to TINYINT(4)', () => {
        expect(DataType.TINYINT(4)).toBe('TINYINT(4)');
    });

});

describe('SMALLINT', () => {

    it('should be return string equal to SMALLINT', () => {
        expect(DataType.SMALLINT()).toBe('SMALLINT');
    });

    it('should be return string equal to SMALLINT(4)', () => {
        expect(DataType.SMALLINT(4)).toBe('SMALLINT(4)');
    });

});

describe('MEDIUMINT', () => {

    it('should be return string equal to MEDIUMINT', () => {
        expect(DataType.MEDIUMINT()).toBe('MEDIUMINT');
    });

    it('should be return string equal to MEDIUMINT(4)', () => {
        expect(DataType.MEDIUMINT(4)).toBe('MEDIUMINT(4)');
    });

});

describe('BIGINT', () => {

    it('should be return string equal to BIGINT', () => {
        expect(DataType.BIGINT()).toBe('BIGINT');
    });

    it('should be return string equal to BIGINT(30)', () => {
        expect(DataType.BIGINT(30)).toBe('BIGINT(30)');
    });

});

describe('DECIMAL', () => {

    it('should be return string equal to DECIMAL', () => {
        expect(DataType.DECIMAL()).toBe('DECIMAL');
    });

    it('should be return string equal to DECIMAL(1)', () => {
        expect(DataType.DECIMAL(1)).toBe('DECIMAL(1)');
    });

    it('should be return string equal to DECIMAL(19,4)', () => {
        expect(DataType.DECIMAL([19, 4])).toBe('DECIMAL(19,4)');
    });

});

describe('FLOAT', () => {

    it('should be return string equal to FLOAT', () => {
        expect(DataType.FLOAT()).toBe('FLOAT');
    });

    it('should be return string equal to FLOAT(30)', () => {
        expect(DataType.FLOAT(30)).toBe('FLOAT(30)');
    });

    it('should be return string equal to FLOAT(19,4)', () => {
        expect(DataType.FLOAT([19, 4])).toBe('FLOAT(19,4)');
    });

});

describe('DOUBLE', () => {

    it('should be return string equal to DOUBLE', () => {
        expect(DataType.DOUBLE()).toBe('DOUBLE');
    });

    it('should be return string equal to DOUBLE(30)', () => {
        expect(DataType.DOUBLE(30)).toBe('DOUBLE(30)');
    });

    it('should be return string equal to DOUBLE(19,4)', () => {
        expect(DataType.DOUBLE([19, 4])).toBe('DOUBLE(19,4)');
    });

});

describe('REAL', () => {

    it('should be return string equal to REAL', () => {
        expect(DataType.REAL()).toBe('REAL');
    });

    it('should be return string equal to REAL(30)', () => {
        expect(DataType.REAL(30)).toBe('REAL(30)');
    });

    it('should be return string equal to REAL(19,4)', () => {
        expect(DataType.REAL([19, 4])).toBe('REAL(19,4)');
    });

});

describe('BIT', () => {

    it('should be return string equal to BIT', () => {
        expect(DataType.BIT()).toBe('BIT');
    });

    it('should be return string equal to BIT(1)', () => {
        expect(DataType.BIT(1)).toBe('BIT(1)');
    });

});

describe('SERIAL', () => {

    it('should be return string equal to SERIAL', () => {
        expect(DataType.SERIAL()).toBe('SERIAL');
    });

    it('should be return string equal to SERIAL(100)', () => {
        expect(DataType.SERIAL(100)).toBe('SERIAL(100)');
    });

});

describe('TIMESTAMP', () => {

    it('should be return string equal to TIMESTAMP', () => {
        expect(DataType.TIMESTAMP()).toBe('TIMESTAMP');
    });

    it('should be return string equal to TIMESTAMP(10)',  () => {
        expect(DataType.TIMESTAMP(10)).toBe('TIMESTAMP(10)');
    });

});

describe('TIME', () => {

    it('should be return string equal to TIME', () => {
        expect(DataType.TIME()).toBe('TIME');
    });

    it('should be return string equal to TIME', () => {
        expect(DataType.TIME(6)).toBe('TIME(6)');
    });

});

describe('YEAR', () => {

    it('should be return string equal to YEAR', () => {
        expect(DataType.YEAR()).toBe('YEAR');
    });

    it('should be return string equal to YEAR(2)', () => {
        expect(DataType.YEAR(2)).toBe('YEAR(2)');
    });

});

describe('TINYTEXT', () => {

    it('should be return string equal to TINYTEXT', () => {
        expect(DataType.TINYTEXT()).toBe('TINYTEXT');
    });

});

describe('TEXT', () => {

    it('should be return string equal to TEXT', () => {
        expect(DataType.TEXT()).toBe('TEXT');
    });

    it('should be return string equal to TEXT(200)', () => {
        expect(DataType.TEXT(200)).toBe('TEXT(200)');
    });

});

describe('MEDIUMTEXT', () => {

    it('should be return string equal to MEDIUMTEXT', () => {
        expect(DataType.MEDIUMTEXT()).toBe('MEDIUMTEXT');
    });

});

describe('LONGTEXT', () => {

    it('should be return string equal to LONGTEXT', () => {
        expect(DataType.LONGTEXT()).toBe('LONGTEXT');
    });

});

describe('BINARY', () => {

    it('should be return string equal to BINARY', () => {
        expect(DataType.BINARY()).toBe('BINARY');
    });

    it('should be return string equal to BINARY(10)', () => {
        expect(DataType.BINARY(10)).toBe('BINARY(10)');
    });

});

describe('VARBINARY', () => {

    it('should be return string equal to VARBINARY(10)', () => {
        expect(DataType.VARBINARY(10)).toBe('VARBINARY(10)');
    });

});

describe('TINYBLOB', () => {

    it('should be return string equal to TINYBLOB', () => {
        expect(DataType.TINYBLOB()).toBe('TINYBLOB');
    });

});

describe('BLOB', () => {

    it('should be return string equal to BLOB', () => {
        expect(DataType.BLOB()).toBe('BLOB');
    });

    it('should be return string equal to BLOB(10)', () => {
        expect(DataType.BLOB(10)).toBe('BLOB(10)');
    });

});

describe('MEDIUMBLOB', () => {

    it('should be return string equal to MEDIUMBLOB', () => {
        expect(DataType.MEDIUMBLOB()).toBe('MEDIUMBLOB');
    });

});

describe('LONGBLOB', () => {

    it('should be return string equal to LONGBLOB', () => {
        expect(DataType.LONGBLOB()).toBe('LONGBLOB');
    });

});

describe('SET', () => {

    it("should be return string equal to SET('Low', 'Medium', 'High')", () => {
        expect(DataType.SET(['Low', 'Medium', 'High'])).toBe("SET('Low', 'Medium', 'High')");
    });

});