import React from 'react';
import classes from './Favorites.module.scss'
import Body from "../Body/Body";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {getProductsSelector} from "../../store/products/productSelectors";

const Favorites = () => {
    const products = useSelector(getProductsSelector);

    let productsInFavorites = [...products].filter(product => product.addedToFavorites)

    return (
        <div className={classes.favorites}>
            {(!productsInFavorites || productsInFavorites.length === 0) &&
            <h1 className={classes.emptyFavorites}>
                Your Favorites are empty at the moment.
            </h1>}

            <Body
                listOfProducts={productsInFavorites}
            />
        </div>
    )
}

Favorites.propTypes = {
    listOfProducts: PropTypes.array
}

export default Favorites