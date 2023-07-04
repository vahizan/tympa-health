import React, { useState, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';

import DeviceTableRow from '../../../interfaces/DeviceTableRow';

import styles from './table.module.scss';
import DeviceRecordWithId from '../../../interfaces/DeviceRecordWithId';
import DeviceRecord from '../../../interfaces/DeviceRecord';
import { convertTableRowToRecord, toDeviceRecordWithId } from './helpers';

interface TableRowProps {
    deviceId: string;
    device: DeviceTableRow;
    onUpdateDeviceRecord: (deviceId: string, device: DeviceRecord) => void;
    deleteDevice: (deviceId: string) => void;
}

const DeviceRow: React.FC<TableRowProps> = ({ deviceId, device, onUpdateDeviceRecord, deleteDevice }) => {
    const [updatedDevice, setUpdatedDevice] = useState(device);

    const handleDate = (key: string) => (date: Date) => {
        setUpdatedDevice((prevDevice) => ({
            ...prevDevice,
            [key]: date
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedDevice((prevDevice) => ({
            ...prevDevice,
            [name]: value
        }));
    };

    const handleBlur = () => {
        onUpdateDeviceRecord(deviceId, convertTableRowToRecord(updatedDevice));
    };

    const RELEASE_DATE_KEY = 'release_date';

    return (
        <tr className={styles.deviceRow}>
            {Object.keys(updatedDevice).map((key) => {
                const deviceValue = updatedDevice[key as keyof DeviceTableRow];
                return (
                    <>
                        <td className={styles.deviceRow__cell} key={key}>
                            {key === RELEASE_DATE_KEY ? (
                                <DatePicker
                                    name={key}
                                    selected={deviceValue as Date}
                                    dateFormat="yyyy/MM"
                                    onChange={handleDate(key)}
                                    onSelect={handleDate(key)}
                                    onCalendarClose={handleBlur}
                                />
                            ) : (
                                <input
                                    className={styles.deviceRow__cell__textfield}
                                    type="text"
                                    name={key}
                                    value={deviceValue as string}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            )}
                        </td>
                    </>
                );
            })}
            <td className={styles.deviceRow__cell__removeButtonContainer}>
                <button onClick={() => deleteDevice(deviceId)}>Remove</button>
            </td>
        </tr>
    );
};

export default DeviceRow;
