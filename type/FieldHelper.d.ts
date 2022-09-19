declare module fieldHelper {

    interface FieldHelper {

        POINT(Lat: number, Lon: number): string;

        fieldPoint(field: string): string;

        DEFAULT(value: string): string;

    }

}

export = fieldHelper;