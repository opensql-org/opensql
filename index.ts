import DatabaseFactory from "./src/common/db/DatabaseFactory";

let db = new DatabaseFactory('mysql://localhost:3306/a?user=root');
db.query('SELECT * FROM mock_data').then(data=>{
    console.log(data)
});
