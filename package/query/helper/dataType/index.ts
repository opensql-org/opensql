import types from '../../../sql/Types';
import {money} from './money';
import {dateTime} from './dateTime';


export default function (dbName: string, str: string): string {

    let searchInString = (data: string): boolean => str.search(data) !== -1,
        isMoney = searchInString(types.money),
        isSmallDateTime = searchInString(types.smalldatetime),
        isDateTime2 = searchInString(types.datetime2),
        isDateTimeOffset = searchInString(types.datetimeoffset),
        isSmallMoney = searchInString(types.smallmoney);

    if (isMoney)
        return money[dbName]?.query(str, types.money);

    if (isSmallMoney)
        return money[dbName]?.query(str, types.smallmoney);

    if (isSmallDateTime)
        return dateTime[dbName]?.query(str, types.smalldatetime);

    if (isDateTime2)
        return dateTime[dbName]?.query(str, types.datetime2);

    if (isDateTimeOffset)
        return dateTime[dbName]?.query(str, types.datetimeoffset);

    return str;
}
