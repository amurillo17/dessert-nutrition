/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListContext from './../../contexts/List';
import AddForm from './../../components/add-form/AddForm';
import AppContext from './../../contexts/App';

const initialAppContext: any = jest.fn();
const initialListContext: any = jest.fn();

beforeEach(() => {
    render(
        <AppContext.Provider value={initialAppContext}>
            <div className="pa4">
                <ListContext.Provider value={initialListContext}>
                    <AddForm />
                </ListContext.Provider>
            </div>
        </AppContext.Provider>
    );
});

describe('Renders the add form elements', () => {
    test('renders the article container', () => {
        const element = screen.getByRole('article');
        expect(element).toBeInTheDocument();
    });
});
