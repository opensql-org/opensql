module.exports = {
  clearSql(queryResult, injection) {
    const regexPlaceHolder = /__\$(.*?)\$__/;
    const query = queryResult.split(' ');
    let index = 0;

    for (let i = 0; i < query.length; i++) {
      const it = query[i];

      if (it === '' || !regexPlaceHolder.test(it)) {
        continue;
      }

      const obj = injection[index];

      if (obj?.type === 'VALUE' && typeof obj?.value === 'string') {
        obj.value = `"${obj.value}"`;
      }

      if (obj?.type === 'VALUE' && Array.isArray(obj?.value)) {
        obj.value = obj.value.map(element =>
          typeof element === 'string' ? `"${element}"` : element,
        );
      }

      if (obj?.value) {
        query[i] = obj?.value;
      }

      index++;
    }

    return query.join(' ');
  },
};
