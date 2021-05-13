import React, {Component} from 'react';
import classes from './ProductCard.module.scss'
import Button from "../../../components/Button/Button";
import Star from "./Star/Star";
import PropTypes from 'prop-types';

class ProductCard extends Component {

    render() {
        let {product: {name, price, imgUrl, id, color, addedToCart, addedToFavorites}, toggleInFavorites, toggleModal} = this.props;
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

                    <p></p>
                    <div className={classes.productPrice}>
                        <span><strong>Price: {price}₴</strong></span>
                        <Star id={id} addedToFavorites={addedToFavorites} toggleInFavorites={toggleInFavorites}/>
                    </div>
                    <Button backgroundColor={color} id={id} onClickHandler={toggleModal}>{cardText}</Button>
                </div>
            </div>
        );
    }
}

ProductCard.propTypes = {
    toggleInFavorites: PropTypes.func,
    toggleModal: PropTypes.func,
    product: PropTypes.exact({
        name: PropTypes.string,
        price: PropTypes.number,
        imgUrl: PropTypes.string,
        id: PropTypes.number,
        color: PropTypes.string,
        addedToCart: PropTypes.bool,
        addedToFavorites: PropTypes.bool
    })
}

export default ProductCard