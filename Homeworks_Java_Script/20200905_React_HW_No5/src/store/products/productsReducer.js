import * as actions from "./productActionTypes";
import update from 'immutability-helper';

const initialStore = {
    loading: false,
    products: []
}

const productsReducer = (store = initialStore, action) => {
    switch (action.type) {
        case actions.LOADING_PRODUCTS:
            return { ...store, loading: action.payload }

        case actions.SAVE_PRODUCTS:
            return { ...store, products: action.payload }

        case actions.TOGGLE_CART:
            const shoppingCartIDs = JSON.parse(localStorage.getItem("prodsInCartStorage")) || [];
            const productWasInCart = shoppingCartIDs.includes(action.payload);

            if (!productWasInCart) {
                localStorage.setItem("prodsInCartStorage", JSON.stringify(  [...shoppingCartIDs, action.payload]))
            } else {
                const updatedShoppingCardId = [...shoppingCartIDs].filter(id => id !== action.payload);
                localStorage.setItem("prodsInCartStorage", JSON.stringify(updatedShoppingCardId))
            }
            // ------------------------
            // Now let's update data in redux store.
            const productInCart = store.products.find(product => product.id === action.payload);
            const productInCartIndex = store.products.indexOf(productInCart);
            const updatedProductInCart = { ...productInCart, addedToCart: !productInCart.addedToCart };
            return update(store, {products: {$splice: [[productInCartIndex, 1, updatedProductInCart]]}})
        // --------------------------------------
        case actions.TOGGLE_FAVORITES:
            // first possible option for this type of action:
            // const updatedArr = [...store.data]
            // const product = updatedArr.find(product => product.id === action.payload);
            // product.addedToFavorites = !product.addedToFavorites;
            // return { ...store, data: updatedArr }

            const favoritesIDs = JSON.parse(localStorage.getItem("prodsInFavoritesStorage")) || [];
            const productWasInFavorites = favoritesIDs.includes(action.payload);

            if (!productWasInFavorites) {
                localStorage.setItem("prodsInFavoritesStorage", JSON.stringify(  [...favoritesIDs, action.payload]))
            } else {
                const updatedFavoritesIDs = [...favoritesIDs].filter(id => id !== action.payload);
                localStorage.setItem("prodsInFavoritesStorage", JSON.stringify(updatedFavoritesIDs))
            }
            // ------------------------
            // Now let's update data in redux store.
            const product = store.products.find(product => product.id === action.payload);
            const productIndex = store.products.indexOf(product);
            const updatedProduct = { ...product, addedToFavorites: !product.addedToFavorites };
            return update(store, {products: {$splice: [[productIndex, 1, updatedProduct]]}})

        // --------------------------------------
        default:
            return store;
    }
}

export default productsReducer;