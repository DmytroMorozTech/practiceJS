import React from 'react';
import classes from './ProductCard.module.scss'
import Button from "../../../components/Button/Button";
import Star from "./Star/Star";
import CrossMarkBtn from "../../../components/Modal/crossMarkBtn/CrossMarkBtn";
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {toggleModalAction} from "../../../store/modal/modalAction";

const ProductCard = (props) => {
    let {product: {name, price, imgUrl, id, color, addedToCart, addedToFavorites}, crossMarkBtnIsPresent} = props;

    const dispatch = useDispatch();

    let cardText;
    if(addedToCart) {
        cardText = 'In Cart'
        color = '#3ce648'
    } else {
        cardText = 'Add to Cart'
    }

    return (
        <div className={classes.productCard}>
            <div className={classes.imgContainer}>
                <img src={imgUrl} alt="product_image" />
            </div>

            <div className={classes.productDescription}>
                <p className={classes.productName}><strong>{name}</strong></p>
                <p className={classes.idInfo}>id: {id}</p>

                <div className={classes.productPrice}>
                    <span><strong>Price: {price}₴</strong></span>
                    <Star id={id} addedToFavorites={addedToFavorites}/>
                </div>
                <Button backgroundColor={color} id={id} onClickHandler={() => dispatch(toggleModalAction(id))}>{cardText}</Button>
            </div>
            { crossMarkBtnIsPresent &&
            <>
                <div className={classes.crossMarkBtnContainer}>
                    <CrossMarkBtn id = {id} onClickHandler={() => dispatch(toggleModalAction(id))}/>
                </div>
            </>}
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.exact({
        name: PropTypes.string,
        price: PropTypes.number,
        imgUrl: PropTypes.string,
        id: PropTypes.number,
        color: PropTypes.string,
        addedToCart: PropTypes.bool,
        addedToFavorites: PropTypes.bool
    }),
    crossMarkBtnIsPresent: PropTypes.bool
}

export default ProductCard