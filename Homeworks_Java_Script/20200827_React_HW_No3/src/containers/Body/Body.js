import React from 'react';
import classes from './Body.module.scss';
import ProductCard from './ProductCard/ProductCard'
import Modal from "../../components/Modal/Modal";
import PropTypes from 'prop-types';


const Body = (props) => {
    const {listOfProducts, modalIsOpen, activeProductID, toggleInFavorites, toggleInCart, toggleModal, crossMarkBtnIsPresent,modalHeader,modalText} = props;

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
                            crossMarkBtnIsPresent={crossMarkBtnIsPresent}
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
                    />
                    : null
                }
            </div>
        )
}

Body.propTypes = {
    listOfProducts: PropTypes.array,
    modalIsOpen: PropTypes.bool,
    activeProductID: PropTypes.number,
    toggleInFavorites: PropTypes.func,
    toggleInCart: PropTypes.func,
    toggleModal: PropTypes.func,
    modalHeader: PropTypes.string,
    modalText: PropTypes.string,
    crossMarkBtnIsPresent: PropTypes.bool,
}

export default Body