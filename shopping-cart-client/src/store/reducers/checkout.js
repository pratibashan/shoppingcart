import * as actionTypes from "../actionTypes";

const initialState = {
  charge: {}
};

const reducer = (state = initialState, action) => {
  // console.log(action.token);
  switch (action.type) {
    case actionTypes.CHECKOUT:
      return {
        ...state,
        charge: action.token
      };
    default:
      return state;
  }
};

export default reducer;
