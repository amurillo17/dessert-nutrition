import { useContext } from 'react';
import { useQuery, useMutation } from "react-query";
import { request, gql } from "graphql-request";
import ListContext from './../contexts/List';
import AppContext from './../contexts/App';

import { QueriesInterface } from './QueriesInterface';

const endpoint = '/';

export const GraphQLQueries: QueriesInterface = {

    fetchData: () => {
        const list = useContext(ListContext);
        const { setTableData } = list;
        const { updateSelectedRows } = useContext(AppContext);

        return useQuery("itemsData", async () => {
            const { itemsData } = await request(
                endpoint,
                gql`
                    query {
                        itemsData {
                        id,
                        data
                        }
                    }
                `
            );
            updateSelectedRows([]);
            setTableData(itemsData);
        });
    },

    deleteData: (selectedRows: string[]) => {

        const list = useContext(ListContext);
        const { setTableData } = list;
        const { updateSelectedRows } = useContext(AppContext);

        return useMutation("deleteData", async () => {
            const { deleteData } = await request(
                endpoint,
                gql`
                mutation {
                    deleteData(ids:${JSON.stringify(selectedRows)}) {
                      id, data
                    }
                  }
                `
            );
            updateSelectedRows([]);
            setTableData(deleteData);
        });
    },

    resetData: () => {

        const list = useContext(ListContext);
        const { setTableData } = list;
        const { updateSelectedRows } = useContext(AppContext);

        return useMutation("resetData", async () => {
            const { resetData } = await request(
                endpoint,
                gql`
                    mutation {
                        resetData {
                        id,
                        data
                        }
                    }
                `
            );
            updateSelectedRows([]);
            setTableData(resetData);
        });
    },

    addItemData: (data: string[]) => {

        const list = useContext(ListContext);
        const { setTableData } = list;
        const { updateSelectedRows } = useContext(AppContext);

        return useMutation("addItemData", async () => {
            const { addItemData } = await request(
                endpoint,
                gql`
                mutation {
                    addItemData(data:${JSON.stringify(data)}) {
                      id, data
                    }
                  }
                `
            );
            updateSelectedRows([]);
            setTableData(addItemData);
        });
    },

}
