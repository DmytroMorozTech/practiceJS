import React from 'react';
import classes from './Modal.module.scss';
import CrossMarkBtn from "./crossMarkBtn/CrossMarkBtn"
import ModalBg from "./ModalBg/ModalBg";
import ModalButtons from "./ModalButtons/ModalButtons";
import {connect} from "react-redux";
import { toggleInCartAction as toggleInCartActionCreator} from "../../store/products/productActions";
import {modalsText} from "./ModalsText";
import * as actions from "../../store/modal/modalAction";

const Modal = (props) => {
    const {activeProductID, toggleModalAction,toggleInCartAction} = props;

    const {addToCart, removeFromCart} = modalsText;
    let modalHeader, modalText;
    if(activeProductID) {
        if (JSON.parse(localStorage.getItem("prodsInCartStorage"))
            && JSON.parse(localStorage.getItem("prodsInCartStorage")).includes(activeProductID)) {
            modalHeader = removeFromCart.header
            modalText = removeFromCart.mainText
        } else {
            modalHeader = addToCart.header
            modalText = addToCart.mainText
        }
    }

    return (
        <>
            <div className={classes.Modal}>
                <div className={classes.Modal__heading}>
                    <h2>
                        <strong data-test="modal-header">{modalHeader}</strong>
                    </h2>
                    <CrossMarkBtn data-test="cross-mark-btn" onClickHandler={()=> toggleModalAction()} />
                </div>

                <div className={classes.Modal__content}>
                    <p data-test="modal-text">{modalText}</p>

                    <ModalButtons
                        data-test="modal-buttons"
                        toggleModal={()=> toggleModalAction()}
                        toggleInCart={() => toggleInCartAction(activeProductID) }
                    />
                </div>
            </div>

            <ModalBg
                data-test="modal-bg"
                onClickHandler={()=> toggleModalAction()}
            />
        </>
    )
}

const mapStateToProps = state => {
    return {
        activeProductID: state.modalStatus.activeProductID,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleModalAction: (id)=> dispatch(actions.toggleModalAction(id)),
        toggleInCartAction: (id)=> dispatch(toggleInCartActionCreator(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);