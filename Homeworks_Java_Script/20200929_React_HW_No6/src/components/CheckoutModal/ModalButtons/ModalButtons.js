import React from "react";
import Button from "../../Button/Button";
import PropTypes from "prop-types";

const ModalButtons = (props) => {
  const { toggleModal, toggleInCart } = props;
  return (
    <div>
      <Button
        onClickHandler={() => {
          toggleInCart();
          toggleModal();
        }}
      >
        Ok
      </Button>

      <Button onClickHandler={() => toggleModal()}>Cancel</Button>
    </div>
  );
};

ModalButtons.propTypes = {
  toggleModal: PropTypes.func,
  toggleInCart: PropTypes.func,
  activeProductID: PropTypes.number,
};

export default ModalButtons;
