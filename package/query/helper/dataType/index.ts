import {characterVarying} from './characterVarying';
import {networkAddress} from './networkAddress';
import {varbinaryMax} from './varbinaryMax';
import {smallSerial} from './smallSerial';
import {varcharMax} from './varcharMax';
import {textSearch} from './textSearch';
import types from '../../../sql/Types';
import {bigSerial} from './bigSerial';
import {dateTime} from './dateTime';
import {polygon} from './polygon';
import {serial} from './serial';
import {money} from './money';
import {ntext} from './ntext';
import {bytea} from './bytea';
import {json} from './json';
import {uuid} from './uuid';
import {xml} from './xml';


export default function (dbName: string, str: string): string {

    let searchInString = (data: string): boolean => str.search(data) !== -1,
        isXml = searchInString(types.xml),
        isUuid = searchInString(types.uuid),
        isJson = searchInString(types.json),
        isInet = searchInString(types.inet),
        isCidr = searchInString(types.cidr),
        isBytea = searchInString(types.bytea),
        isMoney = searchInString(types.money),
        isNchar = searchInString(types.nchar),
        isNText = searchInString(types.ntext),
        isSerial = searchInString(types.serial),
        isMacaddr = searchInString(types.macaddr),
        isTsquery = searchInString(types.tsquery),
        isPolygon = searchInString(types.polygon),
        isTsvector = searchInString(types.tsvector),
        isMacaddr8 = searchInString(types.macaddr8),
        isNVarchar = searchInString(types.nvarchar),
        isBigSerial = searchInString(types.bigserial),
        isDateTime2 = searchInString(types.datetime2),
        isVarcharMax = searchInString(types.varcharMax),
        isSmallMoney = searchInString(types.smallmoney),
        isSmallSerial = searchInString(types.smallserial),
        isNVarcharMax = searchInString(types.nvarcharmax),
        isVarBinaryMax = searchInString(types.varbinarymax),
        isSmallDateTime = searchInString(types.smalldatetime),
        isDateTimeOffset = searchInString(types.datetimeoffset),
        isCharacterVarying = searchInString(types.characterVarying);

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
        return varbinaryMax[dbName]?.query(str, types.varbinarymax);

    if (isXml)
        return xml[dbName]?.query(str, types.xml);

    if (isSmallSerial)
        return smallSerial[dbName]?.query(str, types.smallserial);

    if (isSerial)
        return serial[dbName]?.query(str, types.serial);

    if (isBigSerial)
        return bigSerial[dbName]?.query(str, types.bigserial);

    if (isCharacterVarying)
        return characterVarying[dbName]?.query(str, types.characterVarying);

    if (isBytea)
        return bytea[dbName]?.query(str, types.bytea);

    if (isCidr)
        return networkAddress[dbName]?.query(str, types.cidr);

    if (isInet)
        return networkAddress[dbName]?.query(str, types.inet);

    if (isMacaddr)
        return networkAddress[dbName]?.query(str, types.macaddr);

    if (isMacaddr8)
        return networkAddress[dbName]?.query(str, types.macaddr8);

    if (isTsvector)
        return textSearch[dbName]?.query(str, types.tsvector);

    if (isTsquery)
        return textSearch[dbName]?.query(str, types.tsquery);

    if (isJson)
        return json[dbName]?.query(str, types.json);

    if (isUuid)
        return uuid[dbName]?.query(str, types.uuid);

    if (isPolygon)
        return polygon[dbName]?.query(str, types.polygon);
    

    return str;
}
