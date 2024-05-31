### Getting Started

In this tutorial you will learn to make a simple setup of Opensql.

### Installing

Opensql is available via [npm](https://www.npmjs.com/package/opensql).

```shell
npm i --save opensql
```

You'll also have to manually install the driver for your database of choice:

```shell
# One of the following:
$ npm i --save pg # Postgres
$ npm i --save mysql2 # Mysql
$ npm i --save mssql # Microsoft Sql Server
```

### Connecting to a database

To connect to the database, you must create a Opensql instance. This can be done by either passing the connection
parameters separately to the Opensql constructor or by passing a single connection URI:

```ts
import { OpenSql } from 'opensql';

let opensql = new OpenSql('mysql://localhost:3306/a?user=root&password=123');

opensql
  .findOne({ from: 'users' })
  .then((data: any) => {
    console.log(data)
  });
```

### Promises and async/await

Most of the methods provided by Opensql are asynchronous and therefore
return [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). They are
all Promises , so you can use the Promise API (for example, using `then`, `catch`, `finally`) out of the box.