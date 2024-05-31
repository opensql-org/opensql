export default abstract class DriverController {
  /**
   * Store the name of the database that the client wants to work on
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
