export default abstract class DatabaseConfig {

    /**
     * Saving database name
     * @private
     */
    private name: string = '';

    setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

}