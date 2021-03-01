/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListContext from './../../contexts/List';
import InformationMessage from './../../components/add-form/InformationMessage';

const listContentValue: any = { addForm: { informationMessage: 'my test message' } };

beforeEach(() => {
    render(
        <ListContext.Provider value={listContentValue}>
            <InformationMessage />
        </ListContext.Provider>
    );
});

describe('Renders the message', () => {
    test('renders the set text from context', () => {
        const element = screen.getByText('my test message');
        expect(element).toBeInTheDocument();
    });
});
