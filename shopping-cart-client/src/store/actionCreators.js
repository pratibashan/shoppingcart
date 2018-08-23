import * as actionTypes from "./actionTypes";
import { history } from "../index.js";

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
    console.log(productId);
    fetch("http://localhost:3000/api/products/productdetails/" + productId)
      .then(response => response.json())
      .then(json => {
        console.log(json);
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
        console.log(json);

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
  console.log(productId);
  return dispatch => {
    fetch("http://localhost:3000/api/products/" + productId, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);

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
    //console.log(cartItem);
  };
};

export const decrementQuantity = cartItem => {
  return dispatch => {
    dispatch({
      type: actionTypes.DECREMENT_QUANTITY,
      cartItem: cartItem
    });
    //console.log(cartItem);
  };
};
export const deleteCartItem = cartItem => {
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_CART_ITEM,
      cartItem: cartItem
    });
    //console.log(cartItem);
  };
};

// export const saveCart = (cartItems, total) => {
//   console.log(cartItems, total);
// return dispatch => {
//   fetch("http://localhost:3000/api/products/addproduct", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(product)
//   })
//     .then(response => response.json())
//     .then(json => {
//       console.log(json);

//       dispatch({
//         type: actionTypes.SAVE_PRODUCT,
//         product: product
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: actionTypes.SAVE_PRODUCT_REJECTED,
//         payload: "There was an error while posting a new product"
//       });
//  });
//};
//};
export const saveReview = (productDetails, reviewRating) => {
  let productWithReview = {
    productId: productDetails._id,
    reviewRating: reviewRating
  };
  console.log(productWithReview);
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
        console.log(json);

        dispatch({
          type: actionTypes.SAVE_REVIEW,
          product: json
        });
      });
    // .catch(err => {
    //   dispatch({
    //     type: actionTypes.SAVE_PRODUCT_REJECTED,
    //     payload: "There was an error while posting a new product"
    //   });
    // });
  };
};

// export const handleStripeToken = token => {
//   console.log(token);
//   return dispatch => {
//     fetch("http://localhost:3000/api/stripe/charge", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(token)
//     })
//       .then(response => response.json())
//       .then(json => {
//         console.log(json);
//         // <BrowserRouter>
//         //   <Route path="/success" component={Confirmation} />
//         // </BrowserRouter>;
//         // this.props.history.push("/success");
//         dispatch({
//           type: actionTypes.CHECKOUT,
//           token: json
//         });
//       });
// };
// };
