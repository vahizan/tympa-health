import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DeviceTable from './DeviceTable';
import { removeDevice, updateDevice } from '../../services/api';
import DeviceRecord from '../../../interfaces/DeviceRecord';

jest.mock('../../services/api', () => {
    return {
        updateDevice: jest.fn(),
        removeDevice: jest.fn()
    };
});
jest.mock('../../helpers/helper');

const mockTableData: DeviceRecord[] = [
    {
        device_id: '1',
        device_status_code: 'NEW',
        device_make: 'Brand 1',
        device_model: 'Model 1',
        device_os_version: 'OS 1'
    },
    {
        device_id: '2',
        device_status_code: 'NEW',
        device_make: 'Brand 2',
        device_model: 'Model 2',
        device_os_version: 'OS 2'
    }
];

describe('DeviceTable', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders table headers correctly', () => {
        const { getByText } = render(<DeviceTable tableData={mockTableData} />);

        expect(getByText('Brand')).toBeInTheDocument();
        expect(getByText('Model')).toBeInTheDocument();
        expect(getByText('OS')).toBeInTheDocument();
        expect(getByText('Release Date')).toBeInTheDocument();
    });

    it('renders table rows correctly', () => {
        render(<DeviceTable tableData={mockTableData} />);

        expect(screen.getByText(mockTableData[0].device_make || '')).toBeInTheDocument();
        expect(screen.getByText(mockTableData[0].device_model || '')).toBeInTheDocument();
        expect(screen.getByText(mockTableData[0].device_os_version || '')).toBeInTheDocument();
        expect(screen.getByText(mockTableData[0].release_date || '')).toBeInTheDocument();
    });

    it('calls updateDevice and handleUpdate when a device row is updated', async () => {
        render(<DeviceTable tableData={mockTableData} />);

        const inputElements = screen.getAllByRole('textbox');

        (updateDevice as jest.Mock).mockResolvedValue({});

        fireEvent.change(inputElements[1], { target: { value: 'New Value' } });

        await waitFor(() => {
            expect(updateDevice).toHaveBeenCalledTimes(1);
            expect(updateDevice).toHaveBeenCalledWith({ deviceId: '1', device: mockTableData[0] });
        });
    });

    it('calls removeDevice and handleRemove when a device row is removed', () => {
        render(<DeviceTable tableData={mockTableData} />);
        const removeButtons = screen.getAllByText('Remove');

        fireEvent.click(removeButtons[0]);

        expect(removeDevice).toHaveBeenCalledTimes(1);
        expect(removeDevice).toHaveBeenCalledWith('1');
    });
});
