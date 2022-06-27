const {
    COMMA,
    POINT,
} = require('./KeywordHelper');




module.exports = {


    POINT(Lat, Lon) {
        return `${POINT}(${Lat} ${Lon})`;
    },

    fieldPoint(field){
        return `X(${field}) AS Lat ${COMMA} Y(${field}) AS Lon`;
    }

}