import DeviceRecord from '../../../interfaces/DeviceRecord';
import DeviceTableRow from '../../../interfaces/DeviceTableRow';
import React from 'react';
import DeviceRecordWithId from '../../../interfaces/DeviceRecordWithId';

export const toDeviceRowMap = (data: DeviceRecordWithId[]): Record<string, DeviceTableRow> => {
    const map: Record<string, DeviceTableRow> = {};
    data.forEach((row) => {
        map[row.device_id] = {
            device_id: row?.device_id,
            device_make: row?.device_make,
            device_model: row?.device_model,
            device_os_version: row?.device_os_version,

            release_date: row?.release_date && new Date(row?.release_date)
        } as DeviceTableRow;
    });
    return map;
};

export const toDeviceRecordWithId = (deviceRecord: DeviceRecord, deviceId: string): DeviceRecordWithId => {
    return {
        ...deviceRecord,
        device_id: deviceId
    } as DeviceRecordWithId;
};

export const convertTableRowToRecord = (tableRow: DeviceTableRow): DeviceRecord => {
    const { device_make, device_model, device_os_version, release_date } = tableRow;

    return {
        device_make,
        device_model,
        device_os_version,
        release_date: release_date ? release_date.toISOString() : undefined
    };
};

export const convertRecordWithIdToTableRow = (recordWithId: DeviceRecordWithId): DeviceTableRow => {
    const { device_id, device_make, device_model, device_os_version, release_date } = recordWithId;

    return {
        device_id,
        device_make,
        device_model,
        device_os_version,
        release_date: release_date ? new Date(release_date) : undefined
    };
};

export const removeDeviceById = (
    map: Record<string, DeviceTableRow>,
    deviceId: string
): Record<string, DeviceTableRow> => {
    const updatedMap: Record<string, DeviceTableRow> = { ...map };
    delete updatedMap[deviceId];
    return updatedMap;
};
