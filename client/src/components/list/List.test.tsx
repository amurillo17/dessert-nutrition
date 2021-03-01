/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListContext from './../../contexts/List';
import List from './List';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const listContentValue: any = {
    texts: {},
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
                <List />
            </QueryClientProvider>
        </ListContext.Provider>
    );
});

describe('Renders the table', () => {
    test('renders the table element', () => {
        const element = screen.getByRole(/table/i);
        expect(element).toBeInTheDocument();
    });
    test('renders the loading text', () => {
        const element = screen.getByText(/Loading nutrition data/i);
        expect(element).toBeInTheDocument();
    });

});
