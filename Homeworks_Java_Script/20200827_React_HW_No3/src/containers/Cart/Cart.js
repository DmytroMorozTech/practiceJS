import React from 'react';
import classes from './Cart.module.scss'
import Body from "../Body/Body";
import PropTypes from "prop-types";

const Cart = (props) => {
    const {listOfProducts, modalIsOpen, activeProductID, toggleInFavorites, toggleInCart, toggleModal, crossMarkBtnIsPresent,modalHeader,modalText} = props;

    let productsInCart = [...listOfProducts].filter(product => product.addedToCart)

    return (
        <div className={classes.cart}>
            {(!productsInCart || productsInCart.length === 0) &&
            <h1 className={classes.emptyCart}>
                Your shopping cart is empty at the moment.
            </h1>}

            <Body
                listOfProducts={productsInCart}
                modalIsOpen={modalIsOpen}
                activeProductID = {activeProductID}
                toggleInFavorites = {toggleInFavorites}
                toggleInCart = {toggleInCart}
                toggleModal={toggleModal}
                crossMarkBtnIsPresent={crossMarkBtnIsPresent}
                modalHeader = {modalHeader}
                modalText = {modalText}
            />
        </div>
    )
}

Cart.propTypes = {
    listOfProducts: PropTypes.array,
    toggleInFavorites: PropTypes.func,
    modalIsOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    toggleInCart: PropTypes.func,
    activeProductID: PropTypes.number,
    crossMarkBtnIsPresent: PropTypes.bool,
    modalHeader: PropTypes.string,
    modalText: PropTypes.string
}

export default Cart