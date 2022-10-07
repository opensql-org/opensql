export default class Util {

    private constructor() {
    }

    private static instance: Util;

    public static getInstance(): Util {

        if (!Util.instance)
            Util.instance = new Util();

        return Util.instance;
    }


    getDriverNameFromString(str: string): string {
        return str.split(':')[0];
    }

    /**
     * @param url
     * @param option
     */
    urlHandler(url: string, option?: object): object {
        let finalObject = {};

        if (option)
            Object.assign(finalObject, option);

        let password = '',
            username = '',
            database = '',
            userWithPass = [],
            hostWithPort: any = url.split('/')[2],
            dbNameWithUserAndPass: any = url.split('/')[3],
            isSetPort = hostWithPort.search(':') !== -1,
            isSetDatabase = dbNameWithUserAndPass.search('\\?') !== -1;

        if (isSetPort) {
            hostWithPort = hostWithPort.split(':');
            finalObject = {
                host: hostWithPort[0],
                port: hostWithPort[1]
            };
        }

        if (isSetDatabase) {
            dbNameWithUserAndPass = dbNameWithUserAndPass.split('?');
            userWithPass = dbNameWithUserAndPass[1].split('=');
            username = userWithPass[1].split('&')[0];
            database = dbNameWithUserAndPass[0]
            password = userWithPass[2];

            dbNameWithUserAndPass = {
                database: database,
                user: username,
                password: password
            }

            Object.assign(finalObject, dbNameWithUserAndPass);

        }

        return finalObject;
    }

}