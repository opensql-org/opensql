let {
        IN,
        OR,
        AND,
        LIKE,
        NULL,
        COUNT,
        BETWEEN,
        CONCAT_WS,
        LESS_THAN,
        setOperator
    } = require('../src/util/QueryHelper'),
    keyHelper = require('../src/util/KeywordHelper');


describe('Query Helper Module', () => {

    it('should be throw error Invalid data type', async () => {
        expect(() => {
            setOperator(NULL);
        }).toThrow('Invalid data type');
    });

    it('should be throw error Invalid data type', async () => {
        expect(() => {
            setOperator(NULL, undefined);
        }).toThrow('Invalid data type');
    });

    it('should be return string equal to < POINTER_FOR_SPACE Treegex', async () => {
        expect(setOperator(LESS_THAN, 'Treegex')).toBe('< POINTER_FOR_SPACE Treegex');
    });

    it('should be return string equal to and < POINTER_FOR_SPACE Treegex', async () => {
        expect(setOperator(LESS_THAN, 'Treegex', keyHelper.AND)).toBe('and < POINTER_FOR_SPACE Treegex');
    });

    it('should be return array equal to [\'OR\',\'id\',\'10\']', async () => {
        expect(OR({
            id: 10
        })).toEqual(
            ['OR', 'id', '10']
        );
    });

    it('should be return array equal to [\'AND\',\'id\',\'10\']', async () => {
        expect(AND({
            id: 10
        })).toEqual(
            ['AND', 'id', '10']
        );
    });

    it('should be return string equal to POINTER_FOR_IN 1,5', async () => {
        expect(IN([1, 5])).toBe('POINTER_FOR_IN 1,5');
    });

    it('should be return string equal and to POINTER_FOR_IN 1,5', async () => {
        expect(IN([1, 5], keyHelper.AND)).toBe('and POINTER_FOR_IN 1,5');
    });

    it('should be return string equal to  POINTER_FOR_BETWEEN 1 POINTER_FOR_AND 5', async () => {
        expect(BETWEEN(1, 5)).toBe('POINTER_FOR_BETWEEN 1 POINTER_FOR_AND 5');
    });

    it('should be return string equal and  POINTER_FOR_BETWEEN 1 POINTER_FOR_AND 5', async () => {
        expect(BETWEEN(1, 5, keyHelper.AND)).toBe('and POINTER_FOR_BETWEEN 1 POINTER_FOR_AND 5');
    });

    it('should be return string equal to POINTER_FOR_LIKE %a', async () => {
        expect(LIKE('%a')).toBe('POINTER_FOR_LIKE %a');
    });

    it('should be return string equal and POINTER_FOR_LIKE %a', async () => {
        expect(LIKE('%a', keyHelper.AND)).toBe('and POINTER_FOR_LIKE %a');
    });

    it('should be return string equal COUNT(DISTINCT id)', async () => {
        expect(COUNT(['id'])).toBe('COUNT(DISTINCT id)');
    });

    it('should be return string equal COUNT(id)', async () => {
        expect(COUNT('id')).toBe('COUNT(id)');
    });

    it('should be return string equal COUNT(*) AS size', async () => {
        expect(COUNT()).toBe('COUNT(*) AS size');
    });

    it('should be return string equal COUNT(*) AS size', async () => {
        expect(CONCAT_WS(' ', ['id', 'name'], 'like')).toBe('CONCAT_WS(" ", id,name) AS like');
    });

});