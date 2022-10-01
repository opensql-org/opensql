export default abstract class Connection {

    abstract connect(url: string, option?: object): Promise<any>;

    abstract disconnect(): Promise<any>;

}