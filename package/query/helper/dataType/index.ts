import {characterVarying} from './characterVarying';
import {networkAddress} from './networkAddress';
import {varbinaryMax} from './varbinaryMax';
import {smallSerial} from './smallSerial';
import {varcharMax} from './varcharMax';
import {textSearch} from './textSearch';
import {lineString} from './lineString';
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
import {Enum} from './enum';
import {JSONFunction} from '../../../typing';


export default function (dbName: string, str: string): string {

    let dataType = str.split(' ')[1].split('(')[0].toLowerCase(),
        mapOfDataTypeInstance: JSONFunction = {
            xml: (): string => xml[dbName]?.query(str, types.xml),
            enum: (): string => Enum[dbName]?.query(str, types.enum),
            uuid: (): string => uuid[dbName]?.query(str, types.uuid),
            json: (): string => json[dbName]?.query(str, types.json),
            money: (): string => money[dbName]?.query(str, types.money),
            ntext: (): string => ntext[dbName]?.query(str, types.nText),
            bytea: (): string => bytea[dbName]?.query(str, types.bytea),
            serial: (): string => serial[dbName]?.query(str, types.serial),
            nchar: (): string => varcharMax[dbName]?.query(str, types.nChar),
            polygon: (): string => polygon[dbName]?.query(str, types.polygon),
            cidr: (): string => networkAddress[dbName]?.query(str, types.cidr),
            inet: (): string => networkAddress[dbName]?.query(str, types.inet),
            tsquery: (): string => textSearch[dbName]?.query(str, types.tsQuery),
            smallmoney: (): string => money[dbName]?.query(str, types.smallMoney),
            tsvector: (): string => textSearch[dbName]?.query(str, types.tsVector),
            nvarchar: (): string => varcharMax[dbName]?.query(str, types.nvarchar),
            datetime2: (): string => dateTime[dbName]?.query(str, types.datetime2),
            bigserial: (): string => bigSerial[dbName]?.query(str, types.bigSerial),
            macaddr: (): string => networkAddress[dbName]?.query(str, types.macaddr),
            linestring: (): string => lineString[dbName]?.query(str, types.linestring),
            varcharmax: (): string => varcharMax[dbName]?.query(str, types.varcharMax),
            macaddr8: (): string => networkAddress[dbName]?.query(str, types.macaddr8),
            nvarcharmax: (): string => varcharMax[dbName]?.query(str, types.nVarcharMax),
            smallserial: (): string => smallSerial[dbName]?.query(str, types.smallSerial),
            smalldatetime: (): string => dateTime[dbName]?.query(str, types.smallDateTime),
            datetimeoffset: (): string => dateTime[dbName]?.query(str, types.dateTimeOffset),
            varbinarymax: (): string => varbinaryMax[dbName]?.query(str, types.varbinaryMax),
            charactervarying: (): string => characterVarying[dbName]?.query(str, types.characterVarying),
        };


    if (typeof mapOfDataTypeInstance[dataType] === 'function')
        return mapOfDataTypeInstance[dataType]();


    return str;
}
