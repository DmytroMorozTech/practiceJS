import React from 'react';
import classes from './Modal.module.scss';
import CrossMarkBtn from "./crossMarkBtn/CrossMarkBtn"
import ModalBg from "./ModalBg/ModalBg";
import ModalButtons from "./ModalButtons/ModalButtons";
import {useDispatch, useSelector} from "react-redux";
import {getActiveProductID} from "../../store/products/productSelectors";
import {toggleInCartAction} from "../../store/products/productActions";
import {toggleModalAction} from "../../store/modal/modalAction"
import {modalsText} from "./ModalsText";

const Modal = () => {
    const dispatch = useDispatch();
    const activeProductID = useSelector(getActiveProductID)

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
                        <strong>{modalHeader}</strong>
                    </h2>
                    <CrossMarkBtn onClickHandler={()=> dispatch(toggleModalAction())} />
                </div>

                <div className={classes.Modal__content}>
                    <p>{modalText}</p>

                    <ModalButtons
                        toggleModal={()=> dispatch(toggleModalAction())}
                        toggleInCart={() => dispatch(toggleInCartAction(activeProductID)) }
                    />
                </div>
            </div>

            <ModalBg
                onClickHandler={()=> dispatch(toggleModalAction())}
            />
        </>
    )
}

export default Modal