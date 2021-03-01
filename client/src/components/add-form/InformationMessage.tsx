import { useContext } from 'react';
import ListContext from '../../contexts/List';
import { BiError } from "react-icons/bi";
import PropTypes from 'prop-types';

export default function InformationMessage(): JSX.Element {
    const { addForm } = useContext(ListContext);
    return (
        <div className="flex items-center justify-center pa2 bg-gold white tc b">
            <BiError className="v-mid" />
            <span className="lh-title ml2 v-mid">{addForm?.informationMessage}</span>
        </div>

    );
}

InformationMessage.contextTypes = {
    addForm: PropTypes.object,
}
