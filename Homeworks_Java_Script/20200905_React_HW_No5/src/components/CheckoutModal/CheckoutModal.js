import React, {useEffect} from 'react';
import classes from './CheckoutModal.module.scss';
import CrossMarkBtn from "./crossMarkBtn/CrossMarkBtn"
import CheckoutModalBg from "./CheckoutModalBg/CheckoutModalBg";
import {
    resetFormData,
    toggleCheckoutModalAction,
    updateErrorsDataAction,
    updateInputValueAction,
    updateTouchedStatusAction
} from "../../store/modal/modalAction"
import {useDispatch, useSelector} from "react-redux";
import {getProductsSelector, modalDataSelector} from "../../store/products/productSelectors";
import { useHistory } from "react-router-dom";


const validate = (values,touched) => {
    let errors = {}

    if (!values.firstName && touched.firstName) {
        errors.firstName = 'Required'
    }

    if (!values.lastName && touched.lastName) {
        errors.lastName = 'Required'
    }

    if (!values.age && touched.age) {
        errors.age = 'Required'
    } else if ((isNaN(values.age)||values.age<14 || values.age>100) && touched.age) {
        errors.age = "The age must be a number between 14 and 100"
    }

    if (!values.email && touched.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && touched.email) {
        errors.email = "Invalid email format"
    }

    if (!values.address && touched.address) {
        errors.address = 'Required'
    }

    if (!values.mobile && touched.mobile) {
        errors.mobile = 'Required'
    } else if (!/^\+?3?8?(0[\s.-]\d{2}[\s.-]\d{3}[\s.-]\d{2}[\s.-]\d{2})$/.test(values.mobile) && touched.mobile) {
        errors.mobile = "Wrong format. Please follow this sample: +380-XX-XXX-XX-XX"
    }

    return errors
}

const CheckoutModal = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const modalData = useSelector(modalDataSelector)
    const products = useSelector(getProductsSelector)


    const formData = modalData.checkoutModalData;
    const {firstName, lastName, email, age, address, mobile} = formData;
    const errors = modalData.checkoutModalErrors;
    const touched = modalData.checkoutModalTouched;

    useEffect(() => {
        const errors = validate(formData, touched);
        // console.log(errors);

        dispatch(updateErrorsDataAction(errors))
    },[formData, touched, dispatch])

    const onSubmit = (e) => {
        e.preventDefault();

        const someFormFieldsAreEmpty = Object.values(formData).reduce((acc,formFieldValue) => {
            return formFieldValue === "" ? acc+1 : acc
        }, 0)

        if (Object.keys(errors).length > 0 || someFormFieldsAreEmpty) {
            alert("Please fill in all form fields correctly. Otherwise you will not be able to make an order.");
            return false;
        }

        const shoppingCartIDs = JSON.parse(localStorage.getItem("prodsInCartStorage"));
        localStorage.setItem("prodsInCartStorage","[]");
        const productsInCart = [...products].filter(product => shoppingCartIDs.includes(product.id));

        console.log("<<< The list of ordered products >>>");
        productsInCart.forEach(product => {
            console.log("---------------------------------")
            console.log("Product name: " + product.name);
            console.log("Product price: " + product.price);
            console.log("Product id: " + product.id);
        })
        const totalCostOfProducts = productsInCart.reduce((acc,product) => acc + product.price, 0);
        console.log("---------------------------------")
        console.log("Total cost of ordered products: " + totalCostOfProducts)
        console.log("---------------------------------")

        console.log("Form data filled in by user: ")
        for (let key in formData) {
            console.log(`${key} : ${formData[key]}`)
        }

        products.forEach(product => {
            product.addedToCart = false;
        })
        setTimeout(()=> {
                dispatch(toggleCheckoutModalAction());
                dispatch(resetFormData())
                history.push("/")
        }
        , 700)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
            dispatch(updateInputValueAction({[name]:value}))
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        dispatch(updateTouchedStatusAction(name))
    }

    return (
        <>
            <div className={classes.CheckoutModal}>
                <div className={classes.CheckoutModal__container}>
                        <div className={classes.CheckoutModal__heading}>
                            <h2 className={classes.h2}>
                                <strong>Please fill in the form below to make an order</strong>
                            </h2>
                            <CrossMarkBtn onClickHandler={()=> dispatch(toggleCheckoutModalAction())} />
                        </div>
                    {/*------------------------------*/}

                    <form className={classes.form} onSubmit={onSubmit} noValidate>
                        <div className={classes.formControl}>
                            <label htmlFor="firstName">First name</label>
                            <input
                                type='text'
                                id='firstName'
                                name='firstName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={firstName}
                            />
                            <div className={classes.error}>{touched.firstName && errors.firstName ? errors.firstName : null}</div>
                        </div>

                        <div className={classes.formControl}>
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type='text'
                                id='lastName'
                                name='lastName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={lastName}
                            />
                            <div className={classes.error}>{touched.lastName && errors.lastName ? errors.lastName : null}</div>
                        </div>

                        <div className={classes.formControl}>
                            <label htmlFor="age">Age</label>
                            <input
                                type='text'
                                id='age'
                                name='age'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={age}
                            />
                            <div className={classes.error}>{touched.age && errors.age ? errors.age : null}</div>
                        </div>

                        <div className={classes.formControl}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={email}
                            />
                            <div className={classes.error}>{touched.email && errors.email ? errors.email : null}</div>
                        </div>

                        <div className={classes.formControl}>
                            <label htmlFor="address">Address</label>
                            <input
                                type='text'
                                id='address'
                                name='address'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={address}
                            />
                            <div className={classes.error}>{touched.address && errors.address ? errors.address : null}</div>
                        </div>

                        <div className={classes.formControl}>
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                type='text'
                                id='mobile'
                                name='mobile'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={mobile}
                            />
                            <div className={classes.error}>{touched.mobile && errors.mobile ? errors.mobile : null}</div>
                        </div>

                        <button type="submit" className={classes.checkoutBtn}>Submit</button>
                    </form>


                </div>
            </div>

            <CheckoutModalBg
                onClickHandler={()=> dispatch(toggleCheckoutModalAction())}
            />
        </>
    )
}

export default CheckoutModal