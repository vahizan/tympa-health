import DeviceRecord from './DeviceRecord';

interface DeviceRecordWithId extends DeviceRecord {
    device_id: string;
}

export default DeviceRecordWithId;
