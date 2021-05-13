import React, {Component} from 'react';
import classes from './Body.module.scss';
import Loader from "./Loader/Loader";
import ProductCard from './ProductCard/ProductCard'
import Modal from "../../components/Modal/Modal";
import {modalsText} from '../../components/Modal/ModalsText' //ok
import PropTypes from 'prop-types';


class Body extends Component {

    render() {
        const {listOfProducts, modalIsOpen, activeProductID, toggleInFavorites, toggleInCart, toggleModal } = this.props;
        const {addToCart, removeFromCart} = modalsText;

        if (!listOfProducts) {
            return <Loader/>
        }

        let modalHeader, modalText;
        if(activeProductID) {
            const typeOfModal = listOfProducts.filter(product => product.id === activeProductID)

            if(typeOfModal[0].addedToCart) {
                modalHeader = removeFromCart.header
                modalText = removeFromCart.mainText
            } else {
                modalHeader = addToCart.header
                modalText = addToCart.mainText
            }
        }

        return (
            <div className={classes.Body}>
                <section className={classes.productsContainer}>
                    {listOfProducts.map((product) => {
                        return <ProductCard
                            key={product.id}
                            product={product}
                            toggleInFavorites={toggleInFavorites}
                            // эта ф-ция отвечает за смену статуса "звездочки" и соответствующего стейта.
                            toggleModal={toggleModal}
                        />
                    })}
                </section>

                {modalIsOpen ?
                    <Modal
                        modalHeader={modalHeader}
                        modalText={modalText}
                        // текстовые данные для модалки

                        toggleModal={toggleModal}
                        // закрыть модалку (если пользователь нажмет CANCEL)

                        toggleInCart={toggleInCart}
                        // добавить товар в корзину

                        activeProductID={activeProductID}
                        listOfProducts={listOfProducts}
                    />
                    : null
                }
            </div>
        )
    }
}

Body.propTypes = {
    listOfProducts: PropTypes.array,
    toggleInFavorites: PropTypes.func,
    modalIsOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    toggleInCart: PropTypes.func,
    activeProductID: PropTypes.number
}

export default Body;