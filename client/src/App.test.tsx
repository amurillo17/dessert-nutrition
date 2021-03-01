/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
  render(<App />);
});

describe('Renders the nutrition table elements', () => {

  test('renders the page title', () => {
    const titleElement = screen.getByText(/Nutrition List/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the reset data button', () => {
    const buttonElement = screen.getByText(/Reset Data/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the selected text with 0 value', () => {
    const selectedElement = screen.getByText(/0 selected/i);
    expect(selectedElement).toBeInTheDocument();
  });

  test('renders the add new button', () => {
    const buttonElement = screen.getByText(/Add New/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the delete button', () => {
    const buttonElement = screen.getByText(/Delete/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the table', () => {
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('renders new state data', () => {
    const testElement = screen.getByText(/Marshmallow/i);
    expect(testElement).toBeInTheDocument();
  });

  test('click on add new item', async () => {
    const addNewBtn: any = screen.getByText(/Add New/i).closest("button");
    fireEvent.click(addNewBtn);
  });

});
