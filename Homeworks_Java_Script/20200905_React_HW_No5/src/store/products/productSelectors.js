export const getProductsSelector = (store) => store.productsList.products;
export const productsLoadingSelector = (store) => store.productsList.loading;
export const getActiveProductID = (store) => store.modalStatus.activeProductID;

export const modalIsOpenSelector = (store) => store.modalStatus.modalIsOpen;
export const checkoutModalIsOpenSelector = (store) => store.modalStatus.checkoutModalIsOpen;
export const modalDataSelector = (store) => store.modalStatus;

