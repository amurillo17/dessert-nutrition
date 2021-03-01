/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListContext from './../../contexts/List';
import ListTable from './ListTable';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const listContentValue: any = {
    table:
    {
        headers: ['1', '2', '3'],
        data: [{ id: 1, data: ['one', 'two', 'three'] }, { id: 2, data: ['four', 'five', 'six'] }]
    }
};

beforeEach(() => {
    render(
        <ListContext.Provider value={listContentValue}>
            <QueryClientProvider client={queryClient}>
                <ListTable />
            </QueryClientProvider>
        </ListContext.Provider>
    );
});

describe('Renders the table', () => {
    test('renders the table element', () => {
        const element = screen.getByRole('table');
        expect(element).toBeInTheDocument();
    });
});
