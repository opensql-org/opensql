let {
        query
    } = require('../DatabaseConnection'),
    {
        setNullValueInRam
    } = require('../util/Utilites');

module.exports = {


    run(sqlQuery, inject = null) {
        query(sqlQuery, inject);
        setNullValueInRam();
    }

}