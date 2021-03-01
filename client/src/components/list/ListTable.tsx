import { useContext } from 'react';
import ListContext from './../../contexts/List';
import AppContext from './../../contexts/App';
import { BiSort } from "react-icons/bi";
import { Queries } from './../../services/index';
import PropTypes from 'prop-types';

export default function ListTable(): JSX.Element {
    return (
        <table className="w-100" cellSpacing="0">
            <ListTableHeader />
            <ListTableData />
        </table>
    );
}

function ListTableHeader(): JSX.Element {

    const list = useContext(ListContext);
    const { headers, data } = list.table;
    const { selectedRows, updateSelectedRows, sortBy, updateSortBy } = useContext(AppContext);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const newSelectedRows: string[] = [];
            data.map((item) => {
                newSelectedRows.push(item.id);
            });
            updateSelectedRows(newSelectedRows);
        }
        else {
            updateSelectedRows([]);
        }
    };

    const updateSortIndex = (index: number) => () => {
        updateSortBy(index);
    };

    const headerValues = headers.map((header, index) => {
        return (
            <th key={index} className="fw6 bb b--black-20 tl bg-white tc v-mid">
                <span className="v-mid">{header}</span>
                <BiSort className={`v-mid ml1 cursor-hand mirror ${index === sortBy ? 'blue' : 'gray'}`} onClick={updateSortIndex(index)} />
            </th>
        );
    });

    return (
        <thead>
            <tr className="h3">
                <th className="fw6 bb b--black-20 tl bg-white tc v-mid w4-l w3-m">
                    <input className="cursor-hand" type="checkbox" checked={selectedRows.length > 0 && selectedRows.length === data.length} onChange={handleCheckboxChange} />
                </th>
                {headerValues}
            </tr>
        </thead>
    );
}

export type ListTableData = ListTableRow[];
type ListTableRow = {
    id: string,
    data: Array<string | number>
};

function ListTableData(): JSX.Element {

    const listContext = useContext(ListContext);
    const { selectedRows, updateSelectedRows, sortBy } = useContext(AppContext);
    const tableData: ListTableData = listContext.table.data.sort((a, b) => {
        const first = a.data[sortBy];
        const second = b.data[sortBy];
        if (isNaN(Number(first)) || isNaN(Number(second))) {
            return first > second ? 1 : -1;
        }
        return Number(first) - Number(second);
    });

    const handleCheckboxChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            if (!selectedRows.includes(id)) {
                updateSelectedRows([...selectedRows, id]);
            }
        }
        else {
            const newSelectedRows: string[] = selectedRows.filter((item: string) => {
                return item !== id;
            });
            updateSelectedRows(newSelectedRows);
        }
    };

    const { status } = Queries.fetchData();

    const getRowData = (rowData: Array<string | number>): JSX.Element[] => {
        return rowData.map((data, index) => {
            return (
                <td key={index} className="bb b--black-20 tc">{data}</td>
            )
        });
    };

    const dataRows = tableData.map((row) => {

        const selected = selectedRows.includes(row.id as never);

        return (
            <tr key={row.id} className={`h3 ${selected ? 'bg-dark-green white' : ''}`}>
                <td className="bb b--black-20 tc w4">
                    <input className="cursor-hand" type="checkbox" checked={selected} onChange={handleCheckboxChange(row.id as never)} />
                </td>
                {getRowData(row.data)}
            </tr>
        );
    });

    let content = <tbody className="lh-copy">{dataRows}</tbody>;
    if (status === 'loading') {
        content = <tbody className="lh-copy"><tr><td colSpan={2}>Loading nutrition data...</td></tr></tbody>;
    }
    else if (status === 'error') {
        content = <tbody className="lh-copy"><tr><td colSpan={2}>Error loading nutrition data, please try again...</td></tr></tbody>;
    }

    return (
        content
    );
}

ListTableHeader.contextTypes = {
    list: PropTypes.object,
    headers: PropTypes.array,
    data: PropTypes.array,
    selectedRows: PropTypes.array,
    updateSelectedRows: PropTypes.func,
    sortBy: PropTypes.number,
    updateSortBy: PropTypes.func,
    addText: PropTypes.string,
}
