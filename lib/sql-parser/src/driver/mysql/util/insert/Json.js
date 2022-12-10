module.exports = {

    toValue(obj) {
        let arrayOfValueFromJsonObject = [],
            arrayOfColumnFromJsonObject = [],
            length = 0;

        for (let key in obj) {
            arrayOfValueFromJsonObject.push(obj[key]);
            arrayOfColumnFromJsonObject.push(key);
            length++;
        }

        return {
            length: length,
            value: arrayOfValueFromJsonObject.join(', '),
            column: arrayOfColumnFromJsonObject.join(', ')
        };
    }

}