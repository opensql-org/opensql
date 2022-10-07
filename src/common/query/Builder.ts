import {CRUD, Option} from '../../../package/type/db/Query';
import keyword from '../../../package/sql/Keyword';

export default class Builder {

    private queryInjection: any[];

    sql(query?: CRUD | Option, option?: Option): string {
        return '';
    }

    injection(): Array<any> {
        return this.queryInjection;
    }


    findOne(query?: CRUD | Option, option?: Option): string {
        return '';
    }

    updateOne(query?: CRUD | Option, option?: Option): string {
        return '';
    }

    removeOne(query?: CRUD | Option, option?: Option): string {
        return '';
    }

    addOne(crud?: CRUD): string {
        return '';
    }


    createDatabase(name: string, set: string = 'UTF8', collate: string = 'UTF8_UNICODE_CI'): string {
        return [
            keyword.CREATE, keyword.DATABASE, keyword.IF_NOT_EXISTS,
            name, 'CHARACTER', keyword.SET, set, 'COLLATE', collate
        ].join(' ');
    }

    dropDatabase(name: string): string {
        return [
            keyword.DROP, keyword.DATABASE, name
        ].join(' ');
    }

}