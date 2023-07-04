import axios from 'axios';
import { addDevice, removeDevice, getAllDevices, updateDevice } from './api';
import DeviceTableRow from '../../interfaces/DeviceTableRow';

describe('api calls', () => {
    afterEach(() => jest.restoreAllMocks());
    beforeEach(() => jest.resetAllMocks());

    it('When updateDevice is called with argument Then should return value', async () => {
        jest.spyOn(axios, 'post').mockResolvedValue({ status: 200, data: {} });

        const expectedBody = {
            device_id: 'something',
            device_make: '',
            device_model: '',
            device_os_version: '',
            release_date: ''
        };
        await updateDevice({ deviceId: expectedBody.device_id, device: expectedBody });

        expect(axios.put).toHaveBeenCalledWith('/api/something', expectedBody);
        expect(axios.put).toHaveBeenCalledTimes(1);
    });
});
