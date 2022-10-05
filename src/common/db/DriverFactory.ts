import Database from './Database';


export default abstract class DriverFactory extends Database {

    protected abstract factory(str: string): void;

    protected abstract connect(url: string, option?: object): void;

}