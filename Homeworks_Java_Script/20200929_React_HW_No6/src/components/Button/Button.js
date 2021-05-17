import React from "react";
import classes from "../Button/Button.module.scss";
import PropTypes from "prop-types";

const Button = (props) => {
  const { backgroundColor = "#efbff3", onClickHandler, id } = props;

  return (
    <button
      className={classes.Button}
      style={{ backgroundColor }}
      onClick={() => {
        onClickHandler(id);
      }}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  onClickHandler: PropTypes.func,
  id: PropTypes.number,
};

export default Button;
