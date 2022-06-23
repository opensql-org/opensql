const {
    OR,
    AND,
    LIKE,
    NULL,
    COMMA,
    POINT,
    BETWEEN,
    NOT_NULL,
    EQUAL_TO,
    LESS_THAN,
    GREATER_THAN,
    NOT_EQUAL_TO,
    LESS_THAN_OR_EQUAL_TO,
    GREATER_THAN_OR_EQUAL_TO
} = require('./SqlKeyword');


let arrayOfOperator = [
    OR,
    AND,
    LIKE,
    NULL,
    BETWEEN,
    NOT_NULL,
    EQUAL_TO,
    LESS_THAN,
    NOT_EQUAL_TO,
    GREATER_THAN,
    LESS_THAN_OR_EQUAL_TO,
    GREATER_THAN_OR_EQUAL_TO
];


module.exports = {

    getOperatorAndValue(operator, value) {
        let itemInArrayOfOperator = arrayOfOperator.includes(operator);

        if (!itemInArrayOfOperator)
            throw  new Error('Invalid data type');

        return `${operator}SPACE${value}`;

    },


    POINT(Lat, Lon) {
        return `${POINT}(${Lat} ${Lon})`;
    },

    fieldPoint(field){
        return `X(${field}) AS Lat ${COMMA} Y(${field}) AS Lon`;
    }

}