module.exports = {

    handler(obj) {
        let arrayOfValue = [],
            arrayOfSql = [],
            indexForPlaceHolder = 1;

        for (let key in obj) {
            let value = obj[key];
            arrayOfSql.push(key);
            arrayOfValue.push(value);
            arrayOfSql.push(`= $${indexForPlaceHolder} ,`);
            indexForPlaceHolder++;
        }

        return {
            injection: arrayOfValue,
            indexForPlaceHolder: indexForPlaceHolder,
            toSQL: arrayOfSql.join(' ').replace(/,\s*$/, '').trim() // replace last comma in string
        }

    }


}