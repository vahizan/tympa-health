import { deleteObjectFromMap } from './helper';
import DeviceTableRow from '../../interfaces/DeviceTableRow';

describe('deleteObjectFromMap', () => {
    const mockReleaseDate = new Date('2022-01-01');
    const devicesMap: Record<string, DeviceTableRow> = {
        deviceId1: {
            device_id: '1',
            device_make: 'Make 1',
            device_model: 'Model 1',
            device_os_version: 'OS Version 1',
            release_date: mockReleaseDate
        },
        deviceId2: {
            device_id: '1',
            device_make: 'Make 2',
            device_model: 'Model 2',
            device_os_version: 'OS Version 2',
            release_date: mockReleaseDate
        }
    };

    it('should delete the object from the map if the id exists', () => {
        const updatedMap = deleteObjectFromMap(devicesMap, 'deviceId2');

        expect(updatedMap).toEqual({
            deviceId1: {
                device_id: '1',
                device_make: 'Make 1',
                device_model: 'Model 1',
                device_os_version: 'OS Version 1',
                release_date: mockReleaseDate
            }
        });
    });

    it('should return the original map if the id does not exist', () => {
        const updatedMap = deleteObjectFromMap(devicesMap, 'deviceId3');

        expect(updatedMap).toEqual(devicesMap);
    });

    it('should not modify the original map', () => {
        const originalMap = { ...devicesMap };
        deleteObjectFromMap(devicesMap, 'deviceId2');

        expect(devicesMap).toEqual(originalMap);
    });

    it('should handle an empty map', () => {
        const emptyMap: Record<string, DeviceTableRow> = {};
        const updatedMap = deleteObjectFromMap(emptyMap, 'deviceId');

        expect(updatedMap).toEqual({});
    });
});
