import React, {Component} from 'react';
import axios from 'axios';
import Body from "./containers/Body/Body";

class App extends Component {

    state = {
        listOfProducts: null,
        modalIsOpen: false,
        activeProductID: null
    }

    componentDidMount() {
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
                .then(productsList => this.setState({listOfProducts: productsList}))
        }, 1500)
        // чтобы сделать эмуляцию загрузки с сервера - устанавливаем таймер.
        // во время эмуляции на экране будет отображаться надпись и спиннер.
    }

    toggleInCart = (id) => {
        let newListOfProducts = this.state.listOfProducts
        newListOfProducts.forEach(product => {
            if(product.id === id) product.addedToCart = !product.addedToCart
        })
        this.setState({listOfProducts: newListOfProducts})
        let prodsInCart = newListOfProducts.filter(product => product.addedToCart).map(product => product.id)
        localStorage.setItem('prodsInCartStorage', JSON.stringify(prodsInCart))
    }

    toggleInFavorites = (id) => {
        let newListOfProducts = this.state.listOfProducts
        newListOfProducts.forEach(product => {
            if(product.id === id) product.addedToFavorites = !product.addedToFavorites
            // продукт, на котором пользователь кликнул по "звездочке" (добавить в избранное) поменяет свой статус на противоположный. Если он не был в избранных товарах, то после клика он добавится в избранные товары. И наоборот: клик по товару который уже был в избранных, уберет его из избранных.
        })

        this.setState({listOfProducts: newListOfProducts})
        let prodsInFavorites = newListOfProducts.filter(product => product.addedToFavorites).map(product => product.id)
        localStorage.setItem('prodsInFavoritesStorage', JSON.stringify(prodsInFavorites))
    }

    toggleModal = (id) => {
        this.setState(prevState => (
                {modalIsOpen: !prevState.modalIsOpen}
            )
        )
        if(id) this.setState({activeProductID: id})
    }

    render() {
        const {listOfProducts, modalIsOpen, activeProductID} = this.state;
        return (
            <Body
                listOfProducts={listOfProducts}
                modalIsOpen={modalIsOpen}
                activeProductID={activeProductID}
                toggleInFavorites={this.toggleInFavorites}
                toggleInCart={this.toggleInCart}
                toggleModal={this.toggleModal}
            />
        )
    }
}

export default App

