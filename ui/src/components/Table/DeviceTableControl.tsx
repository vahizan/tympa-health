import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './table.module.scss';

interface TableControlProps {
    onChange: Dispatch<SetStateAction<string>>;
    handleSubmit: React.MouseEventHandler;
}

export const DeviceTableControl: FC<TableControlProps> = ({ onChange, handleSubmit }) => {
    const [isAddNewDevice, setAddNewDevice] = useState<boolean>(false);
    const [deviceId, setDeviceId] = useState<string>('');

    const onSubmit = (e: React.MouseEvent) => {
        try {
            handleSubmit(e);
        } finally {
            setAddNewDevice(false);
            setDeviceId('');
        }
    };

    const handleDeviceIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDeviceId(e.target.value);
        onChange(e.target.value);
    };
    return (
        <div className={styles.deviceTableControl}>
            <button className={styles.deviceTableControl__createButton} onClick={() => setAddNewDevice(true)}>
                Create New Device
            </button>
            {isAddNewDevice && (
                <>
                    <input
                        className={styles.deviceTableControl__deviceIdInput}
                        type="text"
                        name="device-id"
                        placeholder="Enter Device Id"
                        value={deviceId}
                        onChange={handleDeviceIdChange}
                    />
                    <button className={styles.deviceTableControl__createButton} onClick={onSubmit}>
                        Create
                    </button>
                </>
            )}
        </div>
    );
};
