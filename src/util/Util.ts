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

}