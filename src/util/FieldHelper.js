const {
    COMMA
} = require('../util/KeywordHelper');




module.exports = {


    POINT(Lat, Lon) {
        return `POINT(${Lat} ${Lon})`;
    },

    fieldPoint(field) {
        return `X(${field}) AS Lat ${COMMA} Y(${field}) AS Lon`;
    },

    DEFAULT(value) {
        if (value.toString().indexOf('$') === 0) {
            return "DEFAULT " + "'" + value.replace('$', '') + "'";
        }
        return `DEFAULT ${value}`;
    }

}