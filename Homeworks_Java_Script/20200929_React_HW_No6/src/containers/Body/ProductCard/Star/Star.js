import React from 'react';
import classes from './Star.module.scss';
import {ReactComponent as StarIcon} from './star-solid.svg'
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {toggleFavoritesAction} from "../../../../store/products/productActions";


const Star =(props) => {
    const dispatch = useDispatch();

    const {id, addedToFavorites} = props
    let starColor
    if(addedToFavorites) {
        starColor = '#ef1ad3'
    } else {
        starColor = 'darkgrey'
    }

    return (
        <StarIcon
            fill = {starColor}
            className={classes.star}
            onClick={() => dispatch(toggleFavoritesAction(id))}
            alt={'Favorites'}
        />
    )
}

Star.propTypes = {
    addedToFavorites: PropTypes.bool,
    id: PropTypes.number
}

export default Star