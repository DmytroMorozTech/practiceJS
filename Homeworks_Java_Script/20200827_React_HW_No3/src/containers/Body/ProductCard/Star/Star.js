import React, {Component} from 'react';
import classes from './Star.module.scss';
import {ReactComponent as StarIcon} from './star-solid.svg'
import PropTypes from 'prop-types';

class Star extends Component {

    render() {
        const {id, addedToFavorites, toggleInFavorites} = this.props
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
                onClick={() => toggleInFavorites(id)}
                alt={'Favorites'}
            />
        )
    }
}

Star.propTypes = {
    toggleInFavorites: PropTypes.func,
    addedToFavorites: PropTypes.bool,
    id: PropTypes.number
}

export default Star