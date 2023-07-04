import { getAllDevices } from '../../services/api';
import useApi from '../useApi';
import { renderHook } from '../../testUtils/test-utils';
import { act } from '@testing-library/react';

jest.mock('../../services/api', () => {
    return {
        ...jest.requireActual('../../services/api'),
        getAllDevices: jest.fn()
    };
});

describe('useApi', () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it('When hook is called Then should call getAllDevices endpoint with all the required params', async () => {
        const setErrorStatusCodeMock = jest.fn();
        (getAllDevices as jest.Mock).mockResolvedValue({ something: 'something' });

        renderHook(
            () =>
                useApi(getAllDevices, [], {
                    id: 1234
                }),
            { wrapperProps: { errorContext: { setErrorStatusCode: setErrorStatusCodeMock, errorStatusCode: 200 } } }
        );

        act(() => {
            expect(getAllDevices as jest.Mock).toHaveBeenCalledWith({
                id: 1234
            });
            expect(setErrorStatusCodeMock).not.toHaveBeenCalled();
        });
    });
});
