import React, { FC, useState } from 'react';
import DeviceRecord from '../../../interfaces/DeviceRecord';
import DeviceTableRow from '../../../interfaces/DeviceTableRow';

import styles from './table.module.scss';
import DeviceRow from './DeviceRow';
import { removeDevice, updateDevice } from '../../services/api';
import { deleteObjectFromMap } from '../../helpers/helper';

const TableHeaders = {
    device_make: 'Brand',
    device_model: 'Model',
    device_os_version: 'OS',
    release_date: 'Release Date'
};

interface TableProps {
    tableData: DeviceRecord[];
}
const toDeviceRowMap = (data: DeviceRecord[]): Record<string, DeviceTableRow> => {
    const map: Record<string, DeviceTableRow> = {};
    data.forEach((row) => {
        map[row.device_id] = {
            device_make: row?.device_make,
            device_model: row?.device_model,
            device_os_version: row?.device_os_version,
            release_date: row?.device_os_version
        };
    });
    return map;
};

const generateCells = (
    dataMap: Record<string, DeviceTableRow>,
    setValue: (deviceId: string, device: DeviceTableRow) => void,
    handleRemove: (deviceId: string) => void
) => {
    const keys = Object.keys(dataMap);
    return keys.map((deviceId, index) => (
        <div key={`deviceRow-${index}`} className={styles.deviceRowContainer}>
            <DeviceRow
                key={`${deviceId}-${index}`}
                deviceId={deviceId}
                device={dataMap[deviceId]}
                onUpdateDeviceRecord={setValue}
            />
            <button onClick={() => handleRemove(deviceId)}>Remove</button>
        </div>
    ));
};

const DeviceTable: FC<TableProps> = ({ tableData }) => {
    const [data, setData] = useState<Record<string, DeviceTableRow>>(toDeviceRowMap(tableData));

    const handleUpdate = (deviceId: string, device: DeviceTableRow) => {
        const newData = { ...data };
        newData[deviceId] = device;
        setData(newData);
    };

    const handleRemove = (deviceId: string) => {
        const newData = deleteObjectFromMap(data, deviceId);
        setData(newData);
    };

    const updateDeviceRow = (deviceId: string, device: DeviceTableRow) => {
        updateDevice({ deviceId, device })
            .then(() => handleUpdate(deviceId, device))
            .catch((err) => console.log(err.message));
    };

    const removeDeviceRow = (deviceId: string) => {
        removeDevice(deviceId)
            .then(() => handleRemove(deviceId))
            .catch((err) => console.log(err.message));
    };

    const headerValues = Object.values(TableHeaders);
    return (
        <div>
            <div className={styles.headerRow}>
                <div className={styles.headerRow__headerCell}>
                    {headerValues.map((value, index) => (
                        <div key={`${value}-${index}`}>{value}</div>
                    ))}
                </div>
            </div>
            <div className={styles.tableBody}>{generateCells(data, updateDeviceRow, removeDeviceRow)}</div>
        </div>
    );
};

export default DeviceTable;
