import React, {Component} from 'react';
import Button from "../../Button/Button";
import PropTypes from 'prop-types';

class ModalButtons extends Component {

    render() {

        const {toggleModal, toggleInCart, activeProductID} = this.props

        return (
            <div>
                <Button
                    onClickHandler={
                        () => {
                        toggleInCart(activeProductID)
                        toggleModal()
                        }
                    }>Ok
                </Button>

                <Button
                    onClickHandler={() => toggleModal()}>Cancel
                </Button>
            </div>
        );
    }
}

ModalButtons.propTypes = {
    toggleModal: PropTypes.func,
    toggleInCart: PropTypes.func,
    activeProductID: PropTypes.number
}

export default ModalButtons;