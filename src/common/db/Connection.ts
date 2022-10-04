export default abstract class Connection {

    abstract connect(url: string, option?: object): void;

    abstract disconnect(): void;

}