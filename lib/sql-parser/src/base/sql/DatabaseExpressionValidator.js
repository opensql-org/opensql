module.exports = {
  toSQL(datum) {
    if (!datum) {
      return '*';
    }

    return `${datum}`;
  },
};
