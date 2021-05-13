import React from 'react';
import classes from './Body.module.scss';
import ProductCard from './ProductCard/ProductCard'
import Modal from "../../components/Modal/Modal";
import PropTypes from 'prop-types';

import {getProductsSelector,modalIsOpenSelector, checkoutModalIsOpenSelector} from "../../store/products/productSelectors"
import {useSelector} from "react-redux";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";

const Body = (props) => {
    const {listOfProducts, crossMarkBtnIsPresent} = props;

    const fullListOfProducts = useSelector(getProductsSelector);
    const modalIsOpen = useSelector(modalIsOpenSelector)
    const checkoutModalIsOpen = useSelector(checkoutModalIsOpenSelector)
    const finalListOfProducts = listOfProducts ? listOfProducts : fullListOfProducts;

        return (
            <div className={classes.Body}>
                <section className={classes.productsContainer}>
                    {finalListOfProducts.map((product) => {
                        return <ProductCard
                            key={product.id}
                            product={product}
                            crossMarkBtnIsPresent = {crossMarkBtnIsPresent}
                        />
                    })}
                </section>

                {modalIsOpen ?
                    <Modal/>
                    : null
                }
                {checkoutModalIsOpen ?
                    <CheckoutModal/>
                    : null
                }
            </div>
        )
}

Body.propTypes = {
    listOfProducts: PropTypes.array,
    crossMarkBtnIsPresent: PropTypes.bool
}

export default Body