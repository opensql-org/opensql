import {DEFAULT, POINT, qCheck, QueryPoint, CONCAT_WS, COUNT, IN, BETWEEN, LIKE} from '../package/func/helper';

describe('Contains all helper functions', () => {

    test('Point', () => {
        expect(POINT(4.5, 9)).toBe('POINT(4.5, 9)');
    });

    test('QueryPoint', () => {
        expect(QueryPoint('location')).toBe('X(location) AS Lat , Y(location) AS Lon');
    });

    describe('Default Function', () => {

        test('When argument haven\'t $ in first index of string', () => {
            expect(DEFAULT(false)).toBe('DEFAULT false');
        });

        test('When argument have $ in first index of string', () => {
            expect(DEFAULT('$Low')).toBe("DEFAULT 'Low'");
        });

    });

    describe('qCheck', () => {

        it('should be return object with data', () => {
            expect(qCheck('Treegex')).toMatchObject({
                value: '"Treegex"',
                conjunctionType: 'AND',
                comparisonOperator: '=',
                type: 'qCheck'
            });
        });

    });

    it('should be return string equal COUNT(*) AS size', async () => {
        expect(CONCAT_WS(' ', ['id', 'name'], 'like')).toBe('CONCAT_WS(" ", id,name) AS like');
    });

    it('should be return string equal COUNT(*) AS size', async () => {
        expect(COUNT()).toBe('COUNT(*) AS size');
    });

    it('should be return string equal COUNT(DISTINCT id)', async () => {
        expect(COUNT(['id'])).toBe('COUNT(DISTINCT id)');
    });

    it('should be return string equal COUNT(id)', async () => {
        expect(COUNT('id')).toBe('COUNT(id)');
    });


    describe('IN', () => {

        it('should be return object with data', () => {
            expect(IN([1, 5])).toMatchObject({
                value: [1, 5],
                conjunctionType: 'AND',
                type: 'IN'
            });
        });

    });

    describe('BETWEEN', () => {

        it('should be return object with data', () => {
            expect(BETWEEN(1, 5)).toMatchObject({
                value: {
                    first: 1,
                    second: 5
                },
                conjunctionType: 'AND',
                type: 'BETWEEN'
            });
        });

    });

    describe('LIKE', () => {

        it('should be return object with data', () => {
            expect(LIKE('%simple')).toMatchObject({
                value: '"%simple"',
                conjunctionType: 'AND',
                type: 'LIKE'
            });
        });

    });


});