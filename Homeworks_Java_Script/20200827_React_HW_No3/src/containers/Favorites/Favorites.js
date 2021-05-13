import React from 'react';
import classes from './Favorites.module.scss'
import Body from "../Body/Body";
import PropTypes from "prop-types";

const Favorites = (props) => {
    const {listOfProducts, modalIsOpen, activeProductID, toggleInFavorites, toggleInCart, toggleModal, modalHeader, modalText} = props
    let productsInFavorites = [...listOfProducts].filter(product => product.addedToFavorites)

    return (
        <div className={classes.favorites}>
            {(!productsInFavorites || productsInFavorites.length === 0) &&
            <h1 className={classes.emptyFavorites}>
                Your Favorites are empty at the moment.
            </h1>}

            <Body
                listOfProducts={productsInFavorites}
                modalIsOpen={modalIsOpen}
                activeProductID = {activeProductID}
                toggleInFavorites = {toggleInFavorites}
                toggleInCart = {toggleInCart}
                toggleModal={toggleModal}
                modalHeader = {modalHeader}
                modalText = {modalText}
            />
        </div>
    )
}

Favorites.propTypes = {
    listOfProducts: PropTypes.array,
    toggleInFavorites: PropTypes.func,
    modalIsOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    toggleInCart: PropTypes.func,
    activeProductID: PropTypes.number,
    modalHeader: PropTypes.string,
    modalText: PropTypes.string
}

export default Favorites