let Query = require('../sql/Query');

class Operation extends Query {

    select(command) {
        return this.handle(command);
    }

    insert(command) {
        return this.handle(command);
    }

    update(command) {
        return this.handle(command);
    }

    delete(command) {
        return this.handle(command);
    }

}

module.exports = Operation;