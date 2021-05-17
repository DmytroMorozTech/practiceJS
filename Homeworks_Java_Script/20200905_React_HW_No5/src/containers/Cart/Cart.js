import React from 'react';
import classes from './Cart.module.scss'
import Body from "../Body/Body";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {getProductsSelector} from "../../store/products/productSelectors";

const Cart = (props) => {
    const {crossMarkBtnIsPresent} = props;
    const products = useSelector(getProductsSelector);

    let productsInCart = [...products].filter(product => product.addedToCart)

    return (
        <div className={classes.cart}>
            {(!productsInCart || productsInCart.length === 0) &&
            <h1 className={classes.emptyCart}>
                Your shopping cart is empty at the moment.
            </h1>}

            <Body
                crossMarkBtnIsPresent={crossMarkBtnIsPresent}
                listOfProducts={productsInCart}
            />
        </div>
    )
}

Cart.propTypes = {
    crossMarkBtnIsPresent: PropTypes.bool
}

export default Cart