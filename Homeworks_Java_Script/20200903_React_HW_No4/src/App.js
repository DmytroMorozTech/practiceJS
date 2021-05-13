import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import Loader from "./components/Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getProductsSelector, productsLoadingSelector} from "./store/products/productSelectors"
import {loadProductsFromServer} from "./store/products/productActions";

const App = () => {

    const dispatch = useDispatch();
    const products = useSelector(getProductsSelector);
    const loading = useSelector(productsLoadingSelector);


    useEffect(() => {
        if (products.length === 0) {
            dispatch(loadProductsFromServer());
        }
    }, [dispatch, products.length])

    if (loading) {
        return <Loader />
    }

    return (
            <Layout/>
    )
}

export default App;
