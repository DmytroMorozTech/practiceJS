import React from 'react';
import classes from './CartIcon.module.scss';
import {ReactComponent as CartSvg} from './shopping-cart-solid.svg'
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {toggleCheckoutModalAction} from "../../../store/modal/modalAction";


const CartIcon =(props) => {
    const dispatch = useDispatch();

    // const {id, addedToFavorites} = props
    // let starColor
    // if(addedToFavorites) {
    //     starColor = '#ef1ad3'
    // } else {
    //     starColor = 'darkgrey'
    // }

    return (
        <CartSvg
            className={classes.cartIcon}
            onClick={() => dispatch(toggleCheckoutModalAction())}
            // alt={'Favorites'}
        />
    )
}

CartIcon.propTypes = {
    addedToFavorites: PropTypes.bool,
    id: PropTypes.number
}

export default CartIcon