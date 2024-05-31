import { Database } from '../../package/type/db/Query';

function getPort(database: Database): number {
  return {
    postgresql: 5432,
    mssql: 1433,
    mysql: 3306,
  }[database];
}

export { getPort };
