import {CRUD, Option} from '../../../package/type/db/Query';

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

}