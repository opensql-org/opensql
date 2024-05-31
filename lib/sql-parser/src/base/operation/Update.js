const BaseSQL = require('../sql/BaseSQL');

class UpdateOperation extends BaseSQL {
  resInjection = () => this.injectionHandler();

  queryInit = () => this.queryWhereHandler();

  getEitField() {}

  toSQL() {}

  injection() {
    return this.resInjection();
  }

  getDataFromWhereCondition(arr) {}

  injectionHandler() {
    let editFields = this.getEitField().injection;
    const whereInjection = this.getDataFromWhereCondition(
      this.hasWhereCondition ? this.queryInit().injection : [],
    );

    if (this.hasWhereCondition) {
      editFields = editFields.concat(whereInjection);
      editFields.unshift(this.from);
      return editFields;
    }

    editFields.unshift(this.from);
    return editFields;
  }
}

module.exports = UpdateOperation;
