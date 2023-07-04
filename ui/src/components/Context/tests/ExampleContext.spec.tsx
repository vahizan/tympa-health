import React from 'react';
import { render } from '@testing-library/react';
import { ExampleProvider, useExampleContext } from '../ExampleContext';
import { renderHook } from '../../../testUtils/test-utils';

describe('ValuationProvider', () => {
    it('renders children', () => {
        const { getByText } = render(
            <ExampleProvider>
                <div>Test</div>
            </ExampleProvider>
        );
        expect(getByText('Test')).toBeInTheDocument();
    });

    it('provides default context values', () => {
        renderHook(() => useExampleContext(), { wrapper: ExampleProvider });
    });

    it('updates context values', () => {
        renderHook(() => useExampleContext(), { wrapper: ExampleProvider });
    });
});
