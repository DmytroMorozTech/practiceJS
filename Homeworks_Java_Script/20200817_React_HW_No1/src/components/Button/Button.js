import React, {Component} from 'react';
import classes from '../Button/Button.module.scss';
import PropTypes from 'prop-types';

class Button extends Component {
    render() {
        const {backgroundColor, onClickHandler, id} = this.props

        return (
            <button
                className={classes.Button}
                style={{backgroundColor}}
                onClick={() => {onClickHandler(id)}}
            >
            {this.props.children}
            </button>
        )
    }
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    onClickHandler: PropTypes.func,
    id: PropTypes.number
}

export default Button