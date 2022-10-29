export default abstract class DriverController {

    /**
     * Saving database name
     * @private
     */
    private name: string = '';

    protected setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }


}