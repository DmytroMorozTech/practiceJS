import React from 'react';
import classes from './Body.module.scss';
import ProductCard from './ProductCard/ProductCard'
import Modal from "../../components/Modal/Modal";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";

const Body = (props) => {
    const {products,filteredProducts, modalIsOpen,checkoutModalIsOpen, crossMarkBtnIsPresent} = props;
    // console.log(props)
    const finalListOfProducts = filteredProducts ? filteredProducts : products;

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

const mapStateToProps = state => {
    return {
        products: state.productsList.products,
        modalIsOpen: state.modalStatus.modalIsOpen,
        checkoutModalIsOpen: state.modalStatus.checkoutModalIsOpen
    }
}

Body.propTypes = {
    products: PropTypes.array,
    crossMarkBtnIsPresent: PropTypes.bool
}

export default connect(mapStateToProps, null)(Body);