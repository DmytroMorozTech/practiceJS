import React from 'react';
import classes from "./ModalBg.module.scss";
import PropTypes from 'prop-types';

const ModalBg = (props) => {
    const {onClickHandler} = props
    return (
        <div
            className={classes.ModalBg}
            onClick={() => onClickHandler()}
        />
    )
}

ModalBg.propTypes = {
    onClickHandler: PropTypes.func,
    id: PropTypes.number
}

export default ModalBg