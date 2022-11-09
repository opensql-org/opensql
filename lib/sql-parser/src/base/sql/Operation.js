let Query = require('../sql/Query');

class Operation extends Query {

    select(command) {
        return super.handle(command);
    }

    insert(command) {
        return super.handle(command);
    }

    update(command) {
        return super.handle(command);
    }

    delete(command) {
        return super.handle(command);
    }

}

module.exports = Operation;