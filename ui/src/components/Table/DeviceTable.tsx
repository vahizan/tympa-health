import React, { FC, useState } from 'react';
import DeviceTableRow from '../../../interfaces/DeviceTableRow';
import styles from './table.module.scss';
import { addDevice, removeDevice, updateDevice } from '../../services/api';
import { convertRecordWithIdToTableRow, removeDeviceById, toDeviceRecordWithId, toDeviceRowMap } from './helpers';
import DeviceRow from './DeviceRow';
import DeviceRecordWithId from '../../../interfaces/DeviceRecordWithId';
import DeviceRecord from '../../../interfaces/DeviceRecord';
import { DeviceTableControl } from './DeviceTableControl';

const TableHeaders = {
    device_id: 'Id',
    device_make: 'Brand',
    device_model: 'Model',
    device_os_version: 'OS',
    release_date: 'Release Date'
};

interface TableProps {
    tableData: DeviceRecordWithId[];
}

const generateCells = (
    dataMap: Record<string, DeviceTableRow>,
    setValue: (deviceId: string, device: DeviceRecord) => void,
    handleRemove: (deviceId: string) => void
) => {
    return Object.entries(dataMap).map(([deviceId, device], index) => (
        <DeviceRow
            key={`${deviceId}-${index}`}
            deviceId={deviceId}
            device={device}
            onUpdateDeviceRecord={setValue}
            deleteDevice={handleRemove}
        />
    ));
};

const DeviceTable: FC<TableProps> = ({ tableData }) => {
    const [deviceId, setDeviceId] = useState<string>('');
    const [data, setData] = useState<Record<string, DeviceTableRow>>(toDeviceRowMap(tableData));

    const handleUpdate = (deviceId: string, device: DeviceTableRow) => {
        setData((prevData) => ({
            ...prevData,
            [deviceId]: device
        }));
    };

    const handleRemove = (deviceId: string) => {
        setData(removeDeviceById(data, deviceId));
    };

    const updateDeviceById = (deviceId: string, device: DeviceRecord) => {
        updateDevice({ deviceId, device })
            .then(() => handleUpdate(deviceId, toDeviceRecordWithId(device, deviceId) as DeviceTableRow))
            .catch((err) => console.log(err.message));
    };

    const removeDeviceRow = (deviceId: string) => {
        removeDevice(deviceId)
            .then(() => handleRemove(deviceId))
            .catch((err) => console.log(err.message));
    };

    const handleNewDeviceSubmit = () => {
        addDevice({ device_id: deviceId })
            .then(() => {
                setData((prevData) => ({
                    ...prevData,
                    [deviceId]: convertRecordWithIdToTableRow({ device_id: deviceId })
                }));
            })
            .catch((err) => console.log(err.message));
    };

    const headerValues = Object.values(TableHeaders);
    return (
        <>
            <DeviceTableControl onChange={setDeviceId} handleSubmit={handleNewDeviceSubmit} />
            <table className={styles.table}>
                <thead className={styles.table__header}>
                    <tr className={styles.table__headerRow}>
                        {headerValues.map((value, index) => (
                            <th className={styles.table__headerRow__headerCell} key={`${value}-${index}`}>
                                {value}
                            </th>
                        ))}
                        <th className={styles.table__headerRow__headerCell}>Delete Device</th>
                    </tr>
                </thead>
                <tbody>{generateCells(data, updateDeviceById, removeDeviceRow)}</tbody>
            </table>
        </>
    );
};

export default DeviceTable;
