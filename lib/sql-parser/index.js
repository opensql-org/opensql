const Query = require('./src/query');

class SqlParser extends Query {

    constructor(sqlConfig, ...command) {
        super(sqlConfig, command);
    }

}

module.exports = SqlParser;


let a = new module.exports({
    type: 'mysql',
    operation: {
        insert: 'multi'
    },
    operationType: 'insert'
}, {
    from:'users',
    data: {
        username: 'root     ',
        password: 'foo'
    }
});
console.log(a.toSQL())