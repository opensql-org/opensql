# Connection

The connection in Opensql is written in the simplest way,

```ts
import {OpenSql} from 'opensql';

let opensql = new OpenSql('driver://domain:port/databaseName?user=username&password=password');
```

Example Code :

```ts
import {OpenSql} from 'opensql';

let opensql = new OpenSql('mysql://localhost:3306/a?user=root&password=123');
```

When you get an example of open sql, in the constructor part, it receives a parameter of string type, which is the basic
information needed to connect to the desired database, then it receives another parameter of object type, which is used
in the event of the second argument. If you want to manage your database.

📒**Note :** The second argument can have different values depending on the type of driver, so pay full attention to the
options of each driver.

|     | Driver                                                                                                            |
|-----|-------------------------------------------------------------------------------------------------------------------|
| 0   | [Mysql](https://github.com/mysqljs/mysql#connection-options)                                                      |
| 1   | [Postgres](https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string)                     |
| 2   | [Microsoft Sql Server (Mssql)](https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string) |

# Port

Naturally, the default ports of each driver are different from each other. A list of default ports

| Driver         | Port |
|----------------|------|
| **Mysql**      | 3306 |
| **Mssql**      | 1433 |
| **Postgresql** | 5432 |


# Disconnect

To disconnect in Opensql, use the disconnect method.

Example code :

```ts
opensql.disconnect();
```