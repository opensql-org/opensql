module.exports = {

    toString(object) {
        return JSON.stringify(object)
            // remove quotes from Json keys
            // thank you : https://stackoverflow.com/a/60574755/14741947
            .replace(/("(\\[^]|[^\\"])*"(?!\s*:))|"((\\[^]|[^\\"])*)"(?=\s*:)/g, '$1$3')
            .replace(/[{}]/g, '')
            .replace(/:/g, '=')
            .replace(/,/g, ', ');
    },

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