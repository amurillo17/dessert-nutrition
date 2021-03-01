/* eslint-disable @typescript-eslint/no-explicit-any */

export interface QueriesInterface {
    fetchData: () => any;
    deleteData: (selectedRows: string[]) => any;
    resetData: () => any;
    addItemData: (data: string[]) => any;
}