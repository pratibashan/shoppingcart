import * as actionTypes from "../actionTypes";

const initialState = {
  products: [],
  productDetails: {},
  msg: "",
  style: "",
  validation: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPULATE_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
      break;

    case actionTypes.POPULATE_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.productDetails
      };
      break;
    case actionTypes.SAVE_PRODUCT:
      return {
        ...state,
        products: [state.products.concat(action.product)]
        // msg: "Saved,Click to continue",
        // style: "success",
        // validation: "success"
      };
      break;

    case actionTypes.SAVE_PRODUCT_REJECTED:
      return {
        ...state,
        msg: "Please,try again",
        style: "danger",
        validation: "error"
      };
      break;

    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          return product._id !== action.product._id;
        })
      };
      break;
  }
  return state;
};

export default reducer;
