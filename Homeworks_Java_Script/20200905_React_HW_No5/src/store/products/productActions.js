import axios from 'axios';
import * as actions from './productActionTypes';

export const loadProductsFromServer = () => (dispatch) => {
  dispatch({ type: actions.LOADING_PRODUCTS, payload: true })

  setTimeout(() => {
      axios.get('./listOfProducts.json')
          .then(result => result.data)
          .then((dataFromServer) => {
              const favoritesIDs = JSON.parse(localStorage.getItem("prodsInFavoritesStorage"));
              const shoppingCartIDs = JSON.parse(localStorage.getItem("prodsInCartStorage"));

              let listOfProducts = [...dataFromServer];
              listOfProducts.forEach((product) => {
                  if(favoritesIDs && favoritesIDs.includes(product.id)) {product.addedToFavorites = true}
                  if(shoppingCartIDs && shoppingCartIDs.includes(product.id)) {product.addedToCart = true}
              })
              return listOfProducts
          })
          .then(listOfProducts => {
                  dispatch({ type: actions.SAVE_PRODUCTS, payload: listOfProducts })
                  dispatch({ type: actions.LOADING_PRODUCTS, payload: false })
          })
      }, 1500)
}

export const toggleInCartAction = (id) => dispatch => {
    dispatch({type: actions.TOGGLE_CART, payload: id })
}

export const toggleFavoritesAction = (id) => dispatch => {
  dispatch({type: actions.TOGGLE_FAVORITES, payload: id })
}

