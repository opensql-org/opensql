module.exports = {

    handler(obj) {
        let arrayOfKeyAndValue = [],
            size = 0;

        for (let key in obj) {
            let value = obj[key];
            arrayOfKeyAndValue.push(key);
            arrayOfKeyAndValue.push(value);
            size++;
        }

        return {
            injection: arrayOfKeyAndValue,
            toSQL: '?? = ? , '.repeat(size).replace(/,\s*$/, '').trim() // replace last comma in string
        }

    }

}