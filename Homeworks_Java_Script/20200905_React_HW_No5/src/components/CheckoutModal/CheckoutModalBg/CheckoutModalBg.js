import React from 'react';
import classes from "./CheckoutModalBg.module.scss";
import PropTypes from 'prop-types';

const CheckoutModalBg = (props) => {
    const {onClickHandler} = props
    return (
        <div
            className={classes.ModalBg}
            onClick={() => onClickHandler()}
        />
    )
}

CheckoutModalBg.propTypes = {
    onClickHandler: PropTypes.func,
    id: PropTypes.number
}

export default CheckoutModalBg