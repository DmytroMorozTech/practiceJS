import React, { useEffect } from "react";
import {connect} from "react-redux";
import classes from "./CheckoutModal.module.scss";
import CrossMarkBtn from "./crossMarkBtn/CrossMarkBtn";
import CheckoutModalBg from "./CheckoutModalBg/CheckoutModalBg";
import * as actions from "../../store/modal/modalAction";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const validate = (values, touched) => {
  let errors = {};

  if (!values.firstName && touched.firstName) {
    errors.firstName = "Required";
  }

  if (!values.lastName && touched.lastName) {
    errors.lastName = "Required";
  }

  if (!values.age && touched.age) {
    errors.age = "Required";
  } else if (
    (isNaN(values.age) || values.age < 14 || values.age > 100) &&
    touched.age
  ) {
    errors.age = "The age must be a number between 14 and 100";
  }

  if (!values.email && touched.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
    touched.email
  ) {
    errors.email = "Invalid email format";
  }

  if (!values.address && touched.address) {
    errors.address = "Required";
  }

  if (!values.mobile && touched.mobile) {
    errors.mobile = "Required";
  } else if (
    !/^\+?3?8?(0[\s.-]\d{2}[\s.-]\d{3}[\s.-]\d{2}[\s.-]\d{2})$/.test(
      values.mobile
    ) &&
    touched.mobile
  ) {
    errors.mobile =
      "Wrong format. Please follow this sample: +380-XX-XXX-XX-XX";
  }

  return errors;
};

const CheckoutModal = (props) => {

  const {products, modalData,updateErrorsDataAction,
    toggleCheckoutModalAction,resetFormDataAction,updateInputValueAction,
    updateTouchedStatusAction} = props;

  const history = useHistory();

  const formData = modalData.checkoutModalData;
  const { firstName, lastName, email, age, address, mobile } = formData;
  const errors = modalData.checkoutModalErrors;
  const touched = modalData.checkoutModalTouched;

  useEffect(() => {
    const errors = validate(formData, touched);
    // console.log(errors);

    updateErrorsDataAction(errors);
  }, [formData, touched,updateErrorsDataAction]);

  const onSubmit = (e) => {
    e.preventDefault();

    const someFormFieldsAreEmpty = Object.values(formData).reduce(
      (acc, formFieldValue) => {
        return formFieldValue === "" ? acc + 1 : acc;
      },
      0
    );

    if (Object.keys(errors).length > 0 || someFormFieldsAreEmpty) {
      alert(
        "Please fill in all form fields correctly. Otherwise you will not be able to make an order."
      );
      return false;
    }

    const shoppingCartIDs = JSON.parse(
      localStorage.getItem("prodsInCartStorage")
    );
    localStorage.setItem("prodsInCartStorage", "[]");
    const productsInCart = [...products].filter((product) =>
      shoppingCartIDs.includes(product.id)
    );

    console.log("<<< The list of ordered products >>>");
    productsInCart.forEach((product) => {
      console.log("---------------------------------");
      console.log("Product name: " + product.name);
      console.log("Product price: " + product.price);
      console.log("Product id: " + product.id);
    });
    const totalCostOfProducts = productsInCart.reduce(
      (acc, product) => acc + product.price,
      0
    );
    console.log("---------------------------------");
    console.log("Total cost of ordered products: " + totalCostOfProducts);
    console.log("---------------------------------");

    console.log("Form data filled in by user: ");
    for (let key in formData) {
      console.log(`${key} : ${formData[key]}`);
    }

    products.forEach((product) => {
      product.addedToCart = false;
    });
    setTimeout(() => {
      toggleCheckoutModalAction();
      resetFormDataAction();
      history.push("/");
    }, 700);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateInputValueAction({[name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    updateTouchedStatusAction(name);
  };

  return (
    <>
      <div data-test="checkout-modal" className={classes.CheckoutModal}>
        <div className={classes.CheckoutModal__container}>
          <div className={classes.CheckoutModal__heading}>
            <h2 className={classes.h2}>
              <strong>Please fill in the form below to make an order</strong>
            </h2>
            <CrossMarkBtn data-test="cross-mark-btn"
              onClickHandler={() => toggleCheckoutModalAction()}
            />
          </div>
          {/*------------------------------*/}

          <form data-test="form" className={classes.form} onSubmit={onSubmit} noValidate>
            <div data-test="first-name" className={classes.formControl}>
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={firstName}
              />
              <div className={classes.error}>
                {touched.firstName && errors.firstName
                  ? errors.firstName
                  : null}
              </div>
            </div>

            <div data-test="last-name" className={classes.formControl}>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={lastName}
              />
              <div className={classes.error}>
                {touched.lastName && errors.lastName ? errors.lastName : null}
              </div>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                onChange={handleChange}
                onBlur={handleBlur}
                value={age}
              />
              <div className={classes.error}>
                {touched.age && errors.age ? errors.age : null}
              </div>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={email}
              />
              <div className={classes.error}>
                {touched.email && errors.email ? errors.email : null}
              </div>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={address}
              />
              <div className={classes.error}>
                {touched.address && errors.address ? errors.address : null}
              </div>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                onChange={handleChange}
                onBlur={handleBlur}
                value={mobile}
              />
              <div className={classes.error}>
                {touched.mobile && errors.mobile ? errors.mobile : null}
              </div>
            </div>

            <button type="submit" className={classes.checkoutBtn}>
              Submit
            </button>
          </form>
        </div>
      </div>

      <CheckoutModalBg
        onClickHandler={() => toggleCheckoutModalAction()}
      />
    </>
  );
};


const mapStateToProps = state => {
  return {
    products: state.productsList.products,
    modalData: state.modalStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateErrorsDataAction: (errors) => dispatch(actions.updateErrorsDataAction(errors)),
      toggleCheckoutModalAction: ()=> dispatch(actions.toggleCheckoutModalAction()),
      resetFormDataAction: ()=> dispatch(actions.resetFormData()),
      updateInputValueAction: (data)=> dispatch(actions.updateInputValueAction(data)),
      updateTouchedStatusAction: (fieldName)=> dispatch(actions.updateTouchedStatusAction(fieldName)),
  };
};

CheckoutModal.propTypes = {
  products: PropTypes.array,
  modalData: PropTypes.object,
  updateErrorsDataAction: PropTypes.func,
  toggleCheckoutModalAction: PropTypes.func,
  resetFormDataAction: PropTypes.func,
  updateInputValueAction: PropTypes.func,
  updateTouchedStatusAction: PropTypes.func,
  crossMarkBtnIsPresent: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);