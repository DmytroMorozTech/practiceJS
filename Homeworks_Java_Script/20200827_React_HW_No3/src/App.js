import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Layout from "./hoc/Layout/Layout";
import Loader from "./components/Loader/Loader";

const App = () => {

    const [listOfProducts, setListOfProducts] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            return axios.get('./listOfProducts.json')
                .then(result => result.data)
                .then((dataFromServer) => {
                    const favoritesIDs = JSON.parse(localStorage.getItem("prodsInFavoritesStorage"));
                    const shoppingCartIDs = JSON.parse(localStorage.getItem("prodsInCartStorage"));

                    let listOfProducts = dataFromServer;
                    listOfProducts.forEach((product) => {
                        if(favoritesIDs && favoritesIDs.includes(product.id)) {product.addedToFavorites = true}
                        if(shoppingCartIDs && shoppingCartIDs.includes(product.id)) {product.addedToCart = true}
                    })
                    return listOfProducts
                })
                .then(productsList => setListOfProducts(productsList))
        }, 1500)
        // чтобы сделать эмуляцию загрузки с сервера - устанавливаем таймер.
        // во время эмуляции на экране будет отображаться надпись и спиннер.
    })

    const toggleInCart = (id) => {
        let newListOfProducts = [...listOfProducts]
        newListOfProducts.forEach(product => {
            if(product.id === id) product.addedToCart = !product.addedToCart
        })
        setListOfProducts(newListOfProducts)
        let prodsInCart = newListOfProducts.filter(product => product.addedToCart).map(product => product.id)
        localStorage.setItem('prodsInCartStorage', JSON.stringify(prodsInCart))
    }

    const toggleInFavorites = (id) => {
        let newListOfProducts = [...listOfProducts]
        newListOfProducts.forEach(product => {
            if(product.id === id) product.addedToFavorites = !product.addedToFavorites
            // продукт, на котором пользователь кликнул по "звездочке" (добавить в избранное) поменяет свой статус на противоположный. Если он не был в избранных товарах, то после клика он добавится в избранные товары. И наоборот: клик по товару который уже был в избранных, уберет его из избранных.
        })

        setListOfProducts(newListOfProducts)
        let prodsInFavorites = newListOfProducts.filter(product => product.addedToFavorites).map(product => product.id)
        localStorage.setItem('prodsInFavoritesStorage', JSON.stringify(prodsInFavorites))
    }

    return (
            listOfProducts ?
            <Layout
                listOfProducts={listOfProducts}
                toggleInFavorites={toggleInFavorites}
                toggleInCart={toggleInCart}
            /> : <Loader />
    )
}

export default App

