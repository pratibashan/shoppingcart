import * as actionTypes from "./actionTypes";

export const populateProducts = () => {
  return dispatch => {
    fetch("http://localhost:3000/api/products")
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: actionTypes.POPULATE_PRODUCTS,
          products: json.products
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.POPULATE_PRODUCT_REJECTED,
          payload: err
        });
      });
  };
};
export const populateProductDetails = productId => {
  return dispatch => {
    fetch("http://localhost:3000/api/products/productdetails/" + productId)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: actionTypes.POPULATE_PRODUCT_DETAILS,
          productDetails: json.foundProduct
        });
      });
  };
};

export const saveProduct = product => {
  console.log(product);
  return dispatch => {
    fetch("http://localhost:3000/api/products/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: actionTypes.SAVE_PRODUCT,
          product: json
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.SAVE_PRODUCT_REJECTED,
          payload: "There was an error while posting a new product"
        });
      });
  };
};

export const deleteProduct = productId => {
  return dispatch => {
    fetch("http://localhost:3000/api/products/" + productId, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: actionTypes.DELETE_PRODUCT,
          product: json
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.DELETE_PRODUCT_REJECTED,
          payload: "There was an error while deleting a product" + err
        });
      });
  };
};

export const addToCart = product => {
  return dispatch => {
    product.quantity = 1;
    dispatch({
      type: actionTypes.ADD_TO_CART,
      product: product
    });
  };
};

export const incrementQuantity = cartItem => {
  return dispatch => {
    dispatch({
      type: actionTypes.INCREMENT_QUANTITY,
      cartItem: cartItem
    });
  };
};

export const decrementQuantity = cartItem => {
  return dispatch => {
    dispatch({
      type: actionTypes.DECREMENT_QUANTITY,
      cartItem: cartItem
    });
  };
};
export const deleteCartItem = cartItem => {
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_CART_ITEM,
      cartItem: cartItem
    });
  };
};

export const saveReview = (productDetails, reviewRating) => {
  let productWithReview = {
    productId: productDetails._id,
    reviewRating: reviewRating
  };
  return dispatch => {
    fetch("http://localhost:3000/api/products/addreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productWithReview)
    })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: actionTypes.SAVE_REVIEW,
          product: json
        });
      });
  };
};
