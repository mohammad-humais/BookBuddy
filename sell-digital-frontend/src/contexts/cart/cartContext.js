import React, { createContext, useReducer } from "react";
import cartReducer from "./cartReducer";

// Cart-Context
const cartContext = createContext();
// Initial State
const initialState = {
  cartItems: [],
  cartLength: 0,
};
// Cart-Provider Component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // Dispatched Actions
  const addItem = (item) => {
    return dispatch({
      type: "ADD_TO_CART",
      payload: { item },
    });
  };

  const emptyArray = (item) => {
    return dispatch({
      type: "EMPTY_CART",
      payload: { item },
    });
  };


  const cartsLength = (item) => {
    return dispatch({
      type: "CART_LENGTH",
      payload: { item },
    });
  };
  const removeItem = (itemId) => {
    return dispatch({
      type: "REMOVE_FROM_CART",
      payload: { itemId },
    });
  };

  const incrementItem = (itemId) => {
    return dispatch({
      type: "INCREMENT_ITEM",
      payload: { itemId },
    });
  };

  const decrementItem = (itemId) => {
    return dispatch({
      type: "DECREMENT_ITEM",
      payload: { itemId },
    });
  };

  // Context values
  const values = {
    ...state,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    emptyArray,
    cartsLength,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };
