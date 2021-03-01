import { createContext } from 'react';
import { ListTableData } from './../components/list/ListTable';

const texts = {
    title: "List",
    resetData: "Reset",
    addText: "Add",
    deleteText: "Delete"
}
const tableHeaders: string[] = [];
const tableData: ListTableData = [];
const addForm:
    {
        propertyNames: string[],
        informationMessage: string,
        submitText: string
    } =
{
    propertyNames: [],
    informationMessage: 'Please fill all details',
    submitText: 'Ok'
};

const initialContext = {
    texts,
    table: {
        headers: tableHeaders,
        data: tableData
    },
    addForm,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setTableData: (newData: ListTableData) => { }
};

const ListContext = createContext(initialContext);

export default ListContext;
