import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DeviceTable from './DeviceTable';
import { updateDevice, addDevice, removeDevice } from '../../services/api';

jest.mock('../../services/api', () => {
    return {
        updateDevice: jest.fn(),
        removeDevice: jest.fn(),
        addDevice: jest.fn()
    };
});

describe('DeviceTable', () => {
    const mockTableData = [
        {
            device_id: '1',
            device_make: 'Brand 1',
            device_model: 'Model 1',
            device_os_version: 'OS 1',
            release_date: '2022-01-01'
        },
        {
            device_id: '2',
            device_make: 'Brand 2',
            device_model: 'Model 2',
            device_os_version: 'OS 2',
            release_date: '2022-02-01'
        }
    ];

    it('renders the table headers correctly', () => {
        render(<DeviceTable tableData={[]} />);
        const headers = screen.getAllByRole('columnheader');
        expect(headers).toHaveLength(6);
        expect(headers[0]).toHaveTextContent('Id');
        expect(headers[1]).toHaveTextContent('Brand');
        expect(headers[2]).toHaveTextContent('Model');
        expect(headers[3]).toHaveTextContent('OS');
        expect(headers[4]).toHaveTextContent('Release Date');
        expect(headers[5]).toHaveTextContent('Delete Device');
    });

    it('renders the table rows correctly', () => {
        render(<DeviceTable tableData={mockTableData} />);
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(3);
    });

    it('allows adding a new device', async () => {
        (addDevice as jest.Mock).mockResolvedValue('success');

        render(<DeviceTable tableData={mockTableData} />);
        const addNewDeviceButton = screen.getByText('Create New Device');
        fireEvent.click(addNewDeviceButton);

        const deviceIdInput = screen.getByPlaceholderText('Enter Device Id');
        const createButton = screen.getByText('Create');

        fireEvent.change(deviceIdInput, { target: { value: '3_new_device_id' } });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(deviceIdInput).toHaveValue('3_new_device_id');
            const newDeviceRow = screen.getByDisplayValue('3_new_device_id');
            expect(newDeviceRow).toBeInTheDocument();
            expect(addDevice).toHaveBeenCalledWith({ device_id: '3_new_device_id' });
        });
    });

    it('allows deleting a device', () => {
        (removeDevice as jest.Mock).mockResolvedValue('success');
        render(<DeviceTable tableData={mockTableData} />);
        const deleteDeviceButton = screen.getAllByText('Remove')[0];
        fireEvent.click(deleteDeviceButton);

        const deletedDeviceRow = screen.queryByText('1');
        expect(deletedDeviceRow).not.toBeInTheDocument();
    });

    it('calls the API to update a device record', async () => {
        (updateDevice as jest.Mock).mockResolvedValue('success');
        render(<DeviceTable tableData={mockTableData} />);
        const inputElements = screen.getAllByRole('textbox');

        fireEvent.change(inputElements[1], { target: { value: 'SOMETHING' } });
        fireEvent.blur(inputElements[1]);

        await expect(updateDevice).toHaveBeenCalledWith({
            device: {
                device_make: 'SOMETHING',
                device_model: 'Model 1',
                device_os_version: 'OS 1',
                release_date: '2022-01-01T00:00:00.000Z'
            },
            deviceId: '1'
        });
    });

    it('calls the API to remove a device record', () => {
        (removeDevice as jest.Mock).mockResolvedValue('success');

        render(<DeviceTable tableData={mockTableData} />);
        const deleteDeviceButton = screen.getAllByText('Remove')[0];
        fireEvent.click(deleteDeviceButton);

        expect(removeDevice).toHaveBeenCalledWith('1');
    });
});
