const BaseSQL = require('../sql/BaseSQL');

class SelectOperation extends BaseSQL {
  queryResult = [];

  injectionResult = [];

  baseQuery() {
    return ['SELECT', this.expressions, 'FROM', '__$TABLE_NAME$__'].join(' ');
  }

  queryReplacedForPlaceHolder() {}

  pushQueryAndInjection() {
    const query = this.queryWhereHandler();

    this.queryResult.push(
      [this.baseQuery(), query.toSQL]
        .filter(d => d)
        .join(' ')
        .trim(),
    );

    this.injectionResult.push(...query.injection);

    if (this.union) {
      for (const { type, value } of this.union) {
        this.validateObject(value);
        this.addUnionKeyword(type);
        const query = this.queryWhereHandler();
        this.queryResult.push(query.toSQL);
        this.injectionResult.push(...query.injection);
      }
    }
  }

  toSQL() {
    this.pushQueryAndInjection();

    return this.queryReplacedForPlaceHolder();
  }

  injection() {
    this.pushQueryAndInjection();

    return this.injectionResult;
  }
}

module.exports = SelectOperation;
