import axios from 'axios';
import DeviceTableRow from '../../interfaces/DeviceTableRow';

const API_URL = 'http://localhost:6868'; //process.env.REACT_APP_API_URL

export const updateDevice = async (body: { deviceId: string; device: DeviceTableRow }): Promise<void> => {
    const url = `${API_URL}/devices/${body.deviceId}`;
    const { data } = await axios.put(url, body.device);
    return data;
};

export const removeDevice = async (deviceId: string): Promise<void> => {
    const url = `${API_URL}/devices/${deviceId}`;
    const { data } = await axios.delete(url);
    return data;
};

export const getAllDevices = async (): Promise<void> => {
    const url = `${API_URL}/devices/all`;
    const { data } = await axios.get(url);
    return data;
};

export const addDevice = async (body: DeviceTableRow): Promise<void> => {
    const url = `${API_URL}/devices/add`;
    const { data } = await axios.post(url, body);
    return data;
};
