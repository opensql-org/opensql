exports.DatabaseConnectionError = (message) => {
    throw new Error(`Error: Database connection failed! => ${message}`);
}