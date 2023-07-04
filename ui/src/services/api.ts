import axios from 'axios';
import DeviceRecord from '../../interfaces/DeviceRecord';
import DeviceRecordWithId from '../../interfaces/DeviceRecordWithId';

const API_URL = 'http://localhost:6868'; //process.env.REACT_APP_API_URL

export const updateDevice = async (body: { deviceId: string; device: DeviceRecord }): Promise<void> => {
    const url = `${API_URL}/devices/${body.deviceId}`;
    const { data } = await axios.put(url, body.device);
    return data;
};

export const removeDevice = async (deviceId: string): Promise<void> => {
    const url = `${API_URL}/devices/${deviceId}`;
    const { data } = await axios.delete(url);
    return data;
};

export const getAllDevices = async (): Promise<DeviceRecordWithId[]> => {
    const url = `${API_URL}/devices/all`;
    const { data } = await axios.get(url);
    return data;
};

export const addDevice = async (body: DeviceRecordWithId): Promise<void> => {
    const url = `${API_URL}/devices/add`;
    const { data } = await axios.post(url, body);
    return data;
};
