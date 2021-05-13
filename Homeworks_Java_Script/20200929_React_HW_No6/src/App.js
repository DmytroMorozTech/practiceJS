import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadProductsFromServer } from "./store/products/productActions";
import Layout from "./hoc/Layout/Layout";
import Loader from "./components/Loader/Loader";
import PropTypes from "prop-types";

const App = (props) => {
  const { getProducts, loading } = props;
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return loading ? <Loader /> : <Layout />;
};

const mapStateToProps = (state) => {
  return {
    loading: state.productsList.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(loadProductsFromServer()),
  };
};

App.propTypes = {
  getProducts: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
