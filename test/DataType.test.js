let DataType = require('../src/util/DataType'),
    {
        NOT_NULL
    } = require('../src/util/QueryHelper'),
    {
        AUTO_INCREMENT
    } = require('../src/util/KeywordHelper');


describe('Options Contain',() => {

    it('should be return string equal to varchar(30) NOT NULL', () => {
        expect(DataType.VARCHAR([[NOT_NULL], 30])).toBe('varchar(30) NOT NULL');
    });

    it('should be return string equal to varchar(30) NOT NULL AUTO_INCREMENT', () => {
        expect(DataType.VARCHAR([[NOT_NULL, AUTO_INCREMENT], 30])).toBe('varchar(30) NOT NULL AUTO_INCREMENT');
    });

    it("should be return string equal to enum('Low', 'Medium', 'High') NOT NULL AUTO_INCREMENT", () => {
        expect(DataType.ENUM([[NOT_NULL, AUTO_INCREMENT],'Low', 'Medium', 'High'])).toBe("enum('Low', 'Medium', 'High') NOT NULL AUTO_INCREMENT");
    });

});


describe('VARCHAR', () => {

    it('should be return string equal to varchar', () => {
        expect(DataType.VARCHAR()).toBe('varchar');
    });

    it('should be return string equal to varchar(30)', () => {
        expect(DataType.VARCHAR(30)).toBe('varchar(30)');
    });

});

describe('INT', () => {

    it('should be return string equal to int', () => {
        expect(DataType.INT()).toBe('int');
    });

    it('should be return string equal to int(30)', () => {
        expect(DataType.INT(30)).toBe('int(30)');
    });

});

describe('CHAR', () => {

    it('should be return string equal to char', () => {
        expect(DataType.CHAR()).toBe('char');
    });

    it('should be return string equal to char(30)', () => {
        expect(DataType.CHAR(30)).toBe('char(30)');
    });

});

describe('DATE', () => {

    it('should be return string equal to date', () => {
        expect(DataType.DATE()).toBe('date');
    });

});

describe('DATETIME', () => {

    it('should be return string equal to datetime', () => {
        expect(DataType.DATETIME()).toBe('datetime');
    });

});

describe('ENUM', () => {

    it("should be return string equal to enum('Low', 'Medium', 'High')", () => {
        expect(DataType.ENUM(['Low', 'Medium', 'High'])).toBe("enum('Low', 'Medium', 'High')");
    });

});

describe('BOOLEAN', () => {

    it('should be return string equal to boolean', () => {
        expect(DataType.BOOLEAN()).toBe('boolean');
    });

});

describe('POINT', () => {

    it('should be return string equal to point', () => {
        expect(DataType.POINT()).toBe('point');
    });

    it('should be return string equal to point(5)', () => {
        expect(DataType.POINT(5)).toBe('point(5)');
    });

});

describe('TINYINT', () => {

    it('should be return string equal to tinyint', () => {
        expect(DataType.TINYINT()).toBe('tinyint');
    });

    it('should be return string equal to tinyint(4)', () => {
        expect(DataType.TINYINT(4)).toBe('tinyint(4)');
    });

});

describe('SMALLINT', () => {

    it('should be return string equal to smallint', () => {
        expect(DataType.SMALLINT()).toBe('smallint');
    });

    it('should be return string equal to smallint(4)', () => {
        expect(DataType.SMALLINT(4)).toBe('smallint(4)');
    });

});

describe('MEDIUMINT', () => {

    it('should be return string equal to mediumint', () => {
        expect(DataType.MEDIUMINT()).toBe('mediumint');
    });

    it('should be return string equal to mediumint(4)', () => {
        expect(DataType.MEDIUMINT(4)).toBe('mediumint(4)');
    });

});

describe('BIGINT', () => {

    it('should be return string equal to bigint', () => {
        expect(DataType.BIGINT()).toBe('bigint');
    });

    it('should be return string equal to bigint(30)', () => {
        expect(DataType.BIGINT(30)).toBe('bigint(30)');
    });

});

describe('DECIMAL', () => {

    it('should be return string equal to decimal', () => {
        expect(DataType.DECIMAL()).toBe('decimal');
    });

    it('should be return string equal to decimal(1)', () => {
        expect(DataType.DECIMAL(1)).toBe('decimal(1)');
    });

    it('should be return string equal to decimal(19,4)', () => {
        expect(DataType.DECIMAL([19, 4])).toBe('decimal(19,4)');
    });

});

describe('FLOAT', () => {

    it('should be return string equal to float', () => {
        expect(DataType.FLOAT()).toBe('float');
    });

    it('should be return string equal to float(30)', () => {
        expect(DataType.FLOAT(30)).toBe('float(30)');
    });

    it('should be return string equal to float(19,4)', () => {
        expect(DataType.FLOAT([19, 4])).toBe('float(19,4)');
    });

});

describe('DOUBLE', () => {

    it('should be return string equal to double', () => {
        expect(DataType.DOUBLE()).toBe('double');
    });

    it('should be return string equal to double(30)', () => {
        expect(DataType.DOUBLE(30)).toBe('double(30)');
    });

    it('should be return string equal to double(19,4)', () => {
        expect(DataType.DOUBLE([19, 4])).toBe('double(19,4)');
    });

});

describe('REAL', () => {

    it('should be return string equal to real', () => {
        expect(DataType.REAL()).toBe('real');
    });

    it('should be return string equal to real(30)', () => {
        expect(DataType.REAL(30)).toBe('real(30)');
    });

    it('should be return string equal to real(19,4)', () => {
        expect(DataType.REAL([19, 4])).toBe('real(19,4)');
    });

});

describe('BIT', () => {

    it('should be return string equal to bit', () => {
        expect(DataType.BIT()).toBe('bit');
    });

    it('should be return string equal to bit(1)', () => {
        expect(DataType.BIT(1)).toBe('bit(1)');
    });

});

describe('SERIAL', () => {

    it('should be return string equal to serial', () => {
        expect(DataType.SERIAL()).toBe('serial');
    });

    it('should be return string equal to serial(100)', () => {
        expect(DataType.SERIAL(100)).toBe('serial(100)');
    });

});

describe('TIMESTAMP', () => {

    it('should be return string equal to timestamp', () => {
        expect(DataType.TIMESTAMP()).toBe('timestamp');
    });

    it('should be return string equal to timestamp(10)', () => {
        expect(DataType.TIMESTAMP(10)).toBe('timestamp(10)');
    });

});

describe('TIME', () => {

    it('should be return string equal to time', () => {
        expect(DataType.TIME()).toBe('time');
    });

});

describe('YEAR', () => {

    it('should be return string equal to year', () => {
        expect(DataType.YEAR()).toBe('year');
    });

    it('should be return string equal to year(2)', () => {
        expect(DataType.YEAR(2)).toBe('year(2)');
    });

});

describe('TINYTEXT', () => {

    it('should be return string equal to tinytext', () => {
        expect(DataType.TINYTEXT()).toBe('tinytext');
    });

});

describe('TEXT', () => {

    it('should be return string equal to text', () => {
        expect(DataType.TEXT()).toBe('text');
    });

    it('should be return string equal to text(200)', () => {
        expect(DataType.TEXT(200)).toBe('text(200)');
    });

});

describe('MEDIUMTEXT', () => {

    it('should be return string equal to mediumtext', () => {
        expect(DataType.MEDIUMTEXT()).toBe('mediumtext');
    });

});

describe('LONGTEXT', () => {

    it('should be return string equal to longtext', () => {
        expect(DataType.LONGTEXT()).toBe('longtext');
    });

});

describe('BINARY', () => {

    it('should be return string equal to binary', () => {
        expect(DataType.BINARY()).toBe('binary');
    });

    it('should be return string equal to binary(10)', () => {
        expect(DataType.BINARY(10)).toBe('binary(10)');
    });

});

describe('VARBINARY', () => {

    it('should be return string equal to varbinary(10)', () => {
        expect(DataType.VARBINARY(10)).toBe('varbinary(10)');
    });

});

describe('TINYBLOB', () => {

    it('should be return string equal to tinyblob', () => {
        expect(DataType.TINYBLOB()).toBe('tinyblob');
    });

});

describe('BLOB', () => {

    it('should be return string equal to blob', () => {
        expect(DataType.BLOB()).toBe('blob');
    });

    it('should be return string equal to blob(10)', () => {
        expect(DataType.BLOB(10)).toBe('blob(10)');
    });

});

describe('MEDIUMBLOB', () => {

    it('should be return string equal to mediumblob', () => {
        expect(DataType.MEDIUMBLOB()).toBe('mediumblob');
    });

});

describe('LONGBLOB', () => {

    it('should be return string equal to longblob', () => {
        expect(DataType.LONGBLOB()).toBe('longblob');
    });

});

describe('SET', () => {

    it("should be return string equal to set('Low', 'Medium', 'High')", () => {
        expect(DataType.SET(['Low', 'Medium', 'High'])).toBe("set('Low', 'Medium', 'High')");
    });

});