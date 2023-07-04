import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeviceRow from './DeviceRow';
import DeviceTableRow from '../../../interfaces/DeviceTableRow';

const device = {
    device_make: 'Apple',
    device_model: 'iPhone X',
    device_os_version: 'iOS 14',
    release_date: '2021-01-01'
};

describe('DeviceRow', () => {
    const onUpdateDeviceRecordMock = jest.fn();

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders device data and updates on input change', async () => {
        render(<DeviceRow deviceId={'1'} device={device} onUpdateDeviceRecord={onUpdateDeviceRecordMock} />);

        const inputElements = screen.getAllByRole('textbox');

        const keys = Object.keys(device);

        inputElements.forEach((inputElement, index) => {
            expect(inputElement).toHaveValue(device[keys[index] as keyof DeviceTableRow]);
            fireEvent.change(inputElement, { target: { value: 'New Value' } });
        });

        expect(onUpdateDeviceRecordMock).not.toHaveBeenCalled();

        inputElements.forEach((inputElement) => {
            fireEvent.blur(inputElement);
        });

        expect(onUpdateDeviceRecordMock).toHaveBeenCalledTimes(inputElements.length);
        expect(onUpdateDeviceRecordMock).toHaveBeenCalledWith('1', {
            device_make: 'New Value',
            device_model: 'New Value',
            device_os_version: 'New Value',
            release_date: 'New Value'
        });
    });
});
