let {
        IN,
        OR,
        AND,
        LIKE,
        NULL,
        BETWEEN,
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

    it('should be return string equal to < SPACE Treegex', async () => {
        expect(setOperator(LESS_THAN, 'Treegex')).toBe('< SPACE Treegex');
    });

    it('should be return string equal to and < SPACE Treegex', async () => {
        expect(setOperator(LESS_THAN, 'Treegex', keyHelper.AND)).toBe('and < SPACE Treegex');
    });

    it('should be return array equal to [\'OR\',\'id\',\'10\']', async () => {
        expect(OR({
            id: 10
        })).toEqual(expect.arrayContaining(
            ['OR', 'id', '10']
        ));
    });

    it('should be return array equal to [\'AND\',\'id\',\'10\']', async () => {
        expect(AND({
            id: 10
        })).toEqual(expect.arrayContaining(
            ['AND', 'id', '10']
        ));
    });

    it('should be return string equal to in 1,5', async () => {
        expect(IN([1, 5])).toBe('in 1,5');
    });

    it('should be return string equal and to in 1,5', async () => {
        expect(IN([1, 5], keyHelper.AND)).toBe('and in 1,5');
    });

    it('should be return string equal to between 1 and 5', async () => {
        expect(BETWEEN(1, 5)).toBe('between 1 and 5');
    });

    it('should be return string equal and between 1 and 5', async () => {
        expect(BETWEEN(1, 5, keyHelper.AND)).toBe('and between 1 and 5');
    });

    it('should be return string equal to like %a', async () => {
        expect(LIKE('%a')).toBe('like %a');
    });

    it('should be return string equal and like %a', async () => {
        expect(LIKE('%a', keyHelper.AND)).toBe('and like %a');
    });

});