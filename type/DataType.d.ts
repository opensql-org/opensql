declare module dataType {

    interface DataType {

        VARCHAR(data: number | any[]): string;

        INT(data?: number | any[]): string;

        CHAR(data: number | any[]): string;

        DATE(data?: any[]): string;

        TIME(data?: any[]): string;

        DATETIME(data?: any[]): string;

        ENUM(data: any[]): string;

        BOOLEAN(data?: number | any[]): string;

        POINT(data?: number | any[]): string;

        TINYINT(data?: number | any[]): string;

        SMALLINT(data?: number | any[]): string;

        MEDIUMINT(data?: number | any[]): string;

        BIGINT(data?: number | any[]): string;

        DECIMAL(data?: number | any[]): string;

        FLOAT(data?: number | any[]): string;

        DOUBLE(data?: number | any[]): string;

        REAL(data?: number | any[]): string;

        BIT(data?: number | any[]): string;

        SERIAL(data?: number | any[]): string;

        TIMESTAMP(data?: any[]): string;

        YEAR(data?: any[]): string;

        TINYTEXT(data?: number | any[]): string;

        TEXT(data?: number | any[]): string;

        MEDIUMTEXT(data?: number | any[]): string;

        LONGTEXT(data?: number | any[]): string;

        BINARY(data?: number | any[]): string;

        VARBINARY(data: number | any[]): string;

        TINYBLOB(data?: any[]): string;

        BLOB(data?: any[]): string;

        MEDIUMBLOB(data?: any[]): string;

        LONGBLOB(data?: any[]): string;

        SET(data: any[]): string;

    }

}

export = dataType;