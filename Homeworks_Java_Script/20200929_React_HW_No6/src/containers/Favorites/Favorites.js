import React from "react";
import classes from "./Favorites.module.scss";
import Body from "../Body/Body";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Favorites = (props) => {
  const { products } = props;

  let productsInFavorites = [...products].filter(
    (product) => product.addedToFavorites
  );

  return (
    <div className={classes.favorites}>
      {(!productsInFavorites || productsInFavorites.length === 0) && (
        <h1 className={classes.emptyFavorites}>
          Your Favorites are empty at the moment.
        </h1>
      )}

      <Body filteredProducts={productsInFavorites} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productsList.products,
  };
};

Favorites.propTypes = {
  products: PropTypes.array,
};

export default connect(mapStateToProps, null)(Favorites);
