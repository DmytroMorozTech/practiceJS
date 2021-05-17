import React from 'react';
import classes from './Modal.module.scss';
import CrossMarkBtn from "./crossMarkBtn/CrossMarkBtn"
import ModalBg from "./ModalBg/ModalBg";
import ModalButtons from "./ModalButtons/ModalButtons";
import PropTypes from 'prop-types';

const Modal = (props) => {
    const {modalHeader,modalText,toggleModal,toggleInCart,activeProductID} = props

    return (
        <>
            <div className={classes.Modal}>
                <div className={classes.Modal__heading}>
                    <h2>
                        <strong>{modalHeader}</strong>
                    </h2>
                    <CrossMarkBtn onClickHandler={toggleModal} />
                </div>

                <div className={classes.Modal__content}>
                    <p>{modalText}</p>

                    <ModalButtons toggleModal={toggleModal} toggleInCart={toggleInCart} activeProductID={activeProductID} />
                </div>
            </div>

            <ModalBg
                onClickHandler={toggleModal}
            />
        </>
    )
}

Modal.propTypes = {
    modalHeader: PropTypes.string,
    modalText: PropTypes.string,
    toggleModal: PropTypes.func,
    toggleInCart: PropTypes.func,
    activeProductID: PropTypes.number
}

export default Modal