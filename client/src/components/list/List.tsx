import { useContext } from 'react'
import { BiRevision, BiPlusMedical, BiTrash } from "react-icons/bi";
import ListTable from './ListTable';
import ListContext from './../../contexts/List';
import AppContext from './../../contexts/App';
import { Queries } from './../../services/';
import PropTypes from 'prop-types';

export default function List(): JSX.Element {
    return (
        <div className="w-100 mw8 center">
            <ListHeader />
            <ListActions />
            <ListTable />
        </div>
    );
}

function ListHeader(): JSX.Element {
    const { title, resetData: resetDataText } = useContext(ListContext).texts;
    const mutation = Queries.resetData();

    return (
        <div className="overflow-hidden flex items-center">
            <h1 className="dib flex-auto">{title}</h1>
            <button className="dim br2 pv2 white bg-dark-green bn ttu inline-flex outline-0 cursor-hand" onClick={() => mutation.mutate() as never}>
                <BiRevision className="mr1 mirror" />
                <span>{resetDataText}</span>
            </button>
        </div>
    );
}

function ListActions(): JSX.Element {
    const { addText, deleteText } = useContext(ListContext).texts;
    const appContext = useContext(AppContext);
    const { toggleAddingItem } = appContext;
    const selected = appContext.selectedRows.length;

    const mutation = Queries.deleteData(appContext.selectedRows);

    return (
        <div className="overflow-hidden flex items-center bg-washed-red">
            <p className="dib dark-pink b ml3 flex-auto">{selected} selected</p>
            <button className="f6 dim br2 bn ph2 pv2 dib dark-green b ttu bg-white inline-flex mt3 mb3 mr3 outline-0 items-center cursor-hand" onClick={toggleAddingItem}>
                <BiPlusMedical className="mr2 font-half" />
                <span>{addText}</span>
            </button>
            <button className={`f6 br2 bn ph2 pv2 dib dark-red b ttu bg-white inline-flex mt3 mb3 mr3 outline-0 ${selected === 0 ? 'o-30' : 'dim cursor-hand'}`} onClick={() => mutation.mutate(appContext.selectedRows as never)}>
                <BiTrash className="f5 mr1" />
                <span>{deleteText}</span>
            </button>
        </div>
    );
}

ListHeader.contextTypes = {
    title: PropTypes.string,
    resetData: PropTypes.object
}

ListActions.contextTypes = {
    addText: PropTypes.string,
    deleteText: PropTypes.string,
    toggleAddingItem: PropTypes.func,
    selected: PropTypes.array
}