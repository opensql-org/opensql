import {
  BETWEEN,
  CONCAT_WS,
  CONTAINS,
  COUNT,
  DEFAULT,
  EXTRACT,
  IN,
  JSON,
  LIKE,
  POINT,
  qCheck,
  QueryPoint,
} from '../package/func/helper';

describe('Contains all helper functions', () => {
  test('Point', () => {
    expect(POINT(4.5, 9)).toBe('POINT(4.5, 9)');
  });

  test('QueryPoint', () => {
    expect(QueryPoint('location')).toBe(
      'X(location) AS Lat , Y(location) AS Lon',
    );
  });

  describe('Default Function', () => {
    test("When argument haven't $ in first index of string", () => {
      expect(DEFAULT(false)).toBe('DEFAULT false');
    });

    test('When argument have $ in first index of string', () => {
      expect(DEFAULT('$Low')).toBe("DEFAULT 'Low'");
    });
  });

  describe('qCheck', () => {
    it('should be return object with data', () => {
      expect(qCheck('Treegex')).toMatchObject({
        value: 'Treegex',
        conjunctionType: 'AND',
        comparisonOperator: '=',
        type: 'qCheck',
      });
    });
  });

  it('should be return string equal COUNT(*) AS size', () => {
    expect(CONCAT_WS(' ', ['id', 'name'], 'like')).toBe(
      'CONCAT_WS(" ", "id", "name") AS like',
    );
  });

  it('should be return string equal COUNT(*) AS size', () => {
    expect(COUNT()).toBe('COUNT(*) AS size');
  });

  it('should be return string equal COUNT(DISTINCT id)', () => {
    expect(COUNT(['id'])).toBe('COUNT(DISTINCT id)');
  });

  it('should be return string equal COUNT(id)', () => {
    expect(COUNT('id')).toBe('COUNT(id)');
  });

  it('should be return string array to equal ["id", "name"]', () => {
    expect(JSON(['id', 'name'])).toBe('["id", "name"]');
  });

  it('should be return string array to equal [1, 2]', () => {
    expect(JSON([1, 2])).toBe('[1, 2]');
  });

  it("should be return string array to equal JSON_EXTRACT('[1,2,3,4,5]', '$[last-3 to last-1]')", () => {
    expect(EXTRACT([1, 2, 3, 4, 5], '$[last-3 to last-1]')).toBe(
      "JSON_EXTRACT('[1,2,3,4,5]', '$[last-3 to last-1]')",
    );
  });

  it('should be return string that have json object to equal {"username":"root"}', () => {
    expect(JSON({ username: 'root' })).toBe('{"username":"root"}');
  });

  it('should be return string to equal JSON_CONTAINS(\'{"username":"root"}\', \'{"password":"root"}\')', () => {
    expect(CONTAINS({ username: 'root' }, { password: 'root' })).toBe(
      'JSON_CONTAINS(\'{"username":"root"}\', \'{"password":"root"}\')',
    );
  });

  it('should be return string that have array of json object to equal [{"username":"root"}, {"username":"root"}]', () => {
    expect(JSON([{ username: 'root' }, { username: 'root' }])).toBe(
      '[{"username":"root"}, {"username":"root"}]',
    );
  });

  describe('IN', () => {
    it('should be return object with data', () => {
      expect(IN([1, 5])).toMatchObject({
        value: [1, 5],
        conjunctionType: 'AND',
        type: 'IN',
      });
    });
  });

  describe('BETWEEN', () => {
    it('should be return object with data', () => {
      expect(BETWEEN(1, 5)).toMatchObject({
        value: {
          first: 1,
          second: 5,
        },
        conjunctionType: 'AND',
        type: 'BETWEEN',
      });
    });
  });

  describe('LIKE', () => {
    it('should be return object with data', () => {
      expect(LIKE('%simple')).toMatchObject({
        value: '%simple',
        conjunctionType: 'AND',
        type: 'LIKE',
      });
    });
  });
});
