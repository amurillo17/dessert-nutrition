/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from 'react';

const selectedRows: string[] = [];

const initialContext = {
    addingItem: false,
    toggleAddingItem: () => { },
    selectedRows: selectedRows,
    updateSelectedRows: (selectedRows: string[]) => { },
    sortBy: 0,
    updateSortBy: (newIndex: number) => { },
    addItemData: [],
    updateAddItemData: (newData: string[]) => { }
};

const AppContext = createContext(initialContext);

export default AppContext;
