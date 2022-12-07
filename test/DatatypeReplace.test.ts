import dataTypeHandler from '../package/query/helper/dataType';

describe('mysql', () => {

    test('MONEY', () => {

        expect(dataTypeHandler('mysql', 'MONEY')).toBe('DECIMAL(15,2)');

        expect(dataTypeHandler('mysql', 'MONEY NOT NULL')).toBe('DECIMAL(15,2) NOT NULL');

    });

});

describe('postgresql', () => {

    test('DATETIME2', () => {

        expect(dataTypeHandler('postgresql', 'DATETIME2')).toBe('TIMESTAMP WITH TIME ZONE');

        expect(dataTypeHandler('postgresql', 'DATETIME2 NOT NULL')).toBe('TIMESTAMP WITH TIME ZONE NOT NULL');

    });

});