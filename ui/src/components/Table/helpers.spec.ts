import {
    toDeviceRowMap,
    toDeviceRecordWithId,
    convertTableRowToRecord,
    convertRecordWithIdToTableRow,
    removeDeviceById
} from './helpers';
import DeviceRecordWithId from '../../../interfaces/DeviceRecordWithId';
import DeviceTableRow from '../../../interfaces/DeviceTableRow';
import DeviceRecord from '../../../interfaces/DeviceRecord';

describe('Table Helpers', () => {
    describe('toDeviceRowMap', () => {
        it('should convert DeviceRecordWithId array to a map of DeviceTableRow', () => {
            const data: DeviceRecordWithId[] = [
                {
                    device_id: '1',
                    device_make: 'Apple',
                    device_model: 'iPhone',
                    device_os_version: 'iOS 14.5',
                    release_date: '2021-01-01'
                },
                {
                    device_id: '2',
                    device_make: 'Samsung',
                    device_model: 'Galaxy S21',
                    device_os_version: 'Android 11',
                    release_date: '2021-02-01'
                }
            ];

            const expectedMap: Record<string, DeviceTableRow> = {
                '1': {
                    device_id: '1',
                    device_make: 'Apple',
                    device_model: 'iPhone',
                    device_os_version: 'iOS 14.5',
                    release_date: new Date('2021-01-01')
                },
                '2': {
                    device_id: '2',
                    device_make: 'Samsung',
                    device_model: 'Galaxy S21',
                    device_os_version: 'Android 11',
                    release_date: new Date('2021-02-01')
                }
            };

            const actualMap = toDeviceRowMap(data);

            expect(actualMap).toEqual(expectedMap);
        });
    });

    describe('toDeviceRecordWithId', () => {
        it('should add device_id to the given DeviceRecord', () => {
            const deviceRecord: DeviceRecord = {
                device_make: 'Apple',
                device_model: 'iPhone',
                device_os_version: 'iOS 14.5'
            };
            const deviceId = '1';

            const expectedDeviceRecordWithId: DeviceRecordWithId = {
                device_id: '1',
                device_make: 'Apple',
                device_model: 'iPhone',
                device_os_version: 'iOS 14.5'
            };

            const actualDeviceRecordWithId = toDeviceRecordWithId(deviceRecord, deviceId);

            expect(actualDeviceRecordWithId).toEqual(expectedDeviceRecordWithId);
        });
    });

    describe('convertTableRowToRecord', () => {
        it('should convert DeviceTableRow to DeviceRecord', () => {
            const tableRow: DeviceTableRow = {
                device_id: '1',
                device_make: 'Apple',
                device_model: 'iPhone',
                device_os_version: 'iOS 14.5',
                release_date: new Date('2021-01-01')
            };

            const expectedDeviceRecord: DeviceRecord = {
                device_make: 'Apple',
                device_model: 'iPhone',
                device_os_version: 'iOS 14.5',
                release_date: '2021-01-01T00:00:00.000Z'
            };

            const actualDeviceRecord = convertTableRowToRecord(tableRow);

            expect(actualDeviceRecord).toEqual(expectedDeviceRecord);
        });
    });

    describe('convertRecordWithIdToTableRow', () => {
        it('should convert DeviceRecordWithId to DeviceTableRow', () => {
            const recordWithId: DeviceRecordWithId = {
                device_id: '1',
                device_make: 'Apple',
                device_model: 'iPhone',
                device_os_version: 'iOS 14.5',
                release_date: '2021-01-01T00:00:00.000Z'
            };

            const expectedTableRow: DeviceTableRow = {
                device_id: '1',
                device_make: 'Apple',
                device_model: 'iPhone',
                device_os_version: 'iOS 14.5',
                release_date: new Date('2021-01-01')
            };

            const actualTableRow = convertRecordWithIdToTableRow(recordWithId);

            expect(actualTableRow).toEqual(expectedTableRow);
        });
    });

    describe('removeDeviceById', () => {
        it('should remove a device from the map by device_id', () => {
            const map: Record<string, DeviceTableRow> = {
                '1': {
                    device_id: '1',
                    device_make: 'Apple',
                    device_model: 'iPhone'
                },
                '2': {
                    device_id: '2',
                    device_make: 'Samsung',
                    device_model: 'Galaxy S21'
                }
            };

            const deviceId = '1';

            const expectedUpdatedMap: Record<string, DeviceTableRow> = {
                '2': {
                    device_id: '2',
                    device_make: 'Samsung',
                    device_model: 'Galaxy S21'
                }
            };

            const actualUpdatedMap = removeDeviceById(map, deviceId);

            expect(actualUpdatedMap).toEqual(expectedUpdatedMap);
        });
    });
});
