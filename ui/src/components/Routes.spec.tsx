import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes, { ROUTE_PATHS } from './AppRoutes';

// eslint-disable-next-line react/display-name
jest.mock('./Page/HomePage', () => () => <div data-testid="example-page" />);

describe('Routes', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Given root path is provided Then should render example page', () => {
        render(
            <MemoryRouter initialEntries={[ROUTE_PATHS.ROOT]}>
                <AppRoutes />
            </MemoryRouter>
        );

        expect(screen.getByTestId('example-page')).toBeInTheDocument();
    });
});
