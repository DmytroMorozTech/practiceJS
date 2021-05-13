export const getProductsSelector = (store) => store.productsList.products;
export const productsLoadingSelector = (store) => store.productsList.loading;

export const modalIsOpenSelector = (store) => store.modalStatus.modalIsOpen;
export const getActiveProductID = (store) => store.modalStatus.activeProductID;
