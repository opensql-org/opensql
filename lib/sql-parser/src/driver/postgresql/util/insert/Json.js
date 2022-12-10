module.exports = {

    handler(object) {
        let placeHolder = '',
            index = 1,
            columns = [],
            values = [];

        for (let key in object) {
            columns.push(key);
            values.push(object[key]);
            placeHolder += `$${index}, `;
            index++;
        }

        /**
         * Replace last comma in string
         */
        placeHolder = placeHolder.replace(/,\s*$/, '').trim();

        return {
            toValue: values.map(element => {
                if (typeof element === 'string')
                    return `"${element}"`;
                return element;
            }).join(', '),
            toArray: values,
            toColumn: columns.join(', '),
            toPlaceHolder: placeHolder
        }
    }

}