module.exports = {

    objectSeparator(obj, validArr) {
        if (!obj)
            return obj;

        validArr.forEach(item => {

            let isObjectDefined = obj[item];

            if (!isObjectDefined)
                return;

            if (isObjectDefined)
                delete obj[item];

        });

        return obj;
    }

}