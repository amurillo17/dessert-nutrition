import { mockData } from './../mocks/data';
import { useContext } from 'react';
import { useQuery, useMutation } from "react-query";
import ListContext from './../contexts/List';
import AppContext from './../contexts/App';
import { v4 as uuidv4 } from 'uuid';
import { QueriesInterface } from './QueriesInterface';

export const MockedQueries: QueriesInterface = {

    fetchData: () => {
        const list = useContext(ListContext);
        const { setTableData } = list;
        const { updateSelectedRows } = useContext(AppContext);
        return useQuery("itemsData", async () => {
            updateSelectedRows([]);
            setTableData(mockData.initialData);
        });
    },

    deleteData: (selectedRows: string[]) => {
        const list = useContext(ListContext);
        const { setTableData } = list;
        const { updateSelectedRows } = useContext(AppContext);

        let currentData = list.table.data;
        currentData = currentData.filter((item) => {
            return !selectedRows.includes(item.id);
        })

        return useMutation("deleteData", async () => {
            updateSelectedRows([]);
            setTableData(currentData);
        });
    },

    resetData: () => {

        const list = useContext(ListContext);
        const { setTableData } = list;
        const { updateSelectedRows } = useContext(AppContext);

        return useMutation("resetData", async () => {
            updateSelectedRows([]);
            setTableData(mockData.initialData);
        });
    },

    addItemData: (data: string[]) => {

        const list = useContext(ListContext);
        // const { setTableData } = list;
        // const { updateSelectedRows } = useContext(AppContext);
        const currentData = list.table?.data;
        currentData?.push({ id: uuidv4(), data });

        // return useMutation("addItemData", async () => {
        //     updateSelectedRows([]);
        //     setTableData(currentData);
        // });
    },

}
