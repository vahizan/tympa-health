import React, { useState, ChangeEvent } from 'react';
import DeviceTableRow from '../../../interfaces/DeviceTableRow';

import styles from './table.module.scss';

interface TableRowProps {
    deviceId: string;
    device: DeviceTableRow;
    onUpdateDeviceRecord: (deviceId: string, device: DeviceTableRow) => void;
}

const DeviceRow: React.FC<TableRowProps> = ({ deviceId, device, onUpdateDeviceRecord }) => {
    const [updatedDevice, setUpdatedDevice] = useState(device);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedDevice((prevDevice) => ({
            ...prevDevice,
            [name]: value
        }));
    };

    const handleBlur = () => {
        onUpdateDeviceRecord(deviceId, updatedDevice);
    };

    return (
        <div className={styles.deviceRow}>
            {Object.keys(updatedDevice).map((key) => (
                <>
                    <div className={styles.deviceRow__cell} key={key}>
                        <input
                            className={styles.deviceRow__cell__textfield}
                            type="text"
                            name={key}
                            value={updatedDevice[key as keyof DeviceTableRow]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                </>
            ))}
        </div>
    );
};

export default DeviceRow;
