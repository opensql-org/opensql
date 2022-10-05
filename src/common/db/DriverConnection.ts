import Database from './Database';

export default interface DriverConnection extends Database {

    connect(url: string, option?: object): void;

    disconnect(): void;

}