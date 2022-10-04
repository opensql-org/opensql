import DatabaseFactory from "./src/common/db/DatabaseFactory";

let db = new DatabaseFactory('mysql:');
db.add();