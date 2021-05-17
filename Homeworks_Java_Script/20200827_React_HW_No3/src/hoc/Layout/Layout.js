import React, {useState} from 'react';
import classes from './Layout.module.scss';
import Navbar from "../../containers/Navbar/Navbar";
import Body from "../../containers/Body/Body";
import Cart from "../../containers/Cart/Cart";
import Favorites from "../../containers/Favorites/Favorites";
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {modalsText} from "../../components/Modal/ModalsText";

const Layout = (props) => {
    const {listOfProducts, toggleInFavorites,toggleInCart} = props;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeProductID, setActiveProductID] = useState(null);

    const toggleModal = (id) => {
        setModalIsOpen(!modalIsOpen);
        if(id) setActiveProductID(id);
    }

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
        <div className={classes.main}>
            <Navbar/>

            <Switch>
                <Route exact path='/' render={() =>
                    <Body
                        listOfProducts={listOfProducts}
                        modalIsOpen={modalIsOpen}
                        activeProductID = {activeProductID}
                        toggleInFavorites = {toggleInFavorites}
                        toggleInCart = {toggleInCart}
                        toggleModal={toggleModal}
                        modalHeader = {modalHeader}
                        modalText = {modalText}
                    />}/>
                <Route exact path='/cart' render={() =>
                    <Cart
                        listOfProducts={listOfProducts}
                        modalIsOpen={modalIsOpen}
                        activeProductID = {activeProductID}
                        toggleInFavorites = {toggleInFavorites}
                        toggleInCart = {toggleInCart}
                        toggleModal={toggleModal}
                        crossMarkBtnIsPresent={true}
                        modalHeader = {modalHeader}
                        modalText = {modalText}
                    />}/>
                <Route exact path='/favorites' render={() =>
                    <Favorites
                        listOfProducts={listOfProducts}
                        modalIsOpen={modalIsOpen}
                        activeProductID = {activeProductID}
                        toggleInFavorites = {toggleInFavorites}
                        toggleInCart = {toggleInCart}
                        toggleModal={toggleModal}
                        modalHeader = {modalHeader}
                        modalText = {modalText}
                    />}/>
            </Switch>
        </div>
    )
}

Layout.propTypes = {
    listOfProducts: PropTypes.array,
    modalIsOpen: PropTypes.bool,
    activeProductID: PropTypes.number,
    toggleInFavorites: PropTypes.func,
    toggleInCart: PropTypes.func,
    toggleModal: PropTypes.func
}

export default Layout