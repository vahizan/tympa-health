import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeviceRow from './DeviceRow';
import DeviceTableRow from '../../../interfaces/DeviceTableRow';

describe('DeviceRow', () => {
    const releaseDateMockValue = new Date('2021-01-01');
    const DEVICE_ID = '1';
    const device = {
        device_id: DEVICE_ID,
        device_make: 'Apple',
        device_model: 'iPhone X',
        device_os_version: 'iOS 14',
        release_date: releaseDateMockValue
    } as DeviceTableRow;
    const onUpdateDeviceRecordMock = jest.fn();
    const onDeleteDeviceRecordMock = jest.fn();

    afterEach(() => {
        jest.restoreAllMocks();
    });
    const expectedDate = '2021/01';
    it('renders device data and updates on input change', async () => {
        render(
            <DeviceRow
                deleteDevice={onDeleteDeviceRecordMock}
                deviceId={'1'}
                device={device}
                onUpdateDeviceRecord={onUpdateDeviceRecordMock}
            />
        );

        const inputElements = screen.getAllByRole('textbox');

        const keys = Object.keys(device);

        inputElements.forEach((inputElement, index) => {
            const value = device[keys[index] as keyof DeviceTableRow];
            if (value instanceof Date) {
                expect(inputElement).toHaveValue(expectedDate);
            } else {
                expect(inputElement).toHaveValue(value as string);
            }
            fireEvent.change(inputElement, { target: { value: 'New Value' } });
        });

        expect(onUpdateDeviceRecordMock).not.toHaveBeenCalled();

        inputElements.forEach((inputElement) => {
            fireEvent.blur(inputElement);
        });

        expect(onUpdateDeviceRecordMock).toHaveBeenCalledWith('1', {
            device_make: 'New Value',
            device_model: 'New Value',
            device_os_version: 'New Value',
            release_date: '2021-01-01T00:00:00.000Z'
        });
    });

    it('renders device data and deletes item on button click', async () => {
        render(
            <DeviceRow
                deleteDevice={onDeleteDeviceRecordMock}
                deviceId={DEVICE_ID}
                device={device}
                onUpdateDeviceRecord={onUpdateDeviceRecordMock}
            />
        );

        const deleteButtons = screen.getAllByText('Remove');
        fireEvent.click(deleteButtons[0]);

        expect(onDeleteDeviceRecordMock).toHaveBeenCalledWith('1');
    });
});
