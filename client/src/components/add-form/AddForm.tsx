import { useContext } from 'react'
import ListContext from '../../contexts/List';
import AppContext from '../../contexts/App';
import InformationMessage from './InformationMessage';
import { BiX } from "react-icons/bi";
import { Queries } from './../../services/';
import PropTypes from 'prop-types';

export default function AddForm(): JSX.Element {

    const { toggleAddingItem } = useContext(AppContext);

    return (
        <div className="w-100 max-width-40rem center bg-white relative">
            <article className="pa4">
                <InformationMessage />
                <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                    <PropertyFields />
                    <div className="mt3">
                        <SubmitButton />
                    </div>
                </form>
            </article>
            <span className="f3 gray cursor-hand dim absolute top-0 right-0 ma1" onClick={toggleAddingItem}><BiX /></span>
        </div>
    );
}

function SubmitButton(): JSX.Element {
    const { addForm, table } = useContext(ListContext);
    const { addItemData, toggleAddingItem, updateAddItemData } = useContext(AppContext);

    const mutation = Queries.addItemData(addItemData);
    const addNewData = (e: never) => {
        (e as Event).preventDefault();
        if (addItemData.length === table.headers.length && addItemData.every(text => (text as string).trim().length > 0)) {
            mutation.mutate(addItemData as never);
            toggleAddingItem();
            const clearedData = addItemData.map(() => '');
            updateAddItemData(clearedData);
        }
    }

    return (
        <button className="dim br2 pv2 white bg-dark-green bn ttu outline-0 cursor-hand w-100 tc dib b" onClick={addNewData}>
            <span className="mr2 v-mid f5">&#x2714;</span>
            <span className="v-mid">{addForm?.submitText}</span>
        </button>
    );
}

function PropertyFields(): JSX.Element {
    const listContext = useContext(ListContext);
    const { propertyNames } = listContext.addForm || [];
    const appContext = useContext(AppContext);
    const { addItemData, updateAddItemData } = appContext;

    const updateText = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        addItemData[index] = e.target.value as never;
        updateAddItemData(addItemData);
    };

    const inputs = propertyNames?.map((property, index) => {
        return (
            <div key={index} className="mt3">
                <label className="db lh-copy f5 b">{property}</label>
                <input className="pa2 input-reset ba bg-transparent w-100" type="text" required defaultValue={addItemData[index]} onChange={updateText(index)} />
            </div>
        );
    });

    return (
        <fieldset className="ba b--transparent ph0 mh0">
            {inputs}
        </fieldset>
    );
}

AddForm.contextTypes = {
    toggleAddingItem: PropTypes.func
};

SubmitButton.contexTypes = {
    addForm: PropTypes.func,
    table: PropTypes.object,
    addItemData: PropTypes.object,
    toggleAddingItem: PropTypes.func,
    updateAddItemData: PropTypes.func
}

PropertyFields.contextTypes = {
    propertyNames: PropTypes.array,
    addForm: PropTypes.object,
    addItemData: PropTypes.object,
    updateAddItemData: PropTypes.func
}
