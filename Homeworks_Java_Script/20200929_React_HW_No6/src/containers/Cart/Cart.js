import React from 'react';
import classes from './Cart.module.scss'
import Body from "../Body/Body";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Cart = (props) => {
    const {crossMarkBtnIsPresent, products} = props;

    let productsInCart = [...products].filter(product => product.addedToCart)

    return (
        <div className={classes.cart}>
            {(!productsInCart || productsInCart.length === 0) &&
            <h1 className={classes.emptyCart}>
                Your shopping cart is empty at the moment.
            </h1>}

            <Body
                crossMarkBtnIsPresent={crossMarkBtnIsPresent}
                filteredProducts={productsInCart}
            />
        </div>
    )
}

Cart.propTypes = {
    crossMarkBtnIsPresent: PropTypes.bool,
    products: PropTypes.array
}

const mapStateToProps = state => {
    return {
        products: state.productsList.products
    }
}

export default connect(mapStateToProps, null)(Cart);