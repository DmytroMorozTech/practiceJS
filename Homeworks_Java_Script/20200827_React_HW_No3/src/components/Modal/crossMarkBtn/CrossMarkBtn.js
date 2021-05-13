import React from 'react';
import timesSolid from "./times-solid.svg"
import classes from './CrossMarkBtn.module.scss';
import PropTypes from "prop-types";

const CrossMarkBtn =(props) => {

    const {onClickHandler, id=null} = props
    return (
        <img
            src={timesSolid}
            alt = 'cross-mark-icon'
            className={classes.CrossMarkBtn}
            onClick={() => onClickHandler(id)}
        />
    )
}

CrossMarkBtn.propTypes = {
    onClickHandler: PropTypes.func
}

export default CrossMarkBtn