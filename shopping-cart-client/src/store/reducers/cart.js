import * as actionTypes from "../actionTypes";

const initialState = {
  cartItems: [],
  total: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      state = {
        ...state,
        cartItems: state.cartItems.concat(action.product)
      };
      break;

    case actionTypes.DELETE_CART_ITEM:
      //console.log(action.cartItem._id);
      state = {
        ...state,
        cartItems: state.cartItems.filter(cartItem => {
          return cartItem._id != action.cartItem._id;
        })
      };
      break;

    case actionTypes.INCREMENT_QUANTITY:
      let cartItems = state.cartItems.map(item => {
        if (item._id == action.cartItem._id) {
          item.quantity += 1;
        }
        console.log(item.quantity);
        return item;
      });

      state = {
        ...state,
        cartItems: cartItems
      };

      break;

    case actionTypes.DECREMENT_QUANTITY:
      let updatedCartItems = state.cartItems.map(item => {
        if (item._id == action.cartItem._id) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          }
        }
        //console.log(item.quantity);
        return item;
      });

      state = {
        ...state,
        cartItems: updatedCartItems
      };
      break;
  }

  //calculate the total
  let sum = 0;
  let totalAmountArr = state.cartItems.map(item => {
    return item.price * item.quantity;
  });

  for (let i = 0; i < totalAmountArr.length; i++) {
    sum += totalAmountArr[i];
  }
  state = {
    ...state,
    total: sum.toFixed(2)
  };

  return state;
};

export default reducer;

// const calculateTotal = cartItems => {
//   let sum = 0;
//   if (state.cartItems.length > 0) {
//     let totalAmountArr = state.cartItems
//       .map(item => {
//         return item.price * item.quantity;
//       })
//       .reduce((a, b) => {
//         return a + b;
//       }, 0);
//   }
// };
