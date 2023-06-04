module.exports = {

    clearSql(queryResult, injection) {
        let regexPlaceHolder = /__\$(.*?)\$__/,
            index = 0,
            query = queryResult.split(' ');


        query.forEach((item, i, arr) => {

            if (item === '')
                return;

            if (regexPlaceHolder.test(item)) {
                let obj = injection[index];

                if (obj?.type === 'VALUE' && typeof obj?.value === 'string')
                    obj.value = `"${obj.value}"`;


                if (obj?.type === 'VALUE' && Array.isArray(obj?.value))
                    obj.value = obj.value.map(element => typeof element === 'string' ? `"${element}"` : element);


                if (obj?.value)
                    arr[i] = obj?.value;


                index++;
            }

        });


        return query.join(' ');
    }

}