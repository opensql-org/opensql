import types from '../../../sql/Types';
import {money} from './money';
import {dateTime} from './dateTime';
import {varcharMax} from './varcharMax';
import {ntext} from './ntext';


export default function (dbName: string, str: string): string {

    let searchInString = (data: string): boolean => str.search(data) !== -1,
        isXml = searchInString(types.xml),
        isMoney = searchInString(types.money),
        isNchar = searchInString(types.nchar),
        isNText = searchInString(types.ntext),
        isNVarchar = searchInString(types.nvarchar),
        isDateTime2 = searchInString(types.datetime2),
        isVarcharMax = searchInString(types.varcharMax),
        isSmallMoney = searchInString(types.smallmoney),
        isNVarcharMax = searchInString(types.nvarcharmax),
        isVarBinaryMax = searchInString(types.varbinarymax),
        isSmallDateTime = searchInString(types.smalldatetime),
        isDateTimeOffset = searchInString(types.datetimeoffset);

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

    if (isVarcharMax)
        return varcharMax[dbName]?.query(str, types.varcharMax);

    if (isNVarchar)
        return varcharMax[dbName]?.query(str, types.nvarchar);

    if (isNVarcharMax)
        return varcharMax[dbName]?.query(str, types.nvarcharmax);

    if (isNchar)
        return varcharMax[dbName]?.query(str, types.nchar);

    if (isNText)
        return ntext[dbName]?.query(str, types.ntext);

    if (isVarBinaryMax)
        return ntext[dbName]?.query(str, types.varbinarymax);

    if (isXml)
        return ntext[dbName]?.query(str, types.xml);

    return str;
}
